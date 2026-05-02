// src/lib/firebase-admin.ts
//
// 서버 전용(Server-only) Firebase Admin SDK 초기화 모듈임.
// 클라이언트 번들에 포함되면 서비스 계정 자격증명이 노출되므로,
// 반드시 API Route / Server Component / Server Action 안에서만 import 해야 함.

import { getApps, initializeApp, cert, type App } from "firebase-admin/app"; // Admin App 초기화 함수와 타입을 가져옴
import { getStorage } from "firebase-admin/storage"; // 서명된 URL 생성을 위해 Admin Storage를 가져옴
import { getAuth } from "firebase-admin/auth"; // 클라이언트가 보낸 ID 토큰을 검증하기 위해 Admin Auth를 가져옴

let cachedApp: App | null = null; // Hot Reload 환경에서 중복 초기화를 방지하기 위해 인스턴스를 캐싱함

function getAdminApp(): App {
  if (cachedApp) return cachedApp; // 모듈 스코프 캐시 우선
  const existing = getApps(); // 동일 프로세스에서 이미 초기화된 Admin App이 있는지 확인함
  if (existing.length > 0) {
    cachedApp = existing[0];
    return cachedApp;
  }

  // 환경 변수에서 서비스 계정 자격증명을 읽어옴 (.env.local 에 정의해야 함)
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  // PEM 키는 줄바꿈을 \n 문자열로 저장하므로 실제 줄바꿈으로 복원함
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey || !storageBucket) {
    throw new Error(
      "Firebase Admin 자격증명이 누락되었습니다. .env.local 에 FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_STORAGE_BUCKET 을 설정해주세요.",
    );
  }

  cachedApp = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }), // 서비스 계정으로 인증
    storageBucket, // 기본 Storage 버킷을 지정해 file() 호출 시 매번 명시하지 않아도 되도록 함
  });

  return cachedApp;
}

// 서명된 URL을 발급할 때 사용하는 Admin Storage 인스턴스 헬퍼임
export function getAdminStorage() {
  return getStorage(getAdminApp());
}

// 클라이언트에서 보낸 ID 토큰을 검증할 때 사용하는 Admin Auth 인스턴스 헬퍼임
export function getAdminAuth() {
  return getAuth(getAdminApp());
}
