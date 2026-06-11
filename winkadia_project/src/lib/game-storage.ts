// src/lib/game-storage.ts
//
// Firebase Storage 경로를 실제 다운로드 URL로 변환하는 공통 유틸 함수임.

import { getDownloadURL, ref } from "firebase/storage"; // Storage 파일 경로로 다운로드 URL을 가져오기 위해 사용함
import { storage } from "@/lib/firebase"; // 프로젝트에서 사용하는 Firebase Storage 인스턴스를 가져옴

const storageUrlCache = new Map<string, string>(); // 같은 Storage 경로를 반복 호출하지 않기 위한 메모리 캐시임

export async function getGameStorageUrl(path: string): Promise<string> {
  // Firebase Storage 내부 경로를 실제 브라우저에서 접근 가능한 URL로 변환함
  if (!path) {
    return "";
  }

  const cachedUrl = storageUrlCache.get(path); // 이미 발급된 URL이 있는지 확인함

  if (cachedUrl) {
    return cachedUrl;
  }

  const fileRef = ref(storage, path); // Storage 내부 파일 참조를 생성함
  const downloadUrl = await getDownloadURL(fileRef); // 실제 다운로드 URL을 발급받음

  storageUrlCache.set(path, downloadUrl); // 다음 렌더링에서 재사용할 수 있도록 캐시에 저장함

  return downloadUrl;
}