// src/components/game/GameFmvPlayer.tsx
//
// FMV 에피소드 영상을 풀페이지 게임 화면으로 재생하고,
// 영상 종료 후 선택지를 화면 위에 띄우는 플레이어 컴포넌트임.

"use client"; // 영상 상태, 진행률, 선택지 상태를 브라우저에서 관리하기 위해 클라이언트 컴포넌트로 사용함

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type SyntheticEvent,
} from "react"; // 영상 ref, 상태, 메모이제이션, 이벤트 타입을 관리하기 위해 사용함
import { useRouter } from "next/navigation"; // 나가기 및 페이지 이동에 사용함
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react"; // 게임 UI 아이콘을 가져옴
import type { GameEpisode, GameScene } from "@/types/game"; // FMV 데이터 타입을 가져옴
import { getGameStorageUrl } from "@/lib/game-storage"; // Firebase Storage 경로를 실제 URL로 바꾸는 함수를 가져옴

type GameFmvPlayerProps = {
  episode: GameEpisode;
}; // FMV 플레이어 props 타입임

type SavedEpisodeProgress = {
  episodeId: string;
  sceneId: string;
  currentTime: number;
  duration: number;
  maxUnlockedTime: number;
  isEnded: boolean;
  updatedAt: string;
}; // 에피소드 이어보기를 위해 저장할 진행 상태 타입임

const PLAYBACK_RATES = [1, 1.25, 1.5, 2]; // 플레이어에서 순환할 재생 속도 목록임

const FIRST_EPISODE_MAIN_VIDEO_PATH =
  "game/empress-interview/episodes/ep-01/1-1.mp4"; // 1화에서 제일 먼저 재생할 메인 영상 경로임

const AUTO_NEXT_SCENE_IDS: Record<string, string> = {
  "choice-a": "common-1-2",
  "choice-b": "common-1-2",
  "choice-c": "common-1-2",
  "ep02-choice-a": "common-2-2",
  "ep02-choice-b": "common-2-2",
  "ep02-choice-c": "common-2-2",
  "ep02-choice-love-a": "common-2-3",
  "ep02-choice-love-b": "common-2-3",
  "ep02-choice-love-c": "common-2-3",
}; // 선택지 결과 영상이 끝난 뒤 자동으로 이동할 공통 장면 id를 정의함

const CHOICE_RESULT_COUNTER_ANCHOR_IDS: Record<string, string> = {
  "choice-a": "opening",
  "choice-b": "opening",
  "choice-c": "opening",
  "ep02-choice-a": "ep02-opening",
  "ep02-choice-b": "ep02-opening",
  "ep02-choice-c": "ep02-opening",
  "ep02-choice-love-a": "common-2-2",
  "ep02-choice-love-b": "common-2-2",
  "ep02-choice-love-c": "common-2-2",
}; // 선택지 결과 영상이 어느 표시용 장면 번호에 묶이는지 정의함

function formatVideoTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
} // 영상 시간을 00:00 형태로 변환함

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
} // 숫자를 최소값과 최대값 사이로 제한함

function isChoiceResultSceneId(sceneId: string) {
  return Boolean(CHOICE_RESULT_COUNTER_ANCHOR_IDS[sceneId]);
} // A/B/C 선택 뒤 재생되는 결과 영상 장면인지 판단함

function isEpisodeEndingSceneId(sceneId: string) {
  return sceneId === "common-1-2" || sceneId === "common-2-3";
} // 진짜 챕터 종료 장면인지 판단함

function getChoiceDisplayLabel(label: string) {
  return label.replace(/^[A-Z]\.\s*/i, "");
} // 선택지 라벨 앞에 A. B. C.가 들어가 있어도 화면에서는 본문만 보이게 정리함

function getAutoNextSceneId(sceneId: string) {
  return AUTO_NEXT_SCENE_IDS[sceneId] ?? "";
} // 현재 장면이 자동 이동 대상이면 다음 장면 id를 반환함

function getCounterAnchorSceneId(sceneId: string) {
  return CHOICE_RESULT_COUNTER_ANCHOR_IDS[sceneId] ?? sceneId;
} // 선택지 결과 영상이면 연결된 기준 장면 id를 반환함

function getProgressStorageKey(episodeId: string) {
  return `winkadia-game-progress:${episodeId}`;
} // 에피소드별 진행 상황을 저장할 localStorage key를 만듦

function readSavedEpisodeProgress(episodeId: string, validSceneIds: string[]) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawProgress = window.localStorage.getItem(getProgressStorageKey(episodeId));

    if (!rawProgress) {
      return null;
    }

    const parsedProgress = JSON.parse(rawProgress) as SavedEpisodeProgress;

    if (parsedProgress.episodeId !== episodeId) {
      return null;
    }

    if (!validSceneIds.includes(parsedProgress.sceneId)) {
      return null;
    }

    return parsedProgress;
  } catch (error) {
    console.warn("[GameFmvPlayer] saved progress read failed:", error);
    return null;
  }
} // localStorage에서 저장된 에피소드 진행 상황을 읽어옴

function writeSavedEpisodeProgress(progress: SavedEpisodeProgress) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getProgressStorageKey(progress.episodeId),
      JSON.stringify(progress),
    );
  } catch (error) {
    console.warn("[GameFmvPlayer] saved progress write failed:", error);
  }
} // localStorage에 에피소드 진행 상황을 저장함

function removeSavedEpisodeProgress(episodeId: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(getProgressStorageKey(episodeId));
  } catch (error) {
    console.warn("[GameFmvPlayer] saved progress remove failed:", error);
  }
} // localStorage에 저장된 에피소드 진행 상황을 삭제함

function getSceneWithMainVideo(scene: GameScene, firstSceneId: string) {
  const isFirstScene = scene.id === firstSceneId; // 현재 장면이 에피소드의 첫 장면인지 판단함

  if (!isFirstScene) {
    return scene;
  }

  if (scene.videoPath.includes("1-2.mp4")) {
    return {
      ...scene,
      videoPath: FIRST_EPISODE_MAIN_VIDEO_PATH,
    };
  }

  return {
    ...scene,
    videoPath: scene.videoPath || FIRST_EPISODE_MAIN_VIDEO_PATH,
  };
} // 첫 장면이 1-2.mp4를 잘못 바라보는 경우 1-1.mp4로 보정함

export default function GameFmvPlayer({ episode }: GameFmvPlayerProps) {
  const router = useRouter(); // 페이지 이동에 사용할 router임
  const videoRef = useRef<HTMLVideoElement | null>(null); // 실제 video 태그를 제어하기 위한 ref임
  const lastTimeUpdateRef = useRef(0); // 영상 진행 상태 업데이트를 너무 자주 하지 않기 위한 기준 시간임
  const lastProgressSaveRef = useRef(0); // 이어보기 저장을 너무 자주 하지 않기 위한 기준 시간임
  const maxUnlockedTimeRef = useRef(0); // 이미 본 최대 재생 지점을 즉시 참조하기 위한 ref임
  const hudHideTimerRef = useRef<number | null>(null); // 하단 HUD 자동 숨김 타이머를 저장함
  const pendingResumeTimeRef = useRef<number | null>(null); // 메타데이터 로드 뒤 이동할 저장 시간을 임시 저장함
  const pendingResumeMaxTimeRef = useRef<number | null>(null); // 메타데이터 로드 뒤 복구할 본 구간 최대 시간을 임시 저장함
  const pendingResumeEndedRef = useRef(false); // 저장된 상태가 선택지/종료 오버레이였는지 임시 저장함
  const videoUrlCacheRef = useRef<Record<string, string>>({}); // 이미 가져온 영상 URL을 저장함
  const posterUrlCacheRef = useRef<Record<string, string>>({}); // 이미 가져온 포스터 URL을 저장함
  const preloadedVideoElementsRef = useRef<Record<string, HTMLVideoElement>>({}); // 브라우저 영상 프리로드 요소를 저장함

  const firstSceneId = useMemo(() => {
    return episode.scenes[0]?.id ?? "";
  }, [episode.scenes]); // 에피소드의 첫 장면 id를 가져옴

  const sceneIds = useMemo(() => {
    return episode.scenes.map((scene) => scene.id);
  }, [episode.scenes]); // 현재 에피소드의 모든 장면 id를 모음

  const [currentSceneId, setCurrentSceneId] = useState(firstSceneId); // 현재 재생 중인 장면 id임
  const [restartToken, setRestartToken] = useState(0); // 같은 장면을 다시 로드하기 위한 값임
  const [videoUrl, setVideoUrl] = useState(""); // 현재 장면의 실제 영상 URL임
  const [posterUrl, setPosterUrl] = useState(""); // 현재 장면의 실제 포스터 URL임
  const [isLoading, setIsLoading] = useState(true); // 영상 URL 로딩 여부임
  const [hasError, setHasError] = useState(false); // 영상 로딩 실패 여부임
  const [isEnded, setIsEnded] = useState(false); // 영상 종료 여부임
  const [isPlaying, setIsPlaying] = useState(false); // 영상 재생 중 여부임
  const [currentTime, setCurrentTime] = useState(0); // 현재 영상 재생 시간임
  const [duration, setDuration] = useState(0); // 현재 영상 전체 길이임
  const [maxUnlockedTime, setMaxUnlockedTime] = useState(0); // 사용자가 이미 본 최대 재생 지점임
  const [playbackRate, setPlaybackRate] = useState(1); // 현재 영상 재생 속도임
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false); // 선택지 이동 후 다음 영상을 자동 재생할지 여부임
  const [isHudVisible, setIsHudVisible] = useState(true); // 마우스 움직임에 따라 하단 HUD를 보여줄지 판단함

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shouldStartFreshWithAutoplay = params.get("autoplay") === "1";

    if (shouldStartFreshWithAutoplay) {
      setShouldAutoPlay(true);
      return;
    }

    const savedProgress = readSavedEpisodeProgress(episode.id, sceneIds);

    if (!savedProgress) {
      return;
    }

    pendingResumeTimeRef.current = Math.max(savedProgress.currentTime, 0);
    pendingResumeMaxTimeRef.current = Math.max(
      savedProgress.maxUnlockedTime,
      savedProgress.currentTime,
      0,
    );
    pendingResumeEndedRef.current = savedProgress.isEnded;
    setCurrentSceneId(savedProgress.sceneId);
  }, [episode.id, sceneIds]); // autoplay가 아니면 저장된 이어보기 위치를 복원함

  useEffect(() => {
    if (!currentSceneId && firstSceneId) {
      setCurrentSceneId(firstSceneId);
    }
  }, [currentSceneId, firstSceneId]); // 첫 장면 id가 늦게 잡히는 경우 현재 장면을 보정함

  const currentScene = useMemo<GameScene | undefined>(() => {
    const foundScene = episode.scenes.find((scene) => scene.id === currentSceneId); // 현재 장면 id와 일치하는 원본 장면 데이터를 찾음

    if (!foundScene) {
      return undefined;
    }

    return getSceneWithMainVideo(foundScene, firstSceneId);
  }, [episode.scenes, currentSceneId, firstSceneId]); // 현재 장면 데이터를 찾고 첫 장면 영상 경로를 1-1.mp4로 보정함

  const visibleSceneIds = useMemo(() => {
    return episode.scenes
      .filter((scene) => !isChoiceResultSceneId(scene.id))
      .map((scene) => scene.id);
  }, [episode.scenes]); // 선택지 결과 영상은 제외하고 실제 챕터 진행 장면만 표시용 카운트에 포함함

  const currentVisibleSceneNumber = useMemo(() => {
    const displaySceneId = getCounterAnchorSceneId(currentSceneId);
    const foundIndex = visibleSceneIds.indexOf(displaySceneId);

    if (foundIndex < 0) {
      return 1;
    }

    return foundIndex + 1;
  }, [currentSceneId, visibleSceneIds]); // 현재 장면의 표시용 번호를 계산함

  const visibleSceneTotal = useMemo(() => {
    return Math.max(visibleSceneIds.length, 1);
  }, [visibleSceneIds]); // 선택지 결과 영상을 제외한 전체 표시용 장면 수를 계산함

  const progressPercent = useMemo(() => {
    if (!duration || duration <= 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]); // 현재 재생 위치를 퍼센트로 계산함

  const unlockedPercent = useMemo(() => {
    if (!duration || duration <= 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, (maxUnlockedTime / duration) * 100));
  }, [duration, maxUnlockedTime]); // 사용자가 이미 본 구간을 퍼센트로 계산함

  useEffect(() => {
    let isMounted = true; // 컴포넌트 언마운트 후 상태 업데이트를 막기 위한 플래그임

    async function loadVideo() {
      if (!currentScene) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);
        setIsEnded(false);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setMaxUnlockedTime(0);
        setVideoUrl("");
        setPosterUrl("");
        setIsHudVisible(true);
        lastTimeUpdateRef.current = 0;
        maxUnlockedTimeRef.current = 0;
        clearHudHideTimer();

        const loadedVideoUrl = await getCachedVideoUrl(currentScene.videoPath); // 현재 장면 영상 URL을 캐시에서 가져오거나 새로 가져옴
        let loadedPosterUrl = ""; // 포스터 URL 기본값임

        registerVideoPreload(loadedVideoUrl); // 현재 영상도 브라우저에 미리 로드되도록 등록함

        if (currentScene.posterPath) {
          try {
            loadedPosterUrl = await getCachedPosterUrl(currentScene.posterPath); // 포스터 경로가 있으면 포스터 URL을 캐시에서 가져오거나 새로 가져옴
          } catch (posterError) {
            console.warn(
              "[GameFmvPlayer] poster load failed:",
              currentScene.posterPath,
              posterError,
            ); // 포스터 로딩 실패는 영상 재생을 막지 않음
          }
        }

        if (isMounted) {
          setVideoUrl(loadedVideoUrl);
          setPosterUrl(loadedPosterUrl);
        }
      } catch (error) {
        console.error("[GameFmvPlayer] video load failed:", currentScene.videoPath, error);

        if (isMounted) {
          setHasError(true);
          setIsEnded(true);
          setIsHudVisible(true);
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
  }, [currentScene, restartToken]); // 장면이 바뀌거나 다시 보기 요청이 있으면 영상 URL을 다시 불러옴

  useEffect(() => {
    if (!currentScene) {
      return;
    }

    const choiceNextSceneIds = currentScene.choices
      .map((choice) => choice.nextSceneId)
      .filter((sceneId): sceneId is string => Boolean(sceneId)); // 현재 선택지에서 갈 수 있는 다음 장면 id를 모음

    const autoNextSceneIdsFromChoices = choiceNextSceneIds
      .map((sceneId) => getAutoNextSceneId(sceneId))
      .filter((sceneId): sceneId is string => Boolean(sceneId)); // 선택지 결과 영상 다음에 자동으로 갈 장면 id를 모음

    const currentAutoNextSceneId = getAutoNextSceneId(currentScene.id); // 현재 장면 자체가 자동 이동 대상인지 확인함

    const preloadSceneIds = Array.from(
      new Set([
        ...choiceNextSceneIds,
        ...autoNextSceneIdsFromChoices,
        currentAutoNextSceneId,
      ].filter((sceneId): sceneId is string => Boolean(sceneId))),
    ); // 지금 장면에서 곧 이동할 수 있는 영상들을 중복 없이 모음

    void preloadSceneAssets(preloadSceneIds);
  }, [currentScene, episode.scenes]); // 선택지 이후 영상과 공통 영상을 미리 불러와 다음 영상 전환 체감을 줄임

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.playbackRate = playbackRate;
  }, [playbackRate, videoUrl]); // 영상 태그에 현재 재생 속도를 적용함

  useEffect(() => {
    if (!videoUrl || !shouldAutoPlay || !videoRef.current) {
      return;
    }

    const video = videoRef.current;

    const timer = window.setTimeout(() => {
      video.playbackRate = playbackRate;

      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setShouldAutoPlay(false);
        })
        .catch((error) => {
          console.warn("[GameFmvPlayer] autoplay failed:", error);
          setIsPlaying(false);
          setShouldAutoPlay(false);
          setIsHudVisible(true);
        });
    }, 60);

    return () => {
      window.clearTimeout(timer);
    };
  }, [videoUrl, shouldAutoPlay, playbackRate]); // 선택지를 누른 뒤 다음 영상이 준비되면 빠르게 재생을 시도함

  useEffect(() => {
    clearHudHideTimer();

    if (isPlaying && !isEnded && !isLoading && !hasError) {
      setIsHudVisible(true);

      hudHideTimerRef.current = window.setTimeout(() => {
        setIsHudVisible(false);
      }, 1800);

      return () => {
        clearHudHideTimer();
      };
    }

    setIsHudVisible(true);

    return () => {
      clearHudHideTimer();
    };
  }, [isPlaying, isEnded, isLoading, hasError]); // 재생 중에는 하단 HUD를 자동으로 숨기고, 정지/종료/오류 상태에서는 다시 보이게 함

  useEffect(() => {
    return () => {
      clearHudHideTimer();
    };
  }, []); // 컴포넌트가 사라질 때 HUD 타이머를 정리함

  async function getCachedVideoUrl(storagePath: string) {
    const cachedUrl = videoUrlCacheRef.current[storagePath];

    if (cachedUrl) {
      return cachedUrl;
    }

    const loadedUrl = await getGameStorageUrl(storagePath);
    videoUrlCacheRef.current[storagePath] = loadedUrl;

    return loadedUrl;
  } // Firebase Storage 영상 경로를 실제 URL로 바꾸고 캐시에 저장함

  async function getCachedPosterUrl(storagePath: string) {
    const cachedUrl = posterUrlCacheRef.current[storagePath];

    if (cachedUrl) {
      return cachedUrl;
    }

    const loadedUrl = await getGameStorageUrl(storagePath);
    posterUrlCacheRef.current[storagePath] = loadedUrl;

    return loadedUrl;
  } // Firebase Storage 포스터 경로를 실제 URL로 바꾸고 캐시에 저장함

  function registerVideoPreload(url: string) {
    if (!url || preloadedVideoElementsRef.current[url]) {
      return;
    }

    const preloadVideo = document.createElement("video");

    preloadVideo.preload = "auto";
    preloadVideo.muted = true;
    preloadVideo.playsInline = true;
    preloadVideo.src = url;
    preloadVideo.load();

    preloadedVideoElementsRef.current[url] = preloadVideo;
  } // 브라우저가 다음 영상을 미리 받아둘 수 있도록 숨은 video 요소로 프리로드함

  async function preloadSceneAssets(sceneIds: string[]) {
    if (sceneIds.length === 0) {
      return;
    }

    const scenesToPreload = sceneIds
      .map((sceneId) => episode.scenes.find((scene) => scene.id === sceneId))
      .filter((scene): scene is GameScene => Boolean(scene)); // 미리 불러올 장면 데이터를 찾음

    await Promise.allSettled(
      scenesToPreload.map(async (scene) => {
        const loadedVideoUrl = await getCachedVideoUrl(scene.videoPath);

        registerVideoPreload(loadedVideoUrl);

        if (scene.posterPath) {
          await getCachedPosterUrl(scene.posterPath);
        }
      }),
    );
  } // 곧 이동할 가능성이 있는 장면의 영상과 포스터를 미리 불러옴

  function saveEpisodeProgress(
    sceneId: string,
    nextCurrentTime: number,
    nextDuration: number,
    nextMaxUnlockedTime: number,
    nextIsEnded: boolean,
  ) {
    if (!sceneId) {
      return;
    }

    writeSavedEpisodeProgress({
      episodeId: episode.id,
      sceneId,
      currentTime: Math.max(nextCurrentTime, 0),
      duration: Math.max(nextDuration, 0),
      maxUnlockedTime: Math.max(nextMaxUnlockedTime, nextCurrentTime, 0),
      isEnded: nextIsEnded,
      updatedAt: new Date().toISOString(),
    });
  } // 현재 에피소드의 이어보기 진행 상황을 저장함

  function saveCurrentVideoProgress(nextIsEnded = isEnded) {
    const video = videoRef.current;
    const nextCurrentTime = video?.currentTime ?? currentTime;
    const nextDuration = video?.duration ?? duration;
    const nextMaxUnlockedTime = Math.max(maxUnlockedTimeRef.current, maxUnlockedTime, nextCurrentTime);

    saveEpisodeProgress(
      currentSceneId,
      nextCurrentTime,
      Number.isFinite(nextDuration) ? nextDuration : 0,
      nextMaxUnlockedTime,
      nextIsEnded,
    );
  } // 현재 video 태그 기준으로 이어보기 상태를 저장함

  function clearHudHideTimer() {
    if (hudHideTimerRef.current) {
      window.clearTimeout(hudHideTimerRef.current);
      hudHideTimerRef.current = null;
    }
  } // 하단 HUD 숨김 타이머를 정리함

  function showHudTemporarily() {
    setIsHudVisible(true);
    clearHudHideTimer();

    if (!isPlaying || isEnded || isLoading || hasError) {
      return;
    }

    hudHideTimerRef.current = window.setTimeout(() => {
      setIsHudVisible(false);
    }, 1800);
  } // 마우스나 터치 움직임이 있으면 HUD를 잠깐 보여준 뒤 다시 숨김

  function getAllowedForwardTime() {
    if (isEnded && duration > 0) {
      return duration;
    }

    return Math.max(maxUnlockedTimeRef.current, maxUnlockedTime, currentTime);
  } // 사용자가 앞으로 이동할 수 있는 최대 시간을 계산함

  function handleExitGame() {
    saveCurrentVideoProgress(isEnded);
    router.push("/sanctuary/game");
  } // 현재 진행 상황을 저장하고 게임홈으로 나감

  async function handleTogglePlay() {
    const video = videoRef.current;

    if (!video || hasError || isLoading) {
      return;
    }

    if (video.paused) {
      try {
        video.playbackRate = playbackRate;
        await video.play();
        setIsPlaying(true);
        showHudTemporarily();
      } catch (error) {
        console.warn("[GameFmvPlayer] play failed:", error);
        setIsHudVisible(true);
      }

      return;
    }

    video.pause();
    saveCurrentVideoProgress(false);
    setIsPlaying(false);
    setIsHudVisible(true);
  } // 영상 재생과 일시정지를 전환함

  function handleLoadedMetadata(event: SyntheticEvent<HTMLVideoElement>) {
    const target = event.currentTarget;
    const nextDuration = target.duration || 0;
    const savedResumeTime = pendingResumeTimeRef.current;
    const savedMaxTime = pendingResumeMaxTimeRef.current;
    const shouldShowEndedOverlay = pendingResumeEndedRef.current;

    let nextCurrentTime = target.currentTime || 0;
    let nextMaxUnlockedTime = nextCurrentTime;

    if (savedResumeTime !== null) {
      const safeResumeTime = clampNumber(savedResumeTime, 0, Math.max(nextDuration - 0.1, 0));

      target.currentTime = safeResumeTime;
      nextCurrentTime = safeResumeTime;
      nextMaxUnlockedTime = Math.max(savedMaxTime ?? safeResumeTime, safeResumeTime);
      pendingResumeTimeRef.current = null;
      pendingResumeMaxTimeRef.current = null;
    }

    setDuration(nextDuration);
    setCurrentTime(nextCurrentTime);
    setMaxUnlockedTime(nextMaxUnlockedTime);
    maxUnlockedTimeRef.current = nextMaxUnlockedTime;
    target.playbackRate = playbackRate;

    if (shouldShowEndedOverlay) {
      pendingResumeEndedRef.current = false;
      setIsEnded(true);
      setIsPlaying(false);
      setIsHudVisible(true);
    }
  } // 영상 메타데이터가 로드되면 전체 길이와 저장된 이어보기 위치를 복구함

  function handleTimeUpdate(event: SyntheticEvent<HTMLVideoElement>) {
    const target = event.currentTarget;
    const nextCurrentTime = target.currentTime || 0;
    const nextDuration = target.duration || 0;
    const now = performance.now();

    maxUnlockedTimeRef.current = Math.max(maxUnlockedTimeRef.current, nextCurrentTime);

    if (now - lastProgressSaveRef.current >= 1200) {
      lastProgressSaveRef.current = now;
      saveEpisodeProgress(
        currentSceneId,
        nextCurrentTime,
        Number.isFinite(nextDuration) ? nextDuration : 0,
        maxUnlockedTimeRef.current,
        false,
      );
    }

    if (now - lastTimeUpdateRef.current < 250) {
      return;
    }

    lastTimeUpdateRef.current = now;
    setCurrentTime(nextCurrentTime);
    setMaxUnlockedTime(maxUnlockedTimeRef.current);
  } // 영상 재생 중 현재 시간과 이미 본 최대 지점을 화면에 반영하고 이어보기를 저장함

  function handleVideoEnded() {
    const safeDuration = videoRef.current?.duration || duration;
    const autoNextSceneId = getAutoNextSceneId(currentSceneId); // 현재 장면이 자동 이동 대상인지 확인함

    maxUnlockedTimeRef.current = safeDuration;
    setCurrentTime(safeDuration);
    setMaxUnlockedTime(safeDuration);
    setIsPlaying(false);
    setIsHudVisible(true);

    if (autoNextSceneId) {
      saveEpisodeProgress(autoNextSceneId, 0, 0, 0, false);
      setIsEnded(false);
      setShouldAutoPlay(true);
      setCurrentSceneId(autoNextSceneId);
      return;
    }

    saveEpisodeProgress(currentSceneId, safeDuration, safeDuration, safeDuration, true);
    setIsEnded(true);
  } // 영상이 끝났을 때 선택지 결과 영상이면 공통 장면으로 자동 이동하고, 일반 장면이면 선택지를 열 수 있게 함

  function handleSeekTo(targetTime: number) {
    const video = videoRef.current;

    if (!video || !duration || hasError || isLoading) {
      return;
    }

    const allowedForwardTime = getAllowedForwardTime();
    const safeTime = clampNumber(targetTime, 0, allowedForwardTime);

    video.currentTime = safeTime;
    setCurrentTime(safeTime);
    maxUnlockedTimeRef.current = Math.max(maxUnlockedTimeRef.current, safeTime);
    setMaxUnlockedTime(maxUnlockedTimeRef.current);
    saveEpisodeProgress(currentSceneId, safeTime, duration, maxUnlockedTimeRef.current, false);
    showHudTemporarily();

    if (duration > 0 && safeTime >= duration - 0.15) {
      handleVideoEnded();
      return;
    }

    setIsEnded(false);
  } // 이미 본 구간 안에서만 원하는 시간으로 이동하고 이어보기 위치를 저장함

  function handleTimelineClick(event: MouseEvent<HTMLButtonElement>) {
    if (!duration || duration <= 0) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickRatio = clampNumber(clickX / rect.width, 0, 1);
    const targetTime = duration * clickRatio;

    handleSeekTo(targetTime);
  } // 전체 게이지바 클릭 위치를 시간으로 변환해 이동함

  function handleSeekBy(seconds: number) {
    const targetTime = currentTime + seconds;

    handleSeekTo(targetTime);
  } // 5초 뒤로가기와 5초 앞으로가기를 처리함

  function handleCyclePlaybackRate() {
    const currentIndex = PLAYBACK_RATES.indexOf(playbackRate);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % PLAYBACK_RATES.length : 0;
    const nextRate = PLAYBACK_RATES[nextIndex];

    setPlaybackRate(nextRate);
    showHudTemporarily();

    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  } // 재생 속도를 1x, 1.25x, 1.5x, 2x 순서로 변경함

  function handleChoice(nextSceneId?: string, href?: string) {
    if (href) {
      saveCurrentVideoProgress(true);
      router.push(href);
      return;
    }

    if (!nextSceneId) {
      return;
    }

    saveEpisodeProgress(nextSceneId, 0, 0, 0, false);
    setShouldAutoPlay(true);
    setIsHudVisible(true);
    clearHudHideTimer();

    if (nextSceneId === currentSceneId) {
      setRestartToken((prev) => prev + 1);
      return;
    }

    setCurrentSceneId(nextSceneId);
  } // 선택지 클릭 시 다음 장면 또는 다른 페이지로 이동하고 이어보기 상태를 저장함

  function handleRestart() {
    removeSavedEpisodeProgress(episode.id);
    pendingResumeTimeRef.current = null;
    pendingResumeMaxTimeRef.current = null;
    pendingResumeEndedRef.current = false;
    setCurrentSceneId(firstSceneId);
    setRestartToken((prev) => prev + 1);
    setShouldAutoPlay(true);
    setIsEnded(false);
    setHasError(false);
    setIsHudVisible(true);
    setCurrentTime(0);
    setDuration(0);
    setMaxUnlockedTime(0);
    lastTimeUpdateRef.current = 0;
    lastProgressSaveRef.current = 0;
    maxUnlockedTimeRef.current = 0;
    clearHudHideTimer();
  } // 저장된 진행 상황을 삭제하고 첫 장면으로 돌아가 다시 재생되게 함

  if (!currentScene) {
    return (
      <main className="fixed inset-0 z-[9999] flex min-h-[100dvh] items-center justify-center bg-black px-6 text-white">
        <section className="w-full max-w-[560px] rounded-[32px] border border-white/15 bg-black/80 p-8 text-center">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-white/45">
            WINKADIA GAME
          </p>
          <h1 className="mt-4 text-[30px] font-black tracking-[-0.04em]">
            에피소드를 찾을 수 없습니다.
          </h1>
          <button
            type="button"
            onClick={handleExitGame}
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-[14px] font-black text-black"
          >
            게임홈으로 돌아가기
          </button>
        </section>
      </main>
    );
  }

  const canUseVideoControls = Boolean(videoUrl && !hasError && !isLoading); // 영상 컨트롤을 사용할 수 있는 상태인지 판단함
  const shouldShowBottomGradient = isHudVisible || !isPlaying || isEnded; // 하단 HUD가 보일 때만 하단 그라데이션을 보여줄지 판단함
  const isEpisodeEndingScene = isEpisodeEndingSceneId(currentScene.id); // 현재 장면이 챕터 종료 장면인지 판단함

  return (
    <main
      className="fixed inset-0 z-[9999] min-h-[100dvh] overflow-hidden bg-black text-white"
      onMouseMove={showHudTemporarily}
      onTouchStart={showHudTemporarily}
    >
      {/* 전체 화면 영상 배경 영역임 */}
      <section className="absolute inset-0">
        {videoUrl && !hasError ? (
          <video
            ref={videoRef}
            key={`${currentScene.id}-${restartToken}`}
            src={videoUrl}
            poster={posterUrl || undefined}
            className="h-full w-full object-cover"
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            onPlay={() => {
              setIsPlaying(true);
              showHudTemporarily();
            }}
            onPause={() => {
              setIsPlaying(false);
              setIsHudVisible(true);
            }}
          />
        ) : hasError ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-black px-8 text-center">
            <p className="text-[26px] font-black">영상 준비 중</p>
            <p className="mt-4 max-w-[640px] break-all text-[13px] font-semibold leading-6 text-white/50">
              {currentScene.videoPath}
            </p>
          </div>
        ) : (
          <div className="h-full w-full bg-black" />
        )}
      </section>

      {/* 영상 위 최소 그라데이션 오버레이임 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-black/25 to-transparent" />
      <div
        className={
          shouldShowBottomGradient
            ? "pointer-events-none absolute inset-x-0 bottom-0 h-[170px] bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-100 transition duration-300"
            : "pointer-events-none absolute inset-x-0 bottom-0 h-[170px] bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-0 transition duration-300"
        }
      />
      {/* 하단 HUD가 숨겨지면 자막을 가리지 않도록 하단 그라데이션도 함께 숨김 */}

      {/* 상단 게임 HUD 영역임 */}
      <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-5 py-5 sm:px-8 sm:py-7">
        <button
          type="button"
          onClick={handleExitGame}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/18 bg-black/45 px-4 text-[13px] font-black text-white/88 transition hover:bg-white hover:text-black"
        >
          <ArrowLeft size={16} />
          나가기
        </button>

        <div className="pointer-events-none hidden rounded-full border border-white/14 bg-black/36 px-5 py-3 text-center sm:block">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/50">
            WINKADIA ORIGINAL
          </p>
          <p className="mt-1 text-[13px] font-black text-white/92">
            {episode.title} · Scene {currentVisibleSceneNumber} / {visibleSceneTotal}
          </p>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/18 bg-black/45 px-4 text-[13px] font-black text-white/88 transition hover:bg-white hover:text-black"
        >
          <RotateCcw size={15} />
          처음부터
        </button>
      </header>

      {/* 모바일용 에피소드 정보임 */}
      <div className="pointer-events-none absolute left-1/2 top-[82px] z-20 w-[calc(100%-40px)] -translate-x-1/2 rounded-full border border-white/12 bg-black/36 px-4 py-2 text-center sm:hidden">
        <p className="truncate text-[11px] font-black text-white/80">
          {episode.title} · Scene {currentVisibleSceneNumber} / {visibleSceneTotal}
        </p>
      </div>

      {/* 중앙 재생 버튼임 */}
      {!isLoading && videoUrl && !hasError && !isEnded && (
        <button
          type="button"
          onClick={handleTogglePlay}
          className={
            isPlaying
              ? "absolute left-1/2 top-1/2 z-20 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/15 text-white/0 opacity-0 transition hover:bg-black/45 hover:text-white hover:opacity-100"
              : "absolute left-1/2 top-1/2 z-20 flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/22 bg-black/45 text-white transition hover:scale-105 hover:bg-white hover:text-black"
          }
          aria-label={isPlaying ? "영상 일시정지" : "영상 재생"}
        >
          {isPlaying ? <Pause size={30} /> : <Play size={34} className="ml-1" />}
        </button>
      )}

      {/* 영상 종료 후 선택지 또는 챕터 종료 오버레이임 */}
      {isEnded && (
        <section className="absolute inset-0 z-30 flex items-center justify-center px-5 sm:px-8">
          {isEpisodeEndingScene ? (
            <div className="w-full max-w-[680px] rounded-[38px] border border-white/16 bg-black/76 px-6 py-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.48)] sm:px-10 sm:py-10">
              <p className="text-[11px] font-black uppercase tracking-[0.34em] text-white/42">
                Chapter Complete
              </p>

              <h1 className="mx-auto mt-4 max-w-[560px] break-keep text-[30px] font-black leading-[1.18] tracking-[-0.05em] text-white sm:text-[42px]">
                {episode.title}
              </h1>

              <p className="mx-auto mt-4 max-w-[520px] break-keep text-[14px] font-semibold leading-7 text-white/62 sm:text-[16px]">
                선택이 저장되었습니다. 다음 장면으로 이어가거나, 이 챕터를 처음부터 다시 볼 수 있습니다.
              </p>

              <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
                {currentScene.choices.map((choice, choiceIndex) => (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => handleChoice(choice.nextSceneId, choice.href)}
                    className={
                      choiceIndex === 0
                        ? "inline-flex min-h-[58px] w-full min-w-[220px] items-center justify-center rounded-full border border-white bg-white px-8 text-center text-[15px] font-black text-black transition hover:-translate-y-0.5 hover:bg-white/86 sm:w-auto"
                        : "inline-flex min-h-[58px] w-full min-w-[220px] items-center justify-center rounded-full border border-white/22 bg-white/10 px-8 text-center text-[15px] font-black text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-black sm:w-auto"
                    }
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[780px] rounded-[34px] border border-white/16 bg-black/78 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-7">
              <div className="mb-5 text-center">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/45">
                  Make Your Choice
                </p>
                <h1 className="mt-3 break-keep text-[26px] font-black leading-[1.2] tracking-[-0.04em] text-white sm:text-[36px]">
                  {currentScene.title}
                </h1>
                <p className="mx-auto mt-4 max-w-[720px] break-keep text-[15px] font-semibold leading-7 text-white/68 sm:text-[17px]">
                  {currentScene.desc}
                </p>
              </div>

              {currentScene.choices.length > 0 ? (
                <div className="mx-auto grid w-full gap-3 sm:gap-4">
                  {currentScene.choices.map((choice, choiceIndex) => {
                    const choiceLetter = String.fromCharCode(65 + choiceIndex); // 선택지 순서에 따라 A, B, C 문자를 만듦
                    const choiceLabel = getChoiceDisplayLabel(choice.label); // 선택지 라벨에서 기존 A. B. C. 표기를 제거함

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => handleChoice(choice.nextSceneId, choice.href)}
                        className="group grid w-full grid-cols-[64px_1fr] items-center gap-5 rounded-[26px] border border-white/16 bg-white/[0.08] px-5 py-5 text-left transition hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black sm:grid-cols-[78px_1fr] sm:px-7 sm:py-6"
                      >
                        <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[20px] border border-white/18 bg-black/50 text-[26px] font-black tracking-[-0.06em] text-white transition group-hover:border-black/10 group-hover:bg-black group-hover:text-white sm:h-[64px] sm:w-[64px] sm:text-[32px]">
                          {choiceLetter}
                        </span>

                        <span className="min-w-0">
                          <span className="block break-keep text-[18px] font-black leading-[1.35] text-white transition group-hover:text-black sm:text-[22px]">
                            {choiceLabel}
                          </span>
                          <span className="mt-2.5 block break-keep text-[14px] font-semibold leading-6 text-white/62 transition group-hover:text-black/62 sm:text-[16px]">
                            {choice.desc}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mx-auto max-w-[520px] rounded-[24px] border border-white/12 bg-white/10 px-5 py-6 text-center">
                  <p className="break-keep text-[14px] font-bold leading-7 text-white/68">
                    이 장면의 선택지가 없습니다.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 text-[13px] font-black text-black"
                    >
                      처음부터 다시 보기
                    </button>
                    <button
                      type="button"
                      onClick={handleExitGame}
                      className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/18 bg-white/10 px-6 text-[13px] font-black text-white"
                    >
                      게임홈으로 나가기
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* 하단 커스텀 컨트롤 영역임 */}
      <footer
        className={
          isHudVisible
            ? "absolute inset-x-0 bottom-0 z-40 translate-y-0 opacity-100 transition duration-300"
            : "pointer-events-none absolute inset-x-0 bottom-0 z-40 translate-y-[112px] opacity-0 transition duration-300"
        }
      >
        <div className="px-4 pb-5 sm:px-8 sm:pb-6">
          <div className="mb-3 flex flex-col gap-3 rounded-[24px] border border-white/10 bg-black/52 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="min-w-0">
              <p className="truncate text-[12px] font-black text-white/78">
                {currentScene.title}
              </p>
              <p className="mt-1 text-[11px] font-bold text-white/42">
                {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={!canUseVideoControls}
                onClick={() => handleSeekBy(-5)}
                className="inline-flex h-10 min-w-[58px] items-center justify-center rounded-full border border-white/12 bg-white/10 px-3 text-[12px] font-black text-white/80 transition hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white/10 disabled:hover:text-white/80"
              >
                -5s
              </button>

              <button
                type="button"
                disabled={!canUseVideoControls}
                onClick={handleTogglePlay}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 disabled:cursor-default disabled:opacity-35 disabled:hover:scale-100"
                aria-label={isPlaying ? "영상 일시정지" : "영상 재생"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={20} className="ml-0.5" />}
              </button>

              <button
                type="button"
                disabled={!canUseVideoControls}
                onClick={() => handleSeekBy(5)}
                className="inline-flex h-10 min-w-[58px] items-center justify-center rounded-full border border-white/12 bg-white/10 px-3 text-[12px] font-black text-white/80 transition hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white/10 disabled:hover:text-white/80"
              >
                +5s
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 sm:justify-end">
              <button
                type="button"
                disabled={!canUseVideoControls}
                onClick={handleCyclePlaybackRate}
                className="inline-flex h-10 min-w-[72px] items-center justify-center rounded-full border border-white/12 bg-white/10 px-4 text-[12px] font-black text-white/80 transition hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white/10 disabled:hover:text-white/80"
              >
                {playbackRate}x
              </button>

              <span className="hidden text-[11px] font-bold text-white/38 sm:inline">
                본 구간까지만 이동 가능
              </span>
            </div>
          </div>
        </div>

        {/* 화면 전체 너비를 사용하는 하단 게이지바임 */}
        <button
          type="button"
          disabled={!canUseVideoControls || duration <= 0}
          onClick={handleTimelineClick}
          className="group relative block h-[10px] w-full overflow-hidden bg-white/12 disabled:cursor-default"
          aria-label="이미 본 구간 안에서 영상 위치 이동"
        >
          <span
            className="absolute inset-y-0 left-0 bg-white/28"
            style={{ width: `${unlockedPercent}%` }}
          />
          {/* 사용자가 이미 본 구간을 흐린 흰색으로 표시함 */}

          <span
            className="absolute inset-y-0 left-0 bg-white"
            style={{ width: `${progressPercent}%` }}
          />
          {/* 현재 재생 위치까지의 진행률을 진한 흰색으로 표시함 */}

          <span
            className="absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white opacity-0 transition group-hover:opacity-100"
            style={{ left: `${progressPercent}%` }}
          />
          {/* 마우스를 올렸을 때 현재 위치 핸들을 표시함 */}
        </button>
      </footer>
    </main>
  );
}