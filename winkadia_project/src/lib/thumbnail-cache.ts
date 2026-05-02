// src/lib/thumbnail-cache.ts
//
// 썸네일 로딩 latency를 줄이기 위한 클라이언트 측 캐시 모듈임.
//
// 두 단계 캐싱:
//   1) URL 캐시 — Firebase getDownloadURL 호출 결과를 path -> Promise<url> 로 메모이즈
//      같은 path를 다시 요청해도 재발급 안 받고 즉시 캐시된 Promise 반환
//   2) 이미지 바이트 프리로드 — URL 이 받아지면 곧바로 new Image().src 로 브라우저 HTTP 캐시에 미리 적재
//      실제 <img src=url> 렌더 시점엔 디스크/메모리 캐시에서 즉시 그려짐 → 깜빡임 거의 사라짐
//
// 모듈 스코프 변수이므로 페이지 이동(Home <-> Series) 사이에는 캐시가 유지되고,
// 새 탭/새로고침 시에는 자연스럽게 초기화됨

"use client";

import { getStorageUrl } from "./storage";

// path -> URL Promise 캐시 (Promise 자체를 캐시하여 in-flight 중복 요청도 자동으로 dedup 됨)
const urlCache = new Map<string, Promise<string>>();

// 이미 브라우저에 프리로드를 트리거한 URL 집합 (중복 트리거 방지)
const preloadedImages = new Set<string>();

// path 의 다운로드 URL 을 캐시에서 가져오거나 처음이면 발급함.
// URL이 받아지면 동시에 브라우저로 이미지 바이트도 미리 받아둠
export function getStorageUrlCached(path: string): Promise<string> {
  const existing = urlCache.get(path);
  if (existing) return existing;

  const pending = getStorageUrl(path);
  urlCache.set(path, pending);

  // 발급 실패 시 다음 요청에서 재시도 가능하도록 캐시에서 제거
  pending.catch(() => {
    urlCache.delete(path);
  });

  // URL 이 받아지자마자 이미지 바이트도 백그라운드 프리로드
  pending
    .then((url) => {
      if (typeof window === "undefined") return; // SSR 경로 안전 가드
      if (preloadedImages.has(url)) return;
      preloadedImages.add(url);

      const img = new window.Image();
      img.decoding = "async"; // 메인 스레드 블로킹 방지
      img.src = url; // 브라우저가 HTTP 캐시에 적재 - 후속 <img> 렌더 시 즉시 hit
    })
    .catch(() => {
      // URL 자체가 실패한 경우는 위에서 처리했으므로 여기서는 무시
    });

  return pending;
}

// 여러 path를 한 번에 백그라운드로 prefetch 시작함. 실제 await 하지 않으므로 호출자 차단 없음
export function prefetchThumbnails(paths: readonly string[]): void {
  for (const path of paths) {
    // getStorageUrlCached 내부에서 자동으로 image bytes 프리로드까지 트리거됨
    void getStorageUrlCached(path);
  }
}
