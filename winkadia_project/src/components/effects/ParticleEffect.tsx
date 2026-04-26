"use client";

import { useEffect, useRef, useCallback } from "react";

const HEART_COLORS = ["#ffb6c1", "#fff4b8", "#b8d4ff", "#ffd6ee", "#d4b0ff", "#ffe0ec"];
const HEART_SVG = (color: string, size: number) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

export default function HeartEffect() {
  const rainRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  // Heart rain
  useEffect(() => {
    const container = rainRef.current;
    if (!container) return;

    const hearts: HTMLDivElement[] = [];
    const count = 25;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
      const size = 10 + Math.random() * 16;
      const opacity = 0.15 + Math.random() * 0.25;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * duration;
      const rotate = -30 + Math.random() * 60;

      heart.innerHTML = HEART_SVG(color, size);
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
      `;

      container.appendChild(heart);
      hearts.push(heart);
    }

    return () => { hearts.forEach((h) => h.remove()); };
  }, []);

  // Mouse trail
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = trailRef.current;
    if (!container) return;
    if (Math.random() > 0.3) return;

    const heart = document.createElement("div");
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
    const size = 8 + Math.random() * 12;

    heart.innerHTML = HEART_SVG(color, size);
    heart.style.cssText = `
      position: fixed;
      left: ${e.clientX - size / 2}px;
      top: ${e.clientY - size / 2}px;
      pointer-events: none;
      z-index: 9999;
      animation: heartPop 0.8s ease-out forwards;
    `;

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      <div ref={rainRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }} />
      <div ref={trailRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }} />
    </>
  );
}
