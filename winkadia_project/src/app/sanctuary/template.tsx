// src/app/sanctuary/template.tsx

"use client"; // 페이지 이동마다 sanctuary 하위 화면을 새로 마운트하기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react"; // 페이지 이동 전후 스크롤 초기화와 children 타입 지정을 위해 가져옴
import { usePathname } from "next/navigation"; // 현재 경로를 기준으로 화면을 새로 잡기 위해 가져옴

// SSR 환경에서는 useLayoutEffect를 사용할 수 없으므로 브라우저에서만 useLayoutEffect를 사용하고 그 외에는 useEffect로 대체함
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// CSS의 scroll-behavior:smooth가 라우트 전환 시 영향을 주지 못하도록 항상 즉시(instant) 스크롤을 강제함
// (behavior:"auto"는 CSS scroll-behavior 값을 그대로 따르므로 smooth가 적용되어 페이지 전환 중 잔상이 남을 수 있음)
function forceScrollTop() {
  if (typeof window === "undefined") return;
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  } catch {
    // 일부 구형 브라우저는 ScrollToOptions의 instant를 지원하지 않으므로 좌표 기반 호출로 폴백함
    window.scrollTo(0, 0);
  }
  // documentElement와 body 양쪽을 모두 0으로 맞춰 스크롤 컨테이너가 어느 쪽이든 즉시 최상단이 되게 함
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
}

export default function SanctuaryTemplate({
  children,
}: {
  children: ReactNode;
}) { // sanctuary 하위 페이지가 바뀔 때마다 내부 화면을 새로 마운트하는 템플릿임
  const pathname = usePathname(); // 현재 페이지 경로를 가져옴
  const hasMountedRef = useRef(false); // 첫 마운트 시 한 번만 처리할 작업이 있는지 추적함

  useIsomorphicLayoutEffect(() => {
    // Next.js 16의 <Link> 기본 동작은 "현재 스크롤 위치 유지"이며, fixed/sticky 헤더가 있으면 콘텐츠가 헤더 뒤에 가려질 수 있음
    // (참고: Next.js 공식 문서 "Scroll offset with sticky headers" 섹션 + disable-smooth-scroll 모듈)
    // 이를 방지하기 위해 브라우저 자동 스크롤 복구를 수동 모드로 전환하고, 경로 변경 시 항상 페이지 최상단으로 즉시 스크롤함

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        try {
          window.history.scrollRestoration = "manual"; // 브라우저가 이전 스크롤 위치를 자동으로 복구하지 않도록 설정함
        } catch {
          // 일부 브라우저에서 scrollRestoration 설정이 차단될 수 있으므로 안전하게 무시함
        }
      }
    }

    // 경로가 바뀌는 시점에 페인트가 발생하기 전 즉시 스크롤을 최상단으로 이동시킴 (sticky 헤더 뒤 가려짐 방지)
    forceScrollTop();
  }, [pathname]);

  useEffect(() => {
    // Next.js 내부의 layout-router가 useLayoutEffect 단계에서 자체 스크롤 보정을 수행하므로,
    // 페인트 직후에 한 번 더 강제로 최상단으로 보정해 두 동작이 충돌해도 최종 위치를 보장함
    const id = window.requestAnimationFrame(() => {
      forceScrollTop();
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>; // 추가 wrapper 없이 children을 그대로 반환하여 레이아웃에 영향을 주지 않음
}
