// src/components/layout/Footer.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useLanguage } from "@/contexts/LanguageContext"; // 푸터 문구를 현재 언어에 맞게 가져오기 위해 사용함
import { Heart, Sparkles } from "lucide-react"; // 푸터 로고와 장식 아이콘을 가져옴

export default function Footer() { // sanctuary 하단 푸터 컴포넌트임
  const { t, lang } = useLanguage(); // 현재 언어에 맞는 번역 문구와 언어 값을 가져옴

  const footerMessage = lang === "ko" ? "당신의 판타지가, 여기에서 빛나기를" : "May your fantasy shine here"; // 현재 언어에 맞는 푸터 메인 문구를 정함

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/45 bg-[#ead8ff]/52 backdrop-blur-xl"> {/* 메인과 이어지는 연보라빛 푸터 영역임 */}
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-[#d8b4fe]/55 blur-[120px]" /> {/* 푸터 왼쪽 보라빛 번짐을 추가함 */}
      <div className="pointer-events-none absolute right-[-140px] bottom-[-140px] h-[340px] w-[340px] rounded-full bg-[#c4b5fd]/45 blur-[130px]" /> {/* 푸터 오른쪽 보라빛 번짐을 추가함 */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#9b78e5]/65 to-transparent" /> {/* 푸터 상단 장식 라인임 */}

      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-7 lg:px-10"> {/* 푸터 내부 폭과 위아래 여백을 잡음 */}
        <div className="mb-12 text-center"> {/* 푸터 메인 문구 영역임 */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <Sparkles size={22} className="text-[#8b68d8]" />
            <span className="font-serif text-[24px] font-black tracking-[0.24em] text-[#7e5dcc]">
              WINKADIA
            </span>
            <Heart size={21} className="text-[#9b78e5]" />
          </div>

          <p className="break-keep text-[22px] font-black tracking-[-0.03em] text-[#5f4a7f] sm:text-[28px]">
            {footerMessage}
          </p>

          <p className="mx-auto mt-4 max-w-[520px] break-keep text-sm font-medium leading-[1.8] text-[#8a7a9e]">
            {t.footer.madeWith}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3"> {/* 푸터 내용을 1열 또는 3열로 배치함 */}
          <div className="rounded-[26px] border border-white/60 bg-white/38 px-6 py-7 shadow-[0_14px_38px_rgba(132,98,174,0.10)]"> {/* 브랜드 정보 카드임 */}
            <h4 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#8b68d8]">
              WINKADIA
            </h4>
            <p className="text-sm font-medium leading-[1.7] text-[#8a7a9e]">
              {lang === "ko" ? "로맨스 판타지와 시리즈가 머무는 보라빛 공간" : "A lavender space for romance fantasy and series"}
            </p>
          </div>

          <div className="rounded-[26px] border border-white/60 bg-white/38 px-6 py-7 shadow-[0_14px_38px_rgba(132,98,174,0.10)]"> {/* 약관과 문의 링크 카드임 */}
            <h4 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#8b68d8]">
              Sanctuary
            </h4>

            <div className="flex flex-col items-center gap-2">
              {[t.footer.terms, t.footer.privacy, t.footer.contact].map((label) => (
                <button
                  key={label}
                  className="text-sm font-semibold text-[#8a7a9e] transition hover:text-[#7e5dcc]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-white/60 bg-white/38 px-6 py-7 shadow-[0_14px_38px_rgba(132,98,174,0.10)]"> {/* SNS 링크 카드임 */}
            <h4 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#8b68d8]">
              {t.footer.followUs}
            </h4>

            <div className="flex justify-center gap-4">
              <a
                href="https://www.youtube.com/@%EC%9C%99%EC%B9%B4%EB%94%94%EC%95%84"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/58 text-[#8b68d8] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/80"
              > {/* 유튜브 채널로 이동하는 링크임 */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/winkadia?igsh=MTJqZXhvNDllaGFmMg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/58 text-[#8b68d8] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/80"
              > {/* 인스타그램 계정으로 이동하는 링크임 */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto my-9 flex max-w-[220px] items-center justify-center gap-4 text-[#9b78e5]"> {/* 푸터 하단 장식 구분선임 */}
          <span className="h-px flex-1 bg-[#cbb7ee]" />
          <Heart size={18} />
          <span className="h-px flex-1 bg-[#cbb7ee]" />
        </div>

        <p className="text-center text-xs font-semibold tracking-[0.18em] text-[#9f91b1]">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}