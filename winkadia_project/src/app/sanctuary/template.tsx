// src/app/sanctuary/template.tsx

"use client"; // 페이지 이동마다 sanctuary 하위 화면을 새로 마운트하기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, type ReactNode } from "react"; // 페이지 이동 후 스크롤 초기화와 children 타입 지정을 위해 가져옴
import { usePathname } from "next/navigation"; // 현재 경로를 기준으로 화면을 새로 잡기 위해 가져옴

export default function SanctuaryTemplate({
  children,
}: {
  children: ReactNode;
}) { // sanctuary 하위 페이지가 바뀔 때마다 내부 화면을 새로 마운트하는 템플릿임
  const pathname = usePathname(); // 현재 페이지 경로를 가져옴

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }); // 페이지 이동 후 이전 스크롤 위치가 남지 않도록 맨 위로 초기화함
  }, [pathname]);

  return (
    <div key={pathname} className="contents">
      {children}
    </div>
  );
}