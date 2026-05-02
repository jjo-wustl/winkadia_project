// src/app/sanctuary/watch/[id]/page.tsx

"use client"; // 영상 URL을 브라우저에서 불러와 재생하기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useState } from "react"; // 영상 URL 로딩 상태를 관리하기 위해 가져옴
import { useParams, useRouter } from "next/navigation"; // 현재 영상 id와 뒤로가기 이동을 위해 가져옴
import { ArrowLeft } from "lucide-react"; // 뒤로가기 아이콘을 표시하기 위해 가져옴
import { seriesVideos } from "@/data/series-videos"; // 시리즈 영상 목록 데이터를 가져옴
import { getSignedVideoUrl } from "@/lib/video-access"; // 인증된 사용자에게만 단기 만료 서명 URL을 발급받기 위해 사용함 (Firebase Storage 직접 URL 노출을 방지)
import { useLanguage } from "@/contexts/LanguageContext"; // 한/영 번역과 현재 언어를 가져오기 위해 사용함

export default function WatchPage() { // Firebase Storage 영상 재생 페이지임
  const params = useParams<{ id: string }>(); // URL의 영상 id를 가져옴
  const router = useRouter(); // 뒤로가기 버튼 이동에 사용함
  const { t, lang } = useLanguage(); // 현재 언어와 번역 묶음을 가져옴
  const copy = t.series; // series 섹션 번역만 짧게 참조함

  const [videoUrl, setVideoUrl] = useState(""); // 실제 재생할 단기 만료 서명 URL 을 저장함
  const [isLoading, setIsLoading] = useState(true); // 영상 URL을 불러오는 중인지 저장함
  const [loadError, setLoadError] = useState<string | null>(null); // 서명 URL 발급 실패 시 사용자에게 메시지를 노출하기 위해 저장함

  const video = seriesVideos.find((item) => item.id === params.id); // 현재 URL id와 일치하는 영상을 찾음

  useEffect(() => {
    if (!video) {
      setIsLoading(false); // 영상 데이터가 없으면 로딩을 끝냄
      return;
    }

    let cancelled = false; // 컴포넌트 언마운트 후 setState 가 일어나지 않도록 가드함
    setIsLoading(true);
    setLoadError(null);

    // 서버 API를 호출해 단기 만료 서명 URL 을 받아옴 (Firebase Storage 직접 URL 노출 방지)
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
  // 플레이어 박스의 max-width — 둘 다 콘텐츠 래퍼(max-w-5xl=1024px)보다 작게 잡아 좌우에 명확한 여백이 보이도록 함
  const playerMaxWidthClass = isVertical ? "max-w-[420px]" : "max-w-4xl";

  const title = video.title[lang] ?? video.title.ko; // 현재 언어에 맞는 제목을 가져옴

  return (
    // === 가운데 정렬 — flex justify-center 패턴 (mx-auto 단독보다 안정적) ===
    // 외부 wrapper는 화면 전체 폭을 사용하면서 자식을 horizontal 가운데로 강제함
    <div className="flex w-full justify-center px-6 py-16">
      {/* 콘텐츠 래퍼 - 1024px max */}
      <div className="w-full max-w-5xl">
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
        <h1 className="mb-6 break-keep text-center text-3xl font-black leading-tight text-[#6f4b67]">
          {title}
        </h1>

        {/* 영상 플레이어 — flex justify-center로 한 번 더 가운데 정렬 강제(이중 안전장치) */}
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
      </div>
    </div>
  );
}
