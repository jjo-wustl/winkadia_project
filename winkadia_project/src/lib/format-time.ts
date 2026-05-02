// src/lib/format-time.ts
//
// 댓글 시간 표시("3분 전", "5 minutes ago") 를 위한 상대 시간 포맷터.
// 브라우저 내장 Intl.RelativeTimeFormat 사용 — 외부 라이브러리 불필요.

import type { Language } from "@/types";

// 단위별 초 단위 임계값 정의 (작은 단위 -> 큰 단위 순서)
const UNITS: Array<{ unit: Intl.RelativeTimeFormatUnit; seconds: number }> = [
  { unit: "year", seconds: 31_536_000 }, // 365일
  { unit: "month", seconds: 2_592_000 }, // 30일
  { unit: "week", seconds: 604_800 }, // 7일
  { unit: "day", seconds: 86_400 },
  { unit: "hour", seconds: 3_600 },
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 },
];

// Date 객체를 받아 현재 시간 기준 상대 표기를 반환함.
// 예: 한국어 "3분 전" / 영어 "3 minutes ago".
// numeric: "auto" 옵션으로 인해 매우 짧은 시간은 "방금" / "now" 처럼 자연스럽게 표시됨.
export function formatRelativeTime(date: Date, lang: Language): string {
  const locale = lang === "ko" ? "ko" : "en";
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const absSeconds = Math.abs(diffSeconds);

  // 5초 미만은 "방금" / "now" 로 통일감 있게 처리
  if (absSeconds < 5) {
    return rtf.format(0, "second");
  }

  // 가장 큰 적합한 단위를 찾아 그 단위로 포맷팅
  for (const { unit, seconds } of UNITS) {
    if (absSeconds >= seconds) {
      const value = Math.round(diffSeconds / seconds);
      return rtf.format(value, unit);
    }
  }

  // fallback (1초 미만 등)
  return rtf.format(0, "second");
}
