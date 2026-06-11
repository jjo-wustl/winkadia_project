// src/components/game/GameStorageImage.tsx
//
// Firebase Storage 이미지 경로를 받아 실제 이미지로 표시하는 공통 컴포넌트임.

"use client"; // Firebase Storage URL을 브라우저에서 비동기로 가져오기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useState } from "react"; // Storage URL 로딩 상태를 관리하기 위해 사용함
import { getGameStorageUrl } from "@/lib/game-storage"; // Storage 경로를 다운로드 URL로 바꾸는 함수를 가져옴

type GameStorageImageProps = {
  path: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}; // Storage 이미지 컴포넌트 props 타입임

export default function GameStorageImage({
  path,
  alt,
  className = "",
  imageClassName = "",
}: GameStorageImageProps) {
  const [imageUrl, setImageUrl] = useState(""); // 실제 다운로드 URL을 저장함

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 언마운트된 뒤 상태 업데이트를 막기 위한 플래그임

    async function loadImageUrl() {
      try {
        if (!path) {
          return;
        }

        const url = await getGameStorageUrl(path); // Storage 경로를 실제 URL로 변환함

        if (isMounted) {
          setImageUrl(url);
        }
      } catch {
        if (isMounted) {
          setImageUrl("");
        }
      }
    }

    loadImageUrl();

    return () => {
      isMounted = false;
    };
  }, [path]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 이미지가 없을 때도 사이트가 깨지지 않도록 기본 비주얼을 표시함 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2c223d] via-[#7055ab] to-[#e4c9ff]" />

      {imageUrl && (
        <img
          src={imageUrl}
          alt={alt}
          className={`relative z-10 h-full w-full object-cover ${imageClassName}`}
          draggable={false}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.28),transparent_30%),linear-gradient(180deg,rgba(25,18,38,0.02),rgba(25,18,38,0.58))]" />
    </div>
  );
}