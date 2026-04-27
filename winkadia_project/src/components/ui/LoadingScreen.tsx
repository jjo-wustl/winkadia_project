// src/components/ui/LoadingScreen.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useLanguage } from "@/contexts/LanguageContext"; // 로딩 문구를 현재 언어에 맞게 가져오기 위해 사용함

export default function LoadingScreen() { // 인증 확인이나 페이지 준비 중에 보여주는 로딩 화면 컴포넌트임
  const { t } = useLanguage(); // 현재 언어에 맞는 번역 문구를 가져옴
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sanctuary"> {/* 화면 전체를 덮는 로딩 오버레이임 */}
      <div className="relative">
        <div className="relative w-24 h-24 flex items-center justify-center"> {/* 가운데 로고 애니메이션 영역임 */}
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float"> {/* W 로고와 원형 장식을 표시하는 SVG임 */}
            <defs><linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="var(--pink-400)"/><stop offset="100%" stopColor="var(--purple-400)"/></linearGradient></defs>
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#pinkGrad)" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#pinkGrad)" strokeWidth="1" opacity="0.3"/>
            <text x="50" y="56" textAnchor="middle" fontFamily="Cinzel Decorative, serif" fontSize="18" fill="var(--pink-500)" fontWeight="700">W</text>
          </svg>
        </div>
      </div>
      <p className="mt-8 text-heading tracking-[4px] text-sm uppercase" style={{ color: "var(--pink-500)", opacity: 0.7 }}>{t.common.loading}</p>
      <div className="mt-6 h-[1px] overflow-hidden rounded-full" style={{ width: "192px", margin: "0 auto", background: "var(--border)" }}> {/* 반짝이는 로딩 바 영역임 */}
        <div className="h-full w-full animate-shimmer" />
      </div>
    </div>
  );
}