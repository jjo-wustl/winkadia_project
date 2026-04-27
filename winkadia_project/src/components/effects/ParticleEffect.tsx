// src/components/effects/ParticleEffect.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useEffect, useRef, useCallback } from "react"; // DOM 참조, 이벤트 등록, 함수 재사용을 위해 React 훅들을 가져옴

const HEART_COLORS = ["#ffb6c1", "#fff4b8", "#b8d4ff", "#ffd6ee", "#d4b0ff", "#ffe0ec"]; // 하트 파티클에 사용할 색상 목록임
const HEART_SVG = (color: string, size: number) => // 색상과 크기를 받아 하트 SVG 문자열을 만드는 함수임
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

export default function HeartEffect() { // 화면에 하트 비와 마우스 하트 효과를 표시하는 컴포넌트임
  const rainRef = useRef<HTMLDivElement>(null); // 하트 비가 들어갈 DOM 영역을 참조함
  const trailRef = useRef<HTMLDivElement>(null); // 마우스 이동 하트가 들어갈 DOM 영역을 참조함

  // Heart rain
  useEffect(() => { // 컴포넌트가 처음 보일 때 하트 비 파티클을 생성함
    const container = rainRef.current; // 하트 비를 넣을 컨테이너를 가져옴
    if (!container) return; // 컨테이너가 없으면 실행하지 않음

    const hearts: HTMLDivElement[] = []; // 생성한 하트 요소들을 저장해 나중에 제거하기 위해 사용함
    const count = 25; // 생성할 하트 개수임

    for (let i = 0; i < count; i++) { // 정해진 개수만큼 하트를 생성함
      const heart = document.createElement("div"); // 하트 하나를 담을 div를 생성함
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]; // 하트 색상을 랜덤으로 선택함
      const size = 10 + Math.random() * 16; // 하트 크기를 랜덤으로 정함
      const opacity = 0.15 + Math.random() * 0.25; // 하트 투명도를 랜덤으로 정함
      const duration = 8 + Math.random() * 12; // 하트가 떨어지는 시간을 랜덤으로 정함
      const delay = Math.random() * duration; // 하트 애니메이션 시작 지연 시간을 랜덤으로 정함
      const rotate = -30 + Math.random() * 60; // 하트 회전 각도를 랜덤으로 정함

      heart.innerHTML = HEART_SVG(color, size); // 하트 div 안에 SVG를 넣음
      heart.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: -30px;
        pointer-events: none;
        --heart-scale: ${0.6 + Math.random() * 0.8};
        --heart-opacity: ${opacity};
        --heart-rotate: ${rotate}deg;
        animation: heartFall ${duration}s linear ${delay}s infinite;
        filter: blur(${Math.random() > 0.7 ? 1 : 0}px);
      `; // 하트의 위치, 크기, 투명도, 회전, 애니메이션 스타일을 설정함

      container.appendChild(heart); // 하트 요소를 화면 컨테이너에 추가함
      hearts.push(heart); // 나중에 제거할 수 있게 배열에 저장함
    }

    return () => { hearts.forEach((h) => h.remove()); }; // 컴포넌트가 사라질 때 생성한 하트들을 제거함
  }, []);

  // Mouse trail
  const handleMouseMove = useCallback((e: MouseEvent) => { // 마우스가 움직일 때 작은 하트를 남기는 함수임
    const container = trailRef.current; // 마우스 하트를 넣을 컨테이너를 가져옴
    if (!container) return; // 컨테이너가 없으면 실행하지 않음
    if (Math.random() > 0.3) return; // 너무 많이 생성되지 않도록 일부 움직임만 처리함

    const heart = document.createElement("div"); // 마우스 위치에 표시할 하트 div를 생성함
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]; // 하트 색상을 랜덤으로 선택함
    const size = 8 + Math.random() * 12; // 하트 크기를 랜덤으로 정함

    heart.innerHTML = HEART_SVG(color, size); // 하트 div 안에 SVG를 넣음
    heart.style.cssText = `
      position: fixed;
      left: ${e.clientX - size / 2}px;
      top: ${e.clientY - size / 2}px;
      pointer-events: none;
      z-index: 9999;
      animation: heartPop 0.8s ease-out forwards;
    `; // 마우스 위치 기준으로 하트 위치와 애니메이션을 설정함

    container.appendChild(heart); // 하트 요소를 화면 컨테이너에 추가함
    setTimeout(() => heart.remove(), 800); // 애니메이션이 끝난 뒤 하트 요소를 제거함
  }, []);

  useEffect(() => { // 마우스 이동 이벤트를 등록하고 정리함
    window.addEventListener("mousemove", handleMouseMove); // 마우스 이동 시 하트 효과가 나오게 함
    return () => window.removeEventListener("mousemove", handleMouseMove); // 컴포넌트가 사라질 때 이벤트를 제거함
  }, [handleMouseMove]);

  return (
    <>
      <div ref={rainRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }} /> {/* 하트 비가 표시되는 배경 레이어임 */}
      <div ref={trailRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }} /> {/* 마우스 하트 효과가 표시되는 최상단 레이어임 */}
    </>
  );
}