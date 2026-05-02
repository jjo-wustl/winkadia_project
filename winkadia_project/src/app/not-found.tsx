// src/app/not-found.tsx
//
// 모든 알 수 없는 경로(404) 에서 표시되는 커스텀 not-found 페이지임.
// 이 파일이 존재해야 Next.js 가 Vercel 의 기본 "404: NOT_FOUND" 화면 대신 우리 디자인을 렌더링함.
// 로그인 화면이 진입점인 구조이므로 사용자에게 명확하게 로그인으로 돌아갈 동선을 제공함.

"use client"; // useLanguage 훅 사용을 위해 클라이언트 컴포넌트

import Link from "next/link"; // 클라이언트 측 라우팅으로 login 으로 이동
import { Sparkles, ArrowRight } from "lucide-react"; // 장식 + 버튼 아이콘
import { useLanguage } from "@/contexts/LanguageContext"; // 한/영 번역 처리

export default function NotFound() {
  const { lang } = useLanguage();

  // 분량이 적고 다른 페이지와 공유되지 않으므로 인라인 카피 (i18n 키 추가 불필요)
  const copy = lang === "ko"
    ? {
        eyebrow: "404 — Not Found",
        title: "길을 잃으셨나요?",
        message: "찾으시는 페이지가 존재하지 않거나, 위치가 변경되었을 수 있습니다.",
        cta: "로그인 페이지로 가기",
      }
    : {
        eyebrow: "404 — Not Found",
        title: "Lost in the stars?",
        message: "The page you are looking for doesn't exist or may have moved.",
        cta: "Go to Login",
      };

  return (
    // === 가운데 정렬 - flex justify-center 패턴 (mx-auto 단독 실패 케이스 대비) ===
    <div className="flex min-h-screen w-full justify-center bg-gradient-to-br from-[#fbf7ff] via-[#f3e8ff] to-[#ead8ff] px-6 py-16 text-[#3a3047]">
      <div className="relative flex w-full max-w-2xl flex-col items-center justify-center text-center">
        {/* 배경 빛 번짐 장식 */}
        <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-[#ead8ff]/70 blur-[100px]" />
        <div className="pointer-events-none absolute right-[-100px] bottom-[-100px] h-[320px] w-[320px] rounded-full bg-[#f4d8ff]/70 blur-[100px]" />

        {/* 상단 라벨 */}
        <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#e6d7fb] bg-white/80 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] text-[#8b68d8] shadow-sm">
          <Sparkles size={13} />
          {copy.eyebrow}
        </span>

        {/* 메인 타이틀 */}
        <h1 className="relative z-10 mt-8 break-keep text-center text-5xl font-black leading-[1.1] tracking-[-0.03em] text-[#30283b] sm:text-6xl">
          {copy.title}
        </h1>

        {/* 설명 */}
        <p className="relative z-10 mt-6 max-w-md break-keep text-center text-base leading-relaxed text-[#7b7284] sm:text-lg">
          {copy.message}
        </p>

        {/* 로그인으로 돌아가기 버튼 */}
        <Link
          href="/login"
          className="relative z-10 mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#9b78e5] to-[#7f5bcc] px-8 py-3.5 text-sm font-black text-white shadow-[0_14px_36px_rgba(127,91,204,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(127,91,204,0.36)]"
          style={{ textDecoration: "none" }}
        >
          {copy.cta}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
