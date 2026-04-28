// src/components/ui/LanguageToggle.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useLanguage } from "@/contexts/LanguageContext"; // 현재 언어와 언어 변경 함수를 가져오기 위해 사용함

export default function LanguageToggle() { // 한국어와 영어를 전환하는 버튼 컴포넌트임
  const { lang, setLang } = useLanguage(); // 현재 언어와 언어 변경 함수를 가져옴

  return (
    <button
      onClick={() => setLang(lang === "ko" ? "en" : "ko")}
      className="flex min-h-[34px] min-w-[120px] items-center justify-center gap-2.5 rounded-full border py-1.5 text-[15px] font-bold tracking-[0.14em] transition-all duration-300"
      style={{
        paddingLeft: "0px",
        paddingRight: "0px",
        borderColor: "var(--border)",
        fontFamily: "var(--font-heading)",
        color: "var(--purple-500)",
        background: "var(--bg-card)",
      }}
      title="Toggle Language"
    > {/* 현재 언어에 따라 ko와 en을 서로 전환함 */}
      <span style={{ opacity: lang === "ko" ? 1 : 0.4, transition: "opacity 0.3s" }}>
        KOR
      </span>

      <span style={{ color: "var(--border-strong)" }}>
        |
      </span>

      <span style={{ opacity: lang === "en" ? 1 : 0.4, transition: "opacity 0.3s" }}>
        ENG
      </span>
    </button>
  );
}