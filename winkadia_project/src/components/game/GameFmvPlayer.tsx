// src/components/game/GameFmvPlayer.tsx
//
// FMV 에피소드 영상을 재생하고, 영상 종료 후 선택지를 보여주는 플레이어 컴포넌트임.

"use client"; // 영상 상태와 선택지 상태를 브라우저에서 관리하기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useMemo, useState } from "react"; // 현재 장면, 영상 URL, 종료 상태를 관리하기 위해 사용함
import { useRouter } from "next/navigation"; // 선택지가 다른 페이지로 이동할 때 사용함
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"; // 플레이어 UI 아이콘을 가져옴
import type { GameEpisode, GameScene } from "@/types/game"; // FMV 데이터 타입을 가져옴
import { getGameStorageUrl } from "@/lib/game-storage"; // Storage 경로를 실제 URL로 바꾸는 함수를 가져옴

type GameFmvPlayerProps = {
  episode: GameEpisode;
}; // FMV 플레이어 props 타입임

export default function GameFmvPlayer({ episode }: GameFmvPlayerProps) {
  const router = useRouter(); // 페이지 이동에 사용할 router임
  const firstSceneId = episode.scenes[0]?.id ?? ""; // 첫 장면 id를 가져옴
  const [currentSceneId, setCurrentSceneId] = useState(firstSceneId); // 현재 재생 중인 장면 id임
  const [videoUrl, setVideoUrl] = useState(""); // 현재 장면의 실제 영상 URL임
  const [posterUrl, setPosterUrl] = useState(""); // 현재 장면의 실제 포스터 URL임
  const [isEnded, setIsEnded] = useState(false); // 영상 종료 여부임
  const [isLoading, setIsLoading] = useState(true); // 영상 URL 로딩 여부임
  const [hasError, setHasError] = useState(false); // 영상 URL 로딩 실패 여부임

  const currentScene = useMemo<GameScene | undefined>(() => {
    return episode.scenes.find((scene) => scene.id === currentSceneId);
  }, [episode.scenes, currentSceneId]); // 현재 장면 데이터를 찾음

  const currentSceneIndex = useMemo(() => {
    return episode.scenes.findIndex((scene) => scene.id === currentSceneId);
  }, [episode.scenes, currentSceneId]); // 현재 장면 순번을 찾음

  useEffect(() => {
    let isMounted = true; // 컴포넌트 언마운트 후 상태 업데이트를 막기 위한 플래그임

    async function loadVideo() {
      if (!currentScene) {
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);
        setIsEnded(false);
        setVideoUrl("");
        setPosterUrl("");

        const loadedVideoUrl = await getGameStorageUrl(currentScene.videoPath); // 현재 장면 영상 URL을 가져옴
        const loadedPosterUrl = currentScene.posterPath
          ? await getGameStorageUrl(currentScene.posterPath)
          : ""; // 현재 장면 포스터 URL을 가져옴

        if (isMounted) {
          setVideoUrl(loadedVideoUrl);
          setPosterUrl(loadedPosterUrl);
        }
      } catch (error) {
        console.error("[GameFmvPlayer] video load failed:", currentScene.videoPath, error);

        if (isMounted) {
          setHasError(true);
          setIsEnded(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadVideo();

    return () => {
      isMounted = false;
    };
  }, [currentScene]);

  function handleChoice(nextSceneId?: string, href?: string) {
    if (href) {
      router.push(href);
      return;
    }

    if (nextSceneId) {
      setCurrentSceneId(nextSceneId);
    }
  } // 선택지 클릭 시 다음 장면 또는 다른 페이지로 이동함

  function handleRestart() {
    setCurrentSceneId(firstSceneId);
  } // 첫 장면으로 돌아감

  if (!currentScene) {
    return (
      <div className="rounded-[42px] border border-white/70 bg-white/72 px-8 py-16 text-center shadow-[0_24px_72px_rgba(127,91,204,0.10)]">
        <h1 className="text-[32px] font-black text-[#30283b]">에피소드를 찾을 수 없습니다.</h1>
        <button
          type="button"
          onClick={() => router.push("/sanctuary/game")}
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#8b68d8] px-8 text-[15px] font-black text-white"
        >
          Game으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[46px] border border-white/72 bg-white/48 p-5 shadow-[0_28px_90px_rgba(74,45,116,0.16)] backdrop-blur-xl sm:p-7 lg:p-9">
      {/* FMV 플레이어 전체 박스임 */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => router.push("/sanctuary/game")}
          className="inline-flex min-h-[46px] w-fit items-center gap-2 rounded-full border border-[#e6d7fb] bg-white/72 px-5 text-[13px] font-black text-[#8b68d8] shadow-sm"
        >
          <ArrowLeft size={15} />
          Game
        </button>

        <div className="rounded-full bg-[#f2ecff] px-5 py-2 text-[12px] font-black uppercase tracking-[0.18em] text-[#8b68d8]">
          Scene {Math.max(currentSceneIndex + 1, 1)} / {episode.scenes.length}
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
        <section className="overflow-hidden rounded-[34px] border border-white/70 bg-[#171020] shadow-[0_24px_70px_rgba(42,25,68,0.24)]">
          {/* 실제 영상 영역임 */}
          <div className="relative aspect-video w-full bg-[#171020]">
            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center px-6 text-center text-[15px] font-bold text-white/75">
                영상 불러오는 중
              </div>
            ) : videoUrl && !hasError ? (
              <video
                key={currentScene.id}
                src={videoUrl}
                poster={posterUrl || undefined}
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                onEnded={() => setIsEnded(true)}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
                <p className="text-[22px] font-black text-white">영상 준비 중</p>
                <p className="mt-3 max-w-[520px] break-all text-[13px] font-semibold leading-6 text-white/62">
                  {currentScene.videoPath}
                </p>
              </div>
            )}

            {!isEnded && !hasError && (
              <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-black/42 px-4 py-2 text-[12px] font-bold text-white/78 backdrop-blur-md">
                영상이 끝나면 선택지가 열립니다.
              </div>
            )}
          </div>
        </section>

        <aside className="rounded-[34px] border border-white/76 bg-white/76 p-7 shadow-[0_20px_60px_rgba(127,91,204,0.10)]">
          {/* 장면 정보 및 선택지 영역임 */}
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#9b78e5]">
            {episode.title}
          </p>

          <h1 className="mt-3 break-keep text-[32px] font-black leading-[1.25] tracking-[-0.035em] text-[#30283b] sm:text-[40px]">
            {currentScene.title}
          </h1>

          <p className="mt-5 break-keep text-[15px] font-semibold leading-[1.9] text-[#786f85]">
            {currentScene.desc}
          </p>

          <div className="mt-9 rounded-[26px] bg-[#f4edff]/78 p-5">
            <p className="text-[13px] font-black text-[#8b68d8]">선택지</p>
            <p className="mt-2 break-keep text-[13px] font-semibold leading-6 text-[#81758f]">
              영상이 끝난 뒤 현재 장면의 선택지를 고를 수 있습니다.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {currentScene.choices.length > 0 ? (
              currentScene.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  disabled={!isEnded}
                  onClick={() => handleChoice(choice.nextSceneId, choice.href)}
                  className={
                    isEnded
                      ? "flex w-full items-center justify-between gap-4 rounded-[24px] border border-[#e8ddfb] bg-white px-5 py-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[#8b68d8] hover:text-white"
                      : "flex w-full cursor-default items-center justify-between gap-4 rounded-[24px] border border-[#e8ddfb] bg-white/54 px-5 py-5 text-left text-[#9b8dac] shadow-sm"
                  }
                >
                  <span>
                    <span className="block break-keep text-[15px] font-black leading-[1.4]">
                      {choice.label}
                    </span>
                    <span className="mt-1 block break-keep text-[12px] font-semibold leading-5 opacity-75">
                      {choice.desc}
                    </span>
                  </span>
                  <ArrowRight size={18} className="shrink-0" />
                </button>
              ))
            ) : (
              <div className="rounded-[24px] border border-[#e8ddfb] bg-white/64 px-5 py-5">
                <p className="break-keep text-[14px] font-bold leading-7 text-[#786f85]">
                  이 장면의 선택지가 없습니다.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#e6d7fb] bg-white/72 px-5 text-[13px] font-black text-[#8b68d8] shadow-sm"
          >
            <RotateCcw size={15} />
            처음부터 다시 보기
          </button>
        </aside>
      </div>
    </div>
  );
}