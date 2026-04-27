// src/app/sanctuary/layout.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import AuthGuard from "@/components/auth/AuthGuard"; // 로그인 여부를 확인하고 보호된 페이지 접근을 관리하는 컴포넌트를 가져옴
import Navbar from "@/components/layout/Navbar"; // sanctuary 영역에서 공통으로 사용할 상단 네비게이션을 가져옴
import Footer from "@/components/layout/Footer"; // sanctuary 영역에서 공통으로 사용할 하단 푸터를 가져옴
import HeartEffect from "@/components/effects/ParticleEffect"; // 배경에 떠다니는 하트나 파티클 효과를 보여주는 컴포넌트를 가져옴

export default function SanctuaryLayout({
  children,
}: {
  children: React.ReactNode;
}) { // sanctuary 경로 아래 페이지들을 공통 레이아웃으로 감싸는 컴포넌트임
  return (
    <AuthGuard>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fbf7ff] via-[#f3e8ff] to-[#ead8ff] text-[#3a3047]"> {/* 로그인 화면과 같은 연보라빛 전체 배경을 적용함 */}
        <div className="pointer-events-none absolute left-[-140px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#f4d8ff]/60 blur-[120px]" /> {/* 좌측 상단에 보랏빛 번짐을 추가함 */}
        <div className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#dcb8ff]/50 blur-[140px]" /> {/* 우측 하단에 연보라빛 번짐을 추가함 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.78),_rgba(255,255,255,0.22)_42%,_transparent_72%)]" /> {/* 상단 중심부에 밝은 빛 번짐을 얹음 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#ead7ff]/80 to-transparent" /> {/* 하단을 부드러운 그라데이션으로 마무리함 */}

        <HeartEffect /> {/* 배경에 움직이는 효과를 표시함 */}

        <Navbar /> {/* 상단 공통 네비게이션을 표시함 */}

        <main className="relative z-10 w-full px-4 pb-14 pt-[128px] sm:px-6 lg:px-8"> {/* fixed 헤더 높이만큼 메인을 아래로 내려 카드가 가려지지 않게 함 */}
          {children}
        </main>

        <div className="relative z-10 w-full"> {/* 푸터가 화면 가로 전체를 사용할 수 있게 감싸는 영역임 */}
          <Footer />
        </div>
      </div>
    </AuthGuard>
  );
}