// src/app/sanctuary/game/route/[routeId]/page.tsx
//
// Game 캐릭터 루트 상세 화면임.

import Link from "next/link"; // 페이지 이동 링크를 만들기 위해 사용함
import { notFound } from "next/navigation"; // 존재하지 않는 루트 접근 시 404를 보여주기 위해 사용함
import { ArrowLeft, ArrowRight, Lock, Play } from "lucide-react"; // 루트 상세 화면 아이콘을 가져옴
import GameStorageImage from "@/components/game/GameStorageImage"; // Firebase Storage 이미지를 표시하는 컴포넌트를 가져옴
import { gameEpisodes, gameRoutes } from "@/data/game-content"; // 루트와 에피소드 데이터를 가져옴

type GameRoutePageProps = {
  params: Promise<{
    routeId: string;
  }>;
}; // Next App Router 동적 라우트 params 타입임

export default async function GameRoutePage({ params }: GameRoutePageProps) {
  const { routeId } = await params; // URL에서 route id를 가져옴
  const route = gameRoutes.find((item) => item.id === routeId); // 현재 루트 데이터를 찾음
  const routeEpisodes = gameEpisodes.filter((episode) => episode.routeId === routeId); // 현재 루트에 연결된 에피소드만 가져옴

  if (!route) {
    notFound();
  }

  const isPlayableRoute = route.status === "선택하기"; // 현재 플레이 가능한 루트인지 확인함

  return (
    <div className="flex w-full justify-center px-6 py-20 text-[#32283d] sm:px-8 lg:px-10">
      {/* 기존 sanctuary layout 배경을 그대로 사용하고, 루트 상세 화면만 중앙 정렬함 */}
      <div className="w-full max-w-[1460px]">
        <section className="rounded-[48px] border border-white/72 bg-white/52 p-6 shadow-[0_28px_90px_rgba(127,91,204,0.12)] backdrop-blur-xl sm:p-8 lg:p-10">
          {/* 루트 히어로 영역임 */}
          <div className="mb-8">
            <Link
              href="/sanctuary/game"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#e6d7fb] bg-white/72 px-5 text-[13px] font-black text-[#8b68d8] shadow-sm"
              style={{ textDecoration: "none" }}
            >
              <ArrowLeft size={15} />
              Game
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="relative min-h-[520px] overflow-hidden rounded-[36px] bg-[#2b2140] shadow-[0_24px_70px_rgba(75,48,118,0.20)]">
              <GameStorageImage
                path={route.imagePath}
                alt={`${route.title} 대표 이미지`}
                className="absolute inset-0"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,18,38,0.08),rgba(25,18,38,0.78))]" />

              <div className="absolute left-7 top-7 rounded-full bg-white/90 px-4 py-2 text-[12px] font-black text-[#7f5bcc]">
                {route.tag}
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white/64">
                  {route.routeTitle}
                </p>
                <h1 className="mt-3 break-keep text-[42px] font-black leading-[1.2] tracking-[-0.04em] text-white sm:text-[56px]">
                  {route.title}
                </h1>
              </div>
            </div>

            <div className="flex min-h-[520px] flex-col justify-between rounded-[36px] border border-white/70 bg-white/70 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.70)] lg:p-10">
              <div>
                <p className="text-[13px] font-black uppercase tracking-[0.24em] text-[#9b78e5]">
                  Route Detail
                </p>

                <h2 className="mt-4 break-keep text-[36px] font-black leading-[1.25] tracking-[-0.04em] text-[#30283b] sm:text-[48px]">
                  {route.routeTitle}
                </h2>

                <p className="mt-6 break-keep text-[16px] font-semibold leading-[1.95] text-[#786f85]">
                  {route.routeDesc}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {route.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex min-h-[32px] items-center rounded-full bg-[#f2ecff] px-3 py-1.5 text-[11px] font-black text-[#8b68d8]"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>

              {isPlayableRoute ? (
                <Link
                  href="/sanctuary/game/play/ep-01"
                  className="mt-10 inline-flex min-h-[58px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9b78e5] to-[#7f5bcc] px-8 text-[16px] font-black text-white shadow-[0_16px_34px_rgba(127,91,204,0.28)]"
                  style={{ textDecoration: "none" }}
                >
                  <Play size={18} fill="currentColor" />
                  루트 시작하기
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-10 inline-flex min-h-[58px] cursor-default items-center justify-center gap-2 rounded-full bg-[#f2ecff] px-8 text-[16px] font-black text-[#9e91ae]"
                >
                  <Lock size={18} />
                  Coming Soon
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[48px] border border-white/72 bg-white/48 px-6 py-12 shadow-[0_24px_72px_rgba(127,91,204,0.08)] backdrop-blur-xl sm:px-8 lg:px-10">
          {/* 루트 에피소드 목록 영역임 */}
          <div className="mb-10">
            <p className="text-[13px] font-black uppercase tracking-[0.24em] text-[#9b78e5]">
              Episodes
            </p>
            <h2 className="mt-3 break-keep text-[34px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[42px]">
              루트 에피소드
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {routeEpisodes.map((episode) => {
              const isPlayable = episode.status === "Play";

              return (
                <article
                  key={episode.id}
                  className="rounded-[34px] border border-white/76 bg-white/72 p-6 shadow-[0_18px_50px_rgba(127,91,204,0.10)]"
                >
                  <GameStorageImage
                    path={episode.thumbnailPath}
                    alt={`${episode.title} 썸네일`}
                    className="aspect-[16/10] rounded-[26px]"
                  />

                  <div className="pt-7">
                    <h3 className="break-keep text-[23px] font-black leading-[1.3] text-[#30283b]">
                      {episode.title}
                    </h3>

                    <p className="mt-4 min-h-[70px] break-keep text-[14px] font-semibold leading-[1.85] text-[#7a7088]">
                      {episode.desc}
                    </p>

                    {isPlayable ? (
                      <Link
                        href={`/sanctuary/game/play/${episode.id}`}
                        className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#f2ecff] text-[14px] font-black text-[#7f5bcc] transition hover:bg-[#8b68d8] hover:text-white"
                        style={{ textDecoration: "none" }}
                      >
                        재생하기
                        <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="mt-7 inline-flex min-h-[48px] w-full cursor-default items-center justify-center rounded-full bg-[#f2ecff]/70 text-[14px] font-black text-[#9e91ae]"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}