// src/app/legal/_components/LegalDocument.tsx

"use client"; // useLanguage 훅 사용을 위해 클라이언트 컴포넌트

import { useLanguage } from "@/contexts/LanguageContext"; // 현재 언어 정보를 가져옴

// 법적 페이지(Terms / Privacy / Notice) 의 공통 데이터 타입임
// 각 페이지는 ko / en 별로 동일한 형태의 데이터를 제공해야 함
export type LegalContent = {
  title: string; // 페이지 제목 (h1)
  effectiveDate?: string; // 시행일 안내 (선택)
  intro?: string; // 본문 시작 전 한 문단 도입부 (선택)
  sections: { heading: string; body: string[] }[]; // 본문 섹션 목록 (heading + 단락 배열)
  closing?: string; // 본문 끝에 붙는 안내 (선택)
};

// 한국어/영어 두 언어의 LegalContent 를 받아 현재 언어에 맞게 렌더링하는 공통 컴포넌트임
export default function LegalDocument({
  ko,
  en,
}: {
  ko: LegalContent;
  en: LegalContent;
}) {
  const { lang } = useLanguage();
  const c = lang === "ko" ? ko : en;

  return (
    <article className="rounded-[28px] border border-white/70 bg-white/82 px-6 py-10 shadow-[0_22px_60px_rgba(132,98,174,0.10)] backdrop-blur-xl sm:px-10 sm:py-14">
      <header className="mb-10 border-b border-[#ecdff9] pb-8">
        <h1 className="break-keep text-3xl font-black leading-tight tracking-[-0.02em] text-[#3a2040] sm:text-4xl">
          {c.title}
        </h1>
        {c.effectiveDate && (
          <p className="mt-3 text-sm font-bold text-[#9a7c92]">{c.effectiveDate}</p>
        )}
        {c.intro && (
          <p className="mt-5 break-keep text-base leading-relaxed text-[#5f4b8f] sm:text-[17px]">
            {c.intro}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-8">
        {c.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 break-keep text-lg font-black leading-snug text-[#4f3a9f] sm:text-xl">
              {section.heading}
            </h2>
            <div className="flex flex-col gap-3">
              {section.body.map((paragraph, idx) => (
                <p
                  key={`${section.heading}-${idx}`}
                  className="break-keep whitespace-pre-line text-[15px] leading-[1.85] text-[#3a3047] sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {c.closing && (
        <p className="mt-10 break-keep border-t border-[#ecdff9] pt-6 text-sm leading-relaxed text-[#9a7c92] sm:text-base">
          {c.closing}
        </p>
      )}
    </article>
  );
}
