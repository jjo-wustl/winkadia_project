// src/app/sanctuary/watch/[id]/page.tsx

"use client"; // 영상 URL을 브라우저에서 불러와 재생하기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useState } from "react"; // 영상 URL 로딩 상태를 관리하기 위해 가져옴
import { useParams, useRouter } from "next/navigation"; // 현재 영상 id와 뒤로가기 이동을 위해 가져옴
import { ArrowLeft } from "lucide-react"; // 뒤로가기 아이콘을 표시하기 위해 가져옴
import { seriesVideos } from "@/data/series-videos"; // 시리즈 영상 목록 데이터를 가져옴
import { getSignedVideoUrl } from "@/lib/video-access"; // 인증된 사용자에게만 단기 만료 서명 URL을 발급받기 위해 사용함 (Firebase Storage 직접 URL 노출을 방지)
import { incrementViewCount } from "@/lib/firestore-video"; // 페이지 진입 시 마다 조회수를 1 증가시킴 (같은 사용자가 여러 번 들어와도 누적)
import { useLanguage } from "@/contexts/LanguageContext"; // 한/영 번역과 현재 언어를 가져오기 위해 사용함
import CommentsPanel from "@/components/video/CommentsPanel"; // 우측에 표시될 조회수 + 댓글 패널

export default function WatchPage() { // Firebase Storage 영상 재생 페이지임
  const params = useParams<{ id: string }>(); // URL의 영상 id를 가져옴
  const router = useRouter(); // 뒤로가기 버튼 이동에 사용함
  const { t, lang } = useLanguage(); // 현재 언어와 번역 묶음을 가져옴
  const copy = t.series; // series 섹션 번역만 짧게 참조함

  const [videoUrl, setVideoUrl] = useState(""); // 실제 재생할 단기 만료 서명 URL 을 저장함
  const [isLoading, setIsLoading] = useState(true); // 영상 URL을 불러오는 중인지 저장함
  const [loadError, setLoadError] = useState<string | null>(null); // 서명 URL 발급 실패 시 사용자에게 메시지를 노출하기 위해 저장함

  const video = seriesVideos.find((item) => item.id === params.id); // 현재 URL id와 일치하는 영상을 찾음
  const videoId = video?.id; // useEffect deps 에 안정적으로 사용하기 위해 id 만 추출

  // 조회수 증가 — 영상 id 가 바뀔 때만 1회 실행 (언어 토글 등 다른 의존성에는 반응하지 않음).
  // 같은 사용자가 페이지를 다시 들어오거나 새로고침하면 매번 누적됨.
  useEffect(() => {
    if (!videoId) return;
    incrementViewCount(videoId);
  }, [videoId]);

  // 서명 URL 발급 — 영상이 바뀔 때 새 URL 을 받음. 언어 변경 시 fetching 을 다시 트리거하지 않도록
  // 에러 메시지는 ref 패턴 대신 catch 시점에 직접 참조 (동일 효과)
  useEffect(() => {
    if (!video) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setLoadError(null);

    getSignedVideoUrl(video.id)
      .then(({ url }) => {
        if (cancelled) return;
        setVideoUrl(url);
      })
      .catch((err) => {
        console.error("[WatchPage] failed to get signed video url:", err);
        if (cancelled) return;
        setLoadError(copy.states.videoError);
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [video, copy.states.videoError]);

  if (!video) {
    // 영상을 찾지 못했을 때도 화면 가운데 정렬되도록 flex justify-center 사용함
    return (
      <div className="flex w-full justify-center px-6 py-24">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <p className="text-2xl font-black text-[#6f4b67]">{copy.states.notFound}</p>
          <button
            type="button"
            onClick={() => router.push("/sanctuary/series")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ffb3d0] px-8 py-3 font-black text-[#3a2040] transition hover:brightness-105"
          >
            <ArrowLeft size={18} />
            {copy.actions.back}
          </button>
        </div>
      </div>
    );
  }

  // 영상의 가로/세로 비율에 따라 플레이어 컨테이너의 클래스를 다르게 줌
  const isVertical = video.aspectRatio === "9:16";
  const playerAspectClass = isVertical ? "aspect-[9/16]" : "aspect-video";
  // 플레이어 박스의 max-width — 좌측 video 컬럼 안에서 가운데 정렬되도록 살짝 작게 잡음
  const playerMaxWidthClass = isVertical ? "max-w-[380px]" : "max-w-3xl";

  const title = video.title[lang] ?? video.title.ko; // 현재 언어에 맞는 제목을 가져옴

  return (
    // === 가운데 정렬 — flex justify-center 패턴 (mx-auto 단독보다 안정적) ===
    <div className="flex w-full justify-center px-6 py-16">
      {/* 콘텐츠 래퍼 - 2-column 레이아웃을 담을 max 폭 (1280px) */}
      <div className="w-full max-w-6xl">
        {/* 뒤로가기 버튼 - 콘텐츠 폭 안에서 좌측에 위치 */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.push("/sanctuary/series")}
            className="inline-flex items-center gap-2 rounded-full border border-[#f6c8da] bg-white/80 px-7 py-3 text-sm font-black text-[#c76790] transition hover:bg-white"
          >
            <ArrowLeft size={16} />
            Series
          </button>
        </div>

        {/* 제목 - 가운데 정렬 텍스트 */}
        <h1 className="mb-8 break-keep text-center text-3xl font-black leading-tight text-[#6f4b67]">
          {title}
        </h1>

        {/* 2-column 레이아웃: 좌측 영상 / 우측 댓글 패널 (모바일에서는 stack) */}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* 좌측 — 영상 플레이어 (컬럼 안에서 가운데 정렬) */}
          <div className="flex w-full justify-center">
            <div
              className={`w-full overflow-hidden rounded-[36px] border border-[#f1d6de] bg-black shadow-[0_24px_60px_rgba(192,116,142,0.18)] ${playerMaxWidthClass}`}
            >
              {isLoading ? (
                <div className={`${playerAspectClass} flex w-full items-center justify-center text-white`}>
                  {copy.states.videoLoading}
                </div>
              ) : loadError ? (
                <div className={`${playerAspectClass} flex w-full items-center justify-center text-white/85`}>
                  {loadError}
                </div>
              ) : (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  playsInline
                  // ↓ 다운로드 차단: Chrome/Edge의 우측 점세개 메뉴 다운로드 옵션 제거
                  controlsList="nodownload"
                  // ↓ Picture-in-Picture / Cast 옵션도 제거 (점세개 메뉴 단순화)
                  disablePictureInPicture
                  disableRemotePlayback
                  // ↓ 우클릭 컨텍스트 메뉴 차단: "동영상을 다른 이름으로 저장" 비활성화
                  onContextMenu={(event) => event.preventDefault()}
                  // ↓ 드래그로 영상을 끌어내려 다운로드하는 동작도 차단
                  onDragStart={(event) => event.preventDefault()}
                  className={`${playerAspectClass} block h-full w-full bg-black`}
                />
              )}
            </div>
          </div>

          {/* 우측 — 조회수 + 댓글 패널 (실시간 Firestore 구독) */}
          <CommentsPanel videoId={video.id} />
        </div>
      </div>
    </div>
  );
}
