// src/app/sanctuary/layout.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { usePathname } from "next/navigation"; // 현재 경로가 시리즈 페이지인지 확인하기 위해 가져옴
import AuthGuard from "@/components/auth/AuthGuard"; // 로그인 여부를 확인하고 보호된 페이지 접근을 관리하는 컴포넌트를 가져옴
import Navbar from "@/components/layout/Navbar"; // sanctuary 영역에서 공통으로 사용할 상단 네비게이션을 가져옴
import Footer from "@/components/layout/Footer"; // sanctuary 영역에서 공통으로 사용할 하단 푸터를 가져옴
import { HeartRain } from "@/components/effects/ParticleEffect"; // 배경에 떠다니는 하트 비 효과만 sanctuary 영역에서 사용함 (트레일은 root layout에서 사이트 전역으로 처리됨)

export default function SanctuaryLayout({
  children,
}: {
  children: React.ReactNode;
}) { // sanctuary 경로 아래 페이지들을 공통 레이아웃으로 감싸는 컴포넌트임
  const pathname = usePathname(); // 현재 페이지 경로를 가져옴
  const isSeriesPage = pathname.startsWith("/sanctuary/series"); // 시리즈 페이지인지 확인함

  return (
    <AuthGuard>
      <div
        className={
          isSeriesPage
            ? "relative flex min-h-screen flex-col overflow-hidden bg-[#fff8fc] text-[#3a3047]"
            : "relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#fbf7ff] via-[#f3e8ff] to-[#ead8ff] text-[#3a3047]"
        }
      > {/* 전체 레이아웃을 세로 flex로 만들어 푸터가 항상 아래쪽에 위치하게 함 */}
        {isSeriesPage ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fff8fc_0%,#fff6fb_42%,#f8fbff_100%)]" /> {/* 시리즈 페이지 전용 로판 배경을 전체에 깔아 푸터 뒤까지 이어지게 함 */}
            <div className="pointer-events-none absolute left-[-185px] top-[-350px] h-[700px] w-[700px] rounded-full bg-[#ffd8ec]/55 blur-[165px]" /> {/* 시리즈 페이지 왼쪽 핑크빛 번짐임 */}
            <div className="pointer-events-none absolute right-[-185px] top-[-230px] h-[680px] w-[680px] rounded-full bg-[#eef9ff]/70 blur-[165px]" /> {/* 시리즈 페이지 오른쪽 하늘빛 번짐임 */}
            <div className="pointer-events-none absolute bottom-[-180px] left-[12%] h-[460px] w-[460px] rounded-full bg-[#e7dcff]/40 blur-[135px]" /> {/* 푸터 뒤까지 이어지는 은은한 로판빛 번짐임 */}
            <div className="pointer-events-none absolute bottom-[-160px] right-[8%] h-[420px] w-[420px] rounded-full bg-[#dff4ff]/45 blur-[135px]" /> {/* 푸터 주변에 밝은 하늘빛을 이어주는 배경임 */}
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute left-[-140px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#f4d8ff]/60 blur-[120px]" /> {/* 좌측 상단에 보랏빛 번짐을 추가함 */}
            <div className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#dcb8ff]/50 blur-[140px]" /> {/* 우측 하단에 연보라빛 번짐을 추가함 */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.78),_rgba(255,255,255,0.22)_42%,_transparent_72%)]" /> {/* 상단 중심부에 밝은 빛 번짐을 얹음 */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#ead7ff]/80 to-transparent" /> {/* 하단을 부드러운 그라데이션으로 마무리함 */}
          </>
        )}

        {!isSeriesPage && <HeartRain />} {/* 떨어지는 하트 비는 시리즈가 아닌 페이지에서만 표시함 (마우스 트레일은 root layout에서 사이트 전역으로 처리됨) */}

        <Navbar /> {/* 상단 공통 네비게이션을 표시함 */}

        <main
          className={isSeriesPage ? "relative z-10 w-full flex-1 pb-0" : "relative z-10 w-full flex-1 pb-14"}
          style={{ paddingTop: "100px" }}
        > {/* flex-1을 줘서 콘텐츠가 짧아도 푸터가 화면 아래로 밀리게 함 */}
          {children}
        </main>

        <div
          className={isSeriesPage ? "relative z-10 mt-auto w-full bg-transparent" : "relative z-10 mt-auto w-full"}
        > {/* mt-auto로 푸터를 항상 아래쪽에 붙이고, 시리즈에서는 부모 로판 배경이 그대로 보이게 함 */}
          <Footer />
        </div>
      </div>
    </AuthGuard>
  );
}