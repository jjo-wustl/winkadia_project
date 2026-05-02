// src/app/api/series/video/[id]/route.ts
//
// 인증된 사용자에게만 단기 만료 서명 URL(Signed URL)을 발급하는 API Route임.
//
// [동작]
// 1) 클라이언트가 Authorization: Bearer <Firebase ID Token> 헤더로 호출
// 2) Admin SDK 가 토큰을 검증하여 실제 로그인된 사용자인지 확인
// 3) seriesVideos 데이터에서 video.id 로 영상 메타데이터를 조회
// 4) Firebase Storage Admin SDK 의 getSignedUrl 로 짧은 TTL 서명 URL을 생성
// 5) JSON {url, expiresAt} 으로 응답
//
// [보안 효과]
// - 발급된 URL은 expiresAt 이 지나면 자동으로 무효화 (인스펙터로 캡처해도 시간 지나면 다운로드 불가)
// - Storage Rules 에서 직접 read를 막아두면, Admin SDK 가 발급한 서명 URL 을 통해서만 접근 가능
// - 매 시청 세션마다 새 URL이 발급되어 재사용/공유가 비활성화됨

import { NextResponse } from "next/server"; // Next.js JSON 응답 헬퍼를 가져옴
import { seriesVideos } from "@/data/series-videos"; // 영상 메타데이터(Storage 경로 포함)를 가져옴
import { getAdminAuth, getAdminStorage } from "@/lib/firebase-admin"; // 서버 전용 Admin SDK 헬퍼를 가져옴

// firebase-admin 은 Node 전용 모듈(crypto/fs)에 의존하므로 Edge 런타임에서 동작하지 않음
export const runtime = "nodejs";
// 영상 URL은 사용자별/시간별로 매번 새로 서명되어야 하므로 동적 처리 강제
export const dynamic = "force-dynamic";

// 발급된 서명 URL의 유효 기간(밀리초). 1시간으로 설정함 — 짧은 영상에는 충분하고, 만료 후 추가 다운로드를 차단함
const SIGNED_URL_TTL_MS = 60 * 60 * 1000;

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // Next.js 16 의 async params 규칙에 따라 await 로 풀어냄

  // 1) 인증 헤더 파싱 및 토큰 추출
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : null;
  if (!token) {
    return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
  }

  // 2) Firebase ID 토큰 검증 (위조/만료 토큰 차단)
  try {
    await getAdminAuth().verifyIdToken(token);
  } catch (err) {
    console.error("[video signed-url] verifyIdToken failed:", err);
    return NextResponse.json({ error: "Invalid auth token" }, { status: 401 });
  }

  // 3) 요청한 영상이 실제로 존재하는지 확인
  const video = seriesVideos.find((item) => item.id === id);
  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  // 4) Admin Storage 로 단기 만료 서명 URL 생성
  try {
    const expiresAt = Date.now() + SIGNED_URL_TTL_MS;
    const bucket = getAdminStorage().bucket(); // FIREBASE_STORAGE_BUCKET 환경변수의 기본 버킷
    const file = bucket.file(video.videoPath);

    const [url] = await file.getSignedUrl({
      action: "read", // 다운로드/스트리밍을 위한 read 권한
      expires: expiresAt, // 절대 시간(ms) 으로 만료 시점 지정
      version: "v4", // v4 서명 사용 — 더 강력하고 권장되는 서명 방식
    });

    return NextResponse.json(
      { url, expiresAt },
      {
        // 클라이언트/CDN 캐싱을 막아 매 시청 세션마다 새 URL이 발급되도록 강제함
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      },
    );
  } catch (err) {
    console.error("[video signed-url] getSignedUrl failed:", err);
    return NextResponse.json(
      { error: "Failed to generate video URL" },
      { status: 500 },
    );
  }
}
