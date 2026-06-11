// src/app/sanctuary/game/play/[episodeId]/page.tsx
//
// Game 에피소드 FMV 재생 화면임.

import { notFound } from "next/navigation"; // 존재하지 않는 에피소드 접근 시 404를 보여주기 위해 사용함
import GameFmvPlayer from "@/components/game/GameFmvPlayer"; // FMV 영상과 선택지를 표시하는 플레이어 컴포넌트를 가져옴
import { gameEpisodes } from "@/data/game-content"; // 에피소드 데이터를 가져옴

type GamePlayPageProps = {
  params: Promise<{
    episodeId: string;
  }>;
}; // Next App Router 동적 라우트 params 타입임

export default async function GamePlayPage({ params }: GamePlayPageProps) {
  const { episodeId } = await params; // URL에서 에피소드 id를 가져옴
  const episode = gameEpisodes.find((item) => item.id === episodeId); // 현재 에피소드 데이터를 찾음

  if (!episode || episode.status !== "Play") {
    notFound();
  }

  return (
    <div className="flex w-full justify-center px-6 py-20 text-[#32283d] sm:px-8 lg:px-10">
      {/* 기존 sanctuary layout 배경을 그대로 사용하고, 플레이 화면만 중앙 정렬함 */}
      <div className="w-full max-w-[1460px]">
        <GameFmvPlayer episode={episode} />
      </div>
    </div>
  );
}