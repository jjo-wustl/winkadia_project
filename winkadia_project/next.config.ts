import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel edge 레이어에서 렌더링 전에 처리되는 redirect 정의.
  // app/page.tsx 의 redirect("/login") 만으로는 일부 Vercel 빌드/edge 환경에서
  // 라우트가 매칭되기 전 404 가 떨어지는 케이스가 보고되어, 안전하게 config 레벨에서 강제함.
  // (참고: Next.js 공식 docs - "Redirects are checked before the filesystem which includes pages and /public files.")
  async redirects() {
    return [
      {
        source: "/", // 루트 도메인 진입 시
        destination: "/login", // 로그인 페이지로 보냄
        permanent: false, // 307 (Temporary) - 추후 진입 화면 정책 변경 가능성 대비
      },
    ];
  },
};

export default nextConfig;
