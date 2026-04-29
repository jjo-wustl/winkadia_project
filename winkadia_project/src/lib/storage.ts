// src/lib/storage.ts

import { getDownloadURL, ref } from "firebase/storage"; // Storage 파일 경로를 실제 URL로 바꾸기 위해 가져옴
import { storage } from "@/lib/firebase"; // Firebase Storage 객체를 가져옴

export async function getStorageUrl(path: string) { // Firebase Storage 안의 파일 경로를 실제 접근 가능한 URL로 변환함
  const fileRef = ref(storage, path); // Storage 내부 파일 위치를 참조함
  return getDownloadURL(fileRef); // 브라우저에서 사용할 수 있는 다운로드 URL을 반환함
}