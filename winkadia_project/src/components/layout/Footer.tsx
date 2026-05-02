// src/components/layout/Footer.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import Link from "next/link"; // 법적 페이지(/legal/*) 링크를 위해 가져옴
import { useLanguage } from "@/contexts/LanguageContext"; // 현재 언어에 맞는 푸터 문구를 가져오기 위해 사용함

// 현재 운영 중인 SNS 채널만 노출함. 추후 채널이 늘어나면 이 배열에 추가
const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/winkadia?igsh=MTJqZXhvNDllaGFmMg%3D%3D&utm_source=qr",
    icon: "/images/footer/instagram.png",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@%EC%9C%99%EC%B9%B4%EB%94%94%EC%95%84",
    icon: "/images/footer/youtube.png",
  },
]; // 푸터에 보여줄 SNS 아이콘 이미지와 이동 경로를 모아둠 (X / TikTok / Mail 등 미운영 채널은 일단 숨김)

const CONTACT_EMAIL = "its.winkadia@gmail.com"; // 푸터 하단에 노출할 공식 문의 이메일임

export default function Footer() { // sanctuary 하단 푸터 컴포넌트임
  const { t, lang } = useLanguage(); // 현재 언어와 번역 문구를 가져옴

  const footerMessage =
    lang === "ko"
      ? "당신의 판타지가, 여기에서 빛나기를"
      : "May your fantasy shine here"; // 현재 언어에 맞는 푸터 메인 문구를 정함

  // 법적 페이지 링크 데이터 - 추가 페이지가 생기면 이 배열에 항목만 추가하면 됨
  const legalLinks = [
    { label: t.footer.terms, href: "/legal/terms" },
    { label: t.footer.privacy, href: "/legal/privacy" },
    { label: t.footer.notice, href: "/legal/notice" },
  ];

  return (
    <footer className="relative w-full overflow-hidden"> {/* footer.png 위에 푸터 문구와 아이콘을 올리는 영역임 */}
      <img
        src="/footer.png"
        alt=""
        className="block h-auto w-full select-none object-contain"
      /> {/* public/footer.png 이미지를 원본 비율 그대로 가로 꽉 차게 표시함 */}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-[2.4%] text-center"> {/* footer.png 위 중앙에 푸터 내용을 배치함 */}
        <div className="relative px-5 py-3 sm:px-7 sm:py-4 lg:px-10 lg:py-5"> {/* 글씨와 아이콘을 한 번 감싸는 기준 영역임 */}
          <div className="pointer-events-none absolute inset-[-76px] rounded-[999px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.82)_38%,_rgba(255,255,255,0.42)_62%,_rgba(255,255,255,0)_88%)] blur-[6px]" /> {/* 글씨와 아이콘 뒤에 흰색 그라데이션을 깔아 배경에 묻히지 않게 함 */}

          <div className="relative z-10"> {/* 실제 푸터 콘텐츠를 그라데이션 위에 올림 */}
            <p
              className="mb-3 break-keep text-[13px] font-black tracking-[0.14em] text-[#6f4fbd] sm:mb-4 sm:text-[21px] lg:mb-5 lg:text-[28px]"
              style={{ textShadow: "0 1px 5px rgba(255,255,255,0.72)" }}
            >
              {footerMessage} ♡
            </p> {/* 푸터 메인 감성 문구임 */}

            <div className="mb-3 flex items-center justify-center gap-2.5 sm:mb-4 sm:gap-4 lg:mb-5"> {/* SNS 아이콘 이미지 버튼들을 가로로 배치함 */}
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ad8fe4]/90 bg-white/78 shadow-[0_5px_16px_rgba(92,64,145,0.20)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                > {/* 각 SNS 링크로 이동하는 원형 아이콘 버튼임 */}
                  <img
                    src={item.icon}
                    alt=""
                    className="h-[15px] w-[15px] select-none object-contain opacity-95 sm:h-[20px] sm:w-[20px] lg:h-[22px] lg:w-[22px]"
                  /> {/* public/images/footer 안의 아이콘 이미지를 표시함 */}
                </a>
              ))}
            </div>

            {/* 문의 이메일 - SNS 아래에 한 줄로 노출 (mailto 링크) */}
            <p className="mb-3 hidden text-[12px] font-bold leading-relaxed text-[#5f4b8f] sm:mb-4 sm:block sm:text-[14px] lg:mb-5 lg:text-[15px]">
              {t.footer.contactLabel}
              <span className="mx-1.5 text-[#9a7bd7]">·</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-black text-[#6f4fbd] underline-offset-4 transition hover:text-[#4f3a9f] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>

            <div className="hidden items-center justify-center gap-4 text-[13px] font-black text-[#5f4b8f] sm:flex sm:text-[15px] lg:text-[18px]"> {/* 푸터 약관, 개인정보, 법적 고지 링크 영역 */}
              {legalLinks.map((link, index) => (
                <span key={link.href} className="inline-flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-[#6f4fbd]"
                    style={{ textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-[#9a7bd7]">|</span>
                  )}
                </span>
              ))}
            </div>

            <p className="mt-2 hidden text-[12px] font-black tracking-[0.08em] text-[#6f6384] sm:block sm:text-[13px] lg:mt-3 lg:text-[15px]">
              {t.footer.copyright}
            </p> {/* 저작권 문구를 표시함 */}
          </div>
        </div>
      </div>
    </footer>
  );
}
