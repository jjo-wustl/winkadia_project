// src/components/game/GameVideoPlayer.tsx
//
// Firebase Storage 영상 경로를 받아 실제 영상 플레이어로 표시하는 공통 컴포넌트임.

"use client"; // Firebase Storage URL을 브라우저에서 비동기로 가져오기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useState } from "react"; // 영상 URL 로딩 상태를 관리하기 위해 사용함
import { getGameStorageUrl } from "@/lib/game-storage"; // Storage 경로를 다운로드 URL로 바꾸는 함수를 가져옴

type GameVideoPlayerProps = {
  videoPath: string;
  posterPath?: string;
  title: string;
}; // 영상 플레이어 props 타입임

export default function GameVideoPlayer({
  videoPath,
  posterPath,
  title,
}: GameVideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState(""); // 실제 영상 다운로드 URL을 저장함
  const [posterUrl, setPosterUrl] = useState(""); // 실제 포스터 다운로드 URL을 저장함
  const [isLoading, setIsLoading] = useState(true); // 영상 로딩 중인지 저장함
  const [hasError, setHasError] = useState(false); // 영상 로딩 실패 여부를 저장함

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 언마운트된 뒤 상태 업데이트를 막기 위한 플래그임

    async function loadVideoData() {
      try {
        setIsLoading(true);
        setHasError(false);
        setVideoUrl("");
        setPosterUrl("");

        const loadedVideoUrl = await getGameStorageUrl(videoPath); // 영상 URL을 가져옴

        let loadedPosterUrl = ""; // 포스터가 없어도 영상은 재생되도록 빈 값으로 시작함

        if (posterPath) {
          try {
            loadedPosterUrl = await getGameStorageUrl(posterPath); // 포스터 URL을 가져옴
          } catch {
            loadedPosterUrl = ""; // 포스터가 없으면 무시하고 영상만 재생함
          }
        }

        if (isMounted) {
          setVideoUrl(loadedVideoUrl);
          setPosterUrl(loadedPosterUrl);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setVideoUrl("");
          setPosterUrl("");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadVideoData();

    return () => {
      isMounted = false;
    };
  }, [videoPath, posterPath]);

  if (isLoading) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-[34px] bg-gradient-to-br from-[#2c223d] via-[#7055ab] to-[#e4c9ff] px-6 text-center text-[15px] font-bold leading-7 text-white/80">
        영상 불러오는 중
      </div>
    );
  }

  if (hasError || !videoUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-[34px] bg-[#2c223d] px-6 text-center text-[15px] font-bold leading-7 text-white/80">
        영상을 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <video
      className="aspect-video w-full rounded-[34px] bg-black object-cover shadow-[0_28px_80px_rgba(75,48,118,0.24)]"
      src={videoUrl}
      poster={posterUrl || undefined}
      controls
      playsInline
      preload="metadata"
      aria-label={title}
    />
  );
}