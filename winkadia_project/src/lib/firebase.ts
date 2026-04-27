// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app"; // Firebase 앱 초기화와 기존 앱 재사용 기능을 가져옴
import { getAuth } from "firebase/auth"; // Firebase Authentication 객체를 만들기 위해 가져옴
import { getFirestore } from "firebase/firestore"; // Firestore 데이터베이스 객체를 만들기 위해 가져옴
import { getStorage } from "firebase/storage"; // Firebase Storage 객체를 만들기 위해 가져옴

const firebaseConfig = { // Firebase 프로젝트 연결에 필요한 환경변수 설정값임
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // Firebase API 키를 환경변수에서 가져옴
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, // Firebase 인증 도메인을 환경변수에서 가져옴
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // Firebase 프로젝트 id를 환경변수에서 가져옴
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Firebase Storage 버킷 주소를 환경변수에서 가져옴
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // Firebase 메시징 발신자 id를 환경변수에서 가져옴
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, // Firebase 앱 id를 환경변수에서 가져옴
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); // 이미 초기화된 앱이 없으면 새로 만들고 있으면 기존 앱을 재사용함

export const auth = getAuth(app); // Firebase 로그인 기능에서 사용할 auth 객체를 내보냄
export const db = getFirestore(app); // Firestore 데이터베이스에서 사용할 db 객체를 내보냄
export const storage = getStorage(app); // Firebase Storage에서 사용할 storage 객체를 내보냄
export default app; // Firebase 앱 객체를 기본값으로 내보냄