// src/app/layout.tsx

import type { Metadata } from "next"; // Next.js에서 메타데이터 타입을 가져옴
import "./globals.css"; // 전체 앱에 적용되는 전역 CSS 파일을 불러옴
import { AuthProvider } from "@/contexts/AuthContext"; // 로그인 상태를 앱 전체에서 사용할 수 있게 감싸주는 Provider를 가져옴
import { LanguageProvider } from "@/contexts/LanguageContext"; // 언어 상태를 앱 전체에서 사용할 수 있게 감싸주는 Provider를 가져옴

export const metadata: Metadata = { // Next.js에서 사용하는 사이트 기본 메타데이터를 정의함
  title: "Winkadia — The Sanctuary", // 브라우저 탭에 표시될 사이트 제목을 설정함
  description:
    "A place where only the chosen may enter. Witness tales of destiny and romance in the world of Winkadia.", // 사이트 설명 문구를 설정함
  icons: { icon: "/favicon.ico" }, // 사이트 파비콘 아이콘 경로를 설정함
};

export default function RootLayout({ // 전체 페이지를 감싸는 최상위 레이아웃 컴포넌트임
  children,
}: {
  children: React.ReactNode; // 현재 접속한 페이지 컴포넌트가 children으로 들어옴
}) {
  return (
    // html 태그의 기본 언어를 한국어로 설정함
    // suppressHydrationWarning은 서버와 브라우저 렌더링 차이로 생기는 경고를 줄이기 위해 사용함
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-sanctuary" suppressHydrationWarning> {/* 전체 body에 sanctuary 배경 클래스를 적용함 */}
        <LanguageProvider> {/* 언어 상태를 앱 전체에서 사용할 수 있도록 감쌈 */}
          <AuthProvider>{children}</AuthProvider> {/* 인증 상태를 앱 전체에서 사용할 수 있도록 실제 페이지 내용을 감쌈 */}
        </LanguageProvider>
      </body>
    </html>
  );
}