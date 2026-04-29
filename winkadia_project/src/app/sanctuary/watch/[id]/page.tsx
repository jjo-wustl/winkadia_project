// src/app/sanctuary/watch/[id]/page.tsx

"use client"; // 영상 URL을 브라우저에서 불러와 재생하기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useState } from "react"; // 영상 URL 로딩 상태를 관리하기 위해 가져옴
import { useParams, useRouter } from "next/navigation"; // 현재 영상 id와 뒤로가기 이동을 위해 가져옴
import { seriesVideos } from "@/data/series-videos"; // 시리즈 영상 목록 데이터를 가져옴
import { getStorageUrl } from "@/lib/storage"; // Firebase Storage 경로를 실제 URL로 바꾸는 함수를 가져옴

export default function WatchPage() { // Firebase Storage 영상 재생 페이지임
  const params = useParams<{ id: string }>(); // URL의 영상 id를 가져옴
  const router = useRouter(); // 뒤로가기 버튼 이동에 사용함
  const [videoUrl, setVideoUrl] = useState(""); // 실제 재생할 Firebase 영상 URL을 저장함
  const [isLoading, setIsLoading] = useState(true); // 영상 URL을 불러오는 중인지 저장함

  const video = seriesVideos.find((item) => item.id === params.id); // 현재 URL id와 일치하는 영상을 찾음

  useEffect(() => {
    if (!video) {
      setIsLoading(false); // 영상 데이터가 없으면 로딩을 끝냄
      return;
    }

    getStorageUrl(video.videoPath)
      .then((url) => setVideoUrl(url)) // Storage 영상 경로를 실제 URL로 변환해 저장함
      .finally(() => setIsLoading(false)); // 성공/실패와 관계없이 로딩을 끝냄
  }, [video]);

  if (!video) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-2xl font-black text-[#6f4b67]">영상을 찾을 수 없음</p>
        <button
          type="button"
          onClick={() => router.push("/sanctuary/series")}
          className="mt-8 rounded-full bg-[#ffb3d0] px-8 py-3 font-black text-[#3a2040]"
        >
          Series로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <button
        type="button"
        onClick={() => router.push("/sanctuary/series")}
        className="mb-8 rounded-full border border-[#f6c8da] bg-white/80 px-7 py-3 text-sm font-black text-[#c76790]"
      >
        ← Series
      </button>

      <h1 className="mb-6 text-3xl font-black text-[#6f4b67]">{video.title}</h1>

      <div className="overflow-hidden rounded-[36px] border border-[#f1d6de] bg-black shadow-[0_24px_60px_rgba(192,116,142,0.18)]">
        {isLoading ? (
          <div className="flex aspect-video items-center justify-center text-white">
            영상 불러오는 중...
          </div>
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="aspect-video w-full bg-black"
          />
        )}
      </div>
    </div>
  );
}