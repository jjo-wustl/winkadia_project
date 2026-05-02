// src/app/sanctuary/gallery/page.tsx
//
// Gallery 페이지 - 추후 업데이트 예정.
// 현재는 Coming Soon 플레이스홀더로만 노출됨. 실제 비주얼 아카이브는 추후 작업에서 채워질 예정.

"use client"; // useLanguage 훅 사용을 위해 클라이언트 컴포넌트

import { Camera, Clock, Sparkles } from "lucide-react"; // 페이지 장식 아이콘
import { useLanguage } from "@/contexts/LanguageContext"; // 한/영 번역 처리

export default function GalleryPage() {
  const { lang } = useLanguage(); // 현재 언어 (ko / en)

  // 페이지 카피는 분량이 적고 다른 페이지와 공유되지 않으므로 인라인으로 작성함 (i18n 키 추가 불필요)
  const copy = lang === "ko"
    ? {
        badge: "공개 예정",
        eyebrow: "WINKADIA",
        title: "Gallery",
        message: "갤러리 페이지는 현재 업데이트 준비 중입니다.\n곧 윙카디아의 비주얼 아카이브로 다시 찾아뵙겠습니다.",
        statusLabel: "Coming Soon",
        statusDesc: "더 풍성한 콘텐츠로 곧 돌아옵니다",
      }
    : {
        badge: "Coming Soon",
        eyebrow: "WINKADIA",
        title: "Gallery",
        message: "The Gallery is currently being updated.\nWe'll be back soon with Winkadia's visual archive.",
        statusLabel: "Coming Soon",
        statusDesc: "Richer content arriving shortly",
      };

  return (
    // === 가운데 정렬 - 다중 안전장치 ===
    // 1) 외부 wrapper: flex w-full justify-center → 내부 카드를 horizontal 가운데로 강제
    // 2) 카드 자체도 flex flex-col items-center 컨테이너로 만들어 자식 콘텐츠를 가운데 정렬 (mx-auto 단독으로 안 잡히는 환경 대비)
    <div className="flex w-full justify-center px-6 py-16 text-[#32283d]">
      <div className="relative flex w-full max-w-[1100px] flex-col items-center overflow-hidden rounded-[42px] border border-white/80 bg-white/76 px-6 py-20 shadow-[0_30px_110px_rgba(120,82,166,0.20)] backdrop-blur-2xl sm:px-12 sm:py-24">
        {/* 배경 빛 번짐 장식 - position:absolute 이므로 flex 레이아웃에 영향 없음 */}
        <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#ead8ff]/70 blur-[100px]" />
        <div className="pointer-events-none absolute right-[-140px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-[#f4d8ff]/70 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.85),_rgba(255,255,255,0.20)_50%,_transparent_80%)]" />

        {/* 상단 브랜드 라벨 */}
        <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#e6d7fb] bg-white/80 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] text-[#8b68d8] shadow-sm">
          <Sparkles size={13} />
          {copy.eyebrow}
        </span>

        {/* 페이지 타이틀 - text-center 로 다중 라인 시 가운데 정렬 보장 */}
        <h1 className="relative z-10 mt-6 break-keep text-center text-[56px] font-black leading-[1.05] tracking-[-0.04em] text-[#30283b] sm:text-[80px]">
          {copy.title}
        </h1>

        {/* 공개 예정 상태 배지 */}
        <span className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#cbb4ec] bg-white/72 px-5 py-2 text-[12px] font-black uppercase tracking-[0.18em] text-[#8b68d8] shadow-sm">
          <Clock size={13} />
          {copy.badge}
        </span>

        {/* 설명 문구 - whitespace-pre-line 으로 \n 줄바꿈 적용 + text-center 로 가운데 정렬 */}
        <p className="relative z-10 mt-8 max-w-xl whitespace-pre-line break-keep text-center text-base leading-[1.85] text-[#7b7284] sm:text-lg">
          {copy.message}
        </p>

        {/* 하단 placeholder 카드 - 점선 테두리 + 카메라 아이콘 */}
        <div className="relative z-10 mt-12 flex w-full max-w-md flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#e5d6f0] bg-white/40 px-8 py-10 text-center backdrop-blur-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e6d7fb] bg-white/80 text-[#8b68d8] shadow-sm">
            <Camera size={26} />
          </div>
          <p className="text-base font-black uppercase tracking-[0.18em] text-[#8b68d8]">
            {copy.statusLabel}
          </p>
          <p className="break-keep text-sm font-semibold leading-relaxed text-[#9b78c2]">
            {copy.statusDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
