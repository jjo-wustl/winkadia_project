// src/lib/video-access.ts
//
// 클라이언트 측에서 서버 API(/api/series/video/[id]) 를 호출해
// 단기 만료 서명 URL 을 받아오는 헬퍼 모듈임.
//
// - 현재 로그인된 사용자의 Firebase ID 토큰을 Authorization 헤더로 함께 전송
// - 토큰이 없거나 API 응답이 실패하면 에러를 throw
// - 호출자(예: WatchPage) 는 try/catch 로 사용자에게 에러 상태를 노출함

import { auth } from "@/lib/firebase"; // 클라이언트 Firebase Auth 인스턴스

export type SignedVideoResponse = {
  url: string; // 짧은 TTL 동안만 유효한 서명 URL
  expiresAt: number; // URL이 만료되는 절대 시간(ms 단위, Date.now() 기준)
};

export async function getSignedVideoUrl(videoId: string): Promise<SignedVideoResponse> {
  const user = auth.currentUser; // 현재 로그인 상태인 사용자
  if (!user) {
    throw new Error("Not authenticated"); // 호출자가 사전에 로그인 여부를 확인하도록 에러를 던짐
  }

  // ID 토큰을 강제로 새로고침하지 않고(force=false) 캐시된 토큰을 사용함 — 만료 임박 시 SDK가 자동 갱신
  const token = await user.getIdToken();

  const response = await fetch(`/api/series/video/${encodeURIComponent(videoId)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // 매 호출마다 새 서명 URL을 받기 위해 캐시를 비활성화
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load video URL (status ${response.status})`);
  }

  const data = (await response.json()) as SignedVideoResponse;
  return data;
}
