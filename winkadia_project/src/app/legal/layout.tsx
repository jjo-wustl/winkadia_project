// src/app/legal/layout.tsx

"use client"; // LanguageToggle 사용을 위해 클라이언트 컴포넌트로 사용함

import Link from "next/link"; // 홈으로 돌아가는 링크에 사용
import { ArrowLeft } from "lucide-react"; // 뒤로가기 아이콘
import LanguageToggle from "@/components/ui/LanguageToggle"; // 한/영 전환 버튼

// /legal/* 경로에 공통으로 적용되는 레이아웃임. 로그인 없이 접근 가능해야 하므로 sanctuary 레이아웃 밖에 위치함
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    // === 가운데 정렬 — flex flex-col items-center 패턴 (mx-auto 단독으로는 일부 환경에서 동작하지 않는 케이스가 있어 watch 페이지와 동일한 안전 패턴 적용) ===
    // 외부 wrapper 를 flex 컨테이너(세로 방향)로 만들고 items-center 로 자식 모두를 horizontal 가운데에 강제 정렬함
    <div className="relative flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-[#fbf7ff] via-[#f3e8ff] to-[#ead8ff] text-[#3a3047]">
      {/* 페이지 상단 미니멀 헤더 - 로고/홈 링크 + 언어 토글. items-center 가 horizontal 정렬을 처리하므로 mx-auto 불필요 */}
      <header className="relative z-10 flex w-full max-w-5xl items-center justify-between px-6 py-6 sm:py-8">
        <Link
          href="/sanctuary"
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-5 py-2.5 text-sm font-black text-[#7f5bcc] shadow-sm transition hover:bg-white"
          style={{ textDecoration: "none" }}
        >
          <ArrowLeft size={16} />
          Winkadia
        </Link>

        <LanguageToggle />
      </header>

      {/* 본문 - max-width 제한 + items-center 에 의해 가운데 정렬 */}
      <main className="relative z-10 w-full max-w-3xl px-6 pb-24 pt-4 sm:pt-8">
        {children}
      </main>
    </div>
  );
}
