// src/app/sanctuary/game/page.tsx
//
// Game 페이지 - FMV 게임 소개 및 에피소드 진입 화면.

import Link from "next/link"; // 다른 sanctuary 페이지로 이동하는 링크를 만들기 위해 Link를 가져옴
import {
  ArrowRight,
  Castle,
  Clapperboard,
  Crown,
  Eye,
  Film,
  Lock,
  Play,
  Sparkles,
  Wand2,
} from "lucide-react"; // 게임 페이지에 사용할 아이콘을 가져옴
import GameStorageImage from "@/components/game/GameStorageImage"; // Firebase Storage 이미지를 표시하는 공통 컴포넌트를 가져옴
import {
  gameCharacters,
  gameEpisodes,
  gameGalleryItems,
  gameHero,
  gameRoutes,
} from "@/data/game-content"; // Game 페이지에 사용할 Storage 경로 기반 데이터를 가져옴

const featureCards = [
  {
    icon: Clapperboard,
    title: "실사형 FMV",
    desc: "장면 단위 영상으로 이어지는 스토리",
  },
  {
    icon: Wand2,
    title: "선택지 진행",
    desc: "선택으로 감정의 흐름을 따라감",
  },
  {
    icon: Castle,
    title: "황궁 세계관",
    desc: "낯선 황궁에서 시작되는 판타지",
  },
  {
    icon: Crown,
    title: "캐릭터 루트",
    desc: "인물별 서사를 따라가는 이야기",
  },
]; // 게임 특징 목록임

export default function GamePage() {
  const firstEpisode = gameEpisodes.find((episode) => episode.id === "ep-01")!; // 첫 번째 재생 에피소드를 가져옴

  return (
    <div className="flex w-full justify-center px-6 py-20 text-[#32283d] sm:px-8 lg:px-10">
      {/* 기존 sanctuary layout 배경을 그대로 사용하고, 페이지 내부만 중앙 정렬함 */}
      <div className="flex w-full max-w-[1560px] flex-col gap-[50px]">
        {/* gap으로 섹션 사이 간격을 조절함 */}

        <section className="relative rounded-[44px] border border-white/80 bg-white/72 p-6 shadow-[0_30px_110px_rgba(120,82,166,0.18)] backdrop-blur-2xl sm:p-8 lg:p-10">
          {/* 상단 히어로 카드 영역임 */}
          <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[360px] w-[360px] rounded-full bg-[#ead8ff]/80 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[430px] w-[430px] rounded-full bg-[#f4d8ff]/80 blur-[130px]" />
          <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-[radial-gradient(circle_at_45%_20%,rgba(255,255,255,0.88),rgba(255,255,255,0.22)_48%,transparent_78%)]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="flex min-h-[540px] flex-col justify-between rounded-[34px] border border-white/70 bg-white/58 px-8 py-11 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-10 sm:py-[52px] lg:py-14">
              {/* 히어로 왼쪽 텍스트 영역임 */}
              <div>
                <span className="inline-flex min-h-[34px] items-center gap-2 rounded-full border border-[#e6d7fb] bg-white/80 px-5 py-2 text-[12px] font-black uppercase leading-[1.3] tracking-[0.22em] text-[#8b68d8] shadow-sm">
                  <Sparkles size={13} />
                  {gameHero.badge}
                </span>

                <h1 className="mt-8 break-keep text-[52px] font-black leading-[1.18] tracking-[-0.04em] text-[#2f263b] sm:text-[76px] lg:text-[84px]">
                  {gameHero.title}
                  <span className="mt-3 block leading-[1.18] text-[#8b68d8]">
                    {gameHero.subTitle}
                  </span>
                </h1>

                <p className="mt-8 max-w-[680px] break-keep text-[17px] font-semibold leading-[1.95] text-[#746985] sm:text-[19px]">
                  {gameHero.description}
                </p>
              </div>

              <div className="mt-14 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/sanctuary/game/play/ep-01"
                  className="inline-flex min-h-[60px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#9b78e5] to-[#7f5bcc] px-9 py-3 text-[16px] font-extrabold leading-[1.3] text-white shadow-[0_16px_34px_rgba(127,91,204,0.28)] transition hover:opacity-95"
                  style={{ textDecoration: "none" }}
                >
                  <Play size={19} fill="currentColor" />
                  <span>게임 시작하기</span>
                </Link>

                <Link
                  href="/sanctuary/series"
                  className="inline-flex min-h-[60px] items-center justify-center gap-2 rounded-full border border-[#e7dcfa] bg-white/78 px-9 py-3 text-[16px] font-extrabold leading-[1.3] text-[#7f5bcc] shadow-sm transition hover:bg-white"
                  style={{ textDecoration: "none" }}
                >
                  <span>시리즈 보기</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[540px] overflow-hidden rounded-[34px] border border-white/75 bg-[#2b2140] shadow-[0_28px_80px_rgba(75,48,118,0.24)]">
              {/* 대표 포스터 이미지 영역임 */}
              <GameStorageImage
                path={gameHero.posterPath}
                alt={`${gameHero.title} 대표 이미지`}
                className="absolute inset-0"
              />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(25,18,38,0.08),rgba(25,18,38,0.76))]" />
              <div className="absolute left-7 top-7 rounded-full border border-white/24 bg-white/18 px-4 py-2 text-[12px] font-black uppercase leading-[1.3] tracking-[0.14em] text-white backdrop-blur-md">
                Main Preview
              </div>

              <Link
                href="/sanctuary/game/play/ep-01"
                className="absolute left-8 top-1/2 flex h-[72px] w-[72px] -translate-y-1/2 items-center justify-center rounded-full bg-white/94 text-[#7f5bcc] shadow-[0_18px_40px_rgba(35,23,54,0.24)] transition hover:scale-105"
                aria-label="preview play"
                style={{ textDecoration: "none" }}
              >
                <Play size={29} fill="currentColor" />
              </Link>

              <div className="absolute bottom-9 left-9 right-9">
                <p className="text-[12px] font-black uppercase leading-[1.4] tracking-[0.2em] text-white/68">
                  Empress Interview
                </p>

                <h2 className="mt-3 text-[34px] font-black leading-[1.22] tracking-[-0.035em] text-white sm:text-[44px]">
                  {gameHero.previewTitle}
                </h2>

                <p className="mt-5 max-w-[620px] break-keep text-[15px] font-medium leading-[1.85] text-white/82 sm:text-[16px]">
                  {gameHero.previewDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[48px] border border-white/72 bg-white/42 px-6 py-16 shadow-[0_28px_80px_rgba(127,91,204,0.08)] backdrop-blur-xl sm:px-8 sm:py-[72px] lg:px-12 lg:py-20">
          {/* 등장인물 소개 영역임 */}
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.24em] text-[#9b78e5]">
                Characters
              </p>
              <h2 className="mt-4 break-keep text-[34px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[42px]">
                등장인물 소개
              </h2>
            </div>

            <p className="max-w-[560px] break-keep text-[15px] font-semibold leading-[1.95] text-[#786f85]">
              낯선 황궁에서 서로 다른 목적과 시선으로 마주하게 되는 인물들입니다.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {gameCharacters.map((character, index) => (
              <article
                key={character.id}
                className="relative rounded-[34px] border border-white/76 bg-white/72 p-6 shadow-[0_20px_60px_rgba(127,91,204,0.10)] backdrop-blur-xl"
              >
                {/* 등장인물 카드임 */}
                <div className="relative">
                  <GameStorageImage
                    path={character.imagePath}
                    alt={`${character.name} 프로필 이미지`}
                    className="aspect-[4/5] rounded-[28px] shadow-[0_16px_38px_rgba(93,65,141,0.18)]"
                  />

                  <div className="absolute left-4 top-4 inline-flex min-h-[30px] items-center rounded-full bg-white/88 px-3 py-1.5 text-[11px] font-black leading-[1.3] text-[#7f5bcc]">
                    {character.label}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[12px] font-black uppercase leading-[1.5] tracking-[0.18em] text-white/72">
                      0{index + 1}
                    </p>
                    <h3 className="mt-1 break-keep text-[28px] font-black leading-[1.25] tracking-[-0.03em] text-white">
                      {character.name}
                    </h3>
                    <p className="mt-1 text-[14px] font-bold leading-[1.4] text-white/72">
                      {character.enName}
                    </p>
                  </div>
                </div>

                <div className="px-2 pb-2 pt-8">
                  <p className="min-h-[84px] break-keep text-[14px] font-semibold leading-[1.9] text-[#776c87]">
                    {character.desc}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {character.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex min-h-[30px] items-center rounded-full bg-[#f2ecff] px-3 py-1.5 text-[11px] font-black leading-[1.3] text-[#8b68d8]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[48px] border border-white/72 bg-white/42 px-6 py-16 shadow-[0_28px_80px_rgba(127,91,204,0.08)] backdrop-blur-xl sm:px-8 sm:py-[72px] lg:px-12 lg:py-20">
          {/* 루트 선택 영역임 */}
          <div className="mb-16 flex items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.24em] text-[#9b78e5]">
                Route Select
              </p>
              <h2 className="mt-4 break-keep text-[34px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[42px]">
                루트 선택
              </h2>
            </div>

            <Link
              href="/sanctuary/game/route/kairen"
              className="hidden min-h-[48px] items-center gap-2 rounded-full border border-[#e6d7fb] bg-white/72 px-5 py-2 text-[13px] font-black leading-[1.3] text-[#8b68d8] shadow-sm sm:inline-flex"
              style={{ textDecoration: "none" }}
            >
              전체 루트 보기
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {gameRoutes.map((route, index) => {
              const isActiveRoute = route.status === "선택하기";

              return (
                <article
                  key={route.id}
                  className="group relative rounded-[32px] border border-white/76 bg-white/72 p-6 shadow-[0_18px_50px_rgba(127,91,204,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(127,91,204,0.16)]"
                >
                  {/* 루트 카드임 */}
                  <div className="relative">
                    <GameStorageImage
                      path={route.imagePath}
                      alt={`${route.title} 이미지`}
                      className="aspect-[16/10] rounded-[26px] shadow-[0_14px_34px_rgba(93,65,141,0.16)]"
                    />

                    <span className="absolute left-4 top-4 inline-flex min-h-[30px] items-center rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black leading-[1.3] text-[#7f5bcc]">
                      {route.tag}
                    </span>

                    <div className="absolute bottom-4 right-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[#8b68d8] shadow-md">
                      {route.status === "Locked" ? <Lock size={17} /> : <Crown size={17} />}
                    </div>
                  </div>

                  <div className="flex min-h-[230px] flex-col px-2 pb-2 pt-8">
                    <p className="text-[12px] font-black uppercase leading-[1.5] tracking-[0.18em] text-[#a18dbb]">
                      0{index + 1}
                    </p>

                    <h3 className="mt-3 break-keep text-[24px] font-black leading-[1.3] tracking-[-0.03em] text-[#30283b]">
                      {route.title}
                    </h3>

                    <p className="mt-5 min-h-[80px] break-keep text-[14px] font-semibold leading-[1.9] text-[#776c87]">
                      {route.desc}
                    </p>

                    {isActiveRoute ? (
                      <Link
                        href={`/sanctuary/game/route/${route.id}`}
                        className="mt-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white/82 px-5 py-2 text-[13px] font-black leading-[1.3] text-[#8b68d8] shadow-sm transition group-hover:bg-[#8b68d8] group-hover:text-white"
                        style={{ textDecoration: "none" }}
                      >
                        {route.status}
                        <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="mt-auto inline-flex min-h-[48px] cursor-default items-center justify-center gap-2 rounded-full bg-white/62 px-5 py-2 text-[13px] font-black leading-[1.3] text-[#9e91ae] shadow-sm"
                      >
                        {route.status}
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-[48px] border border-white/72 bg-white/42 px-6 py-16 shadow-[0_28px_80px_rgba(127,91,204,0.08)] backdrop-blur-xl sm:px-8 sm:py-[72px] lg:px-12 lg:py-20">
          {/* 게임 특징 영역임 */}
          <div className="mb-16">
            <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.24em] text-[#9b78e5]">
              Game Features
            </p>
            <h2 className="mt-4 break-keep text-[34px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[42px]">
              게임 특징
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex min-h-[146px] items-center gap-6 rounded-[30px] border border-[#eee6fb] bg-white/70 px-7 py-7 shadow-[0_16px_42px_rgba(127,91,204,0.07)]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f2ecff] text-[#8b68d8]">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="break-keep text-[17px] font-black leading-[1.35] text-[#30283b]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 break-keep text-[13px] font-semibold leading-[1.8] text-[#81758f]">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[48px] border border-white/72 bg-white/42 px-6 py-16 shadow-[0_28px_80px_rgba(127,91,204,0.08)] backdrop-blur-xl sm:px-8 sm:py-[72px] lg:px-12 lg:py-20">
          {/* 스토리 미리보기 영역임 */}
          <div className="mb-16">
            <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.24em] text-[#9b78e5]">
              Story Preview
            </p>
            <h2 className="mt-4 break-keep text-[34px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[42px]">
              스토리 미리보기
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-[36px] border border-white/76 bg-white/72 p-7 shadow-[0_20px_60px_rgba(127,91,204,0.10)] backdrop-blur-xl sm:p-8">
              <div className="mb-9 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.22em] text-[#9b78e5]">
                    Latest Chapter
                  </p>
                  <h3 className="mt-3 break-keep text-[30px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[36px]">
                    최신 챕터 미리보기
                  </h3>
                </div>

                <span className="inline-flex min-h-[38px] items-center rounded-full bg-[#f2ecff] px-4 py-2 text-[12px] font-black leading-[1.3] text-[#8b68d8]">
                  Chapter 01
                </span>
              </div>

              <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
                <div className="relative">
                  <GameStorageImage
                    path={firstEpisode.thumbnailPath}
                    alt={`${firstEpisode.title} 썸네일`}
                    className="aspect-[16/10] rounded-[28px] shadow-[0_14px_34px_rgba(93,65,141,0.16)]"
                  />

                  <Link
                    href={`/sanctuary/game/play/${firstEpisode.id}`}
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/94 text-[#7f5bcc] shadow-lg"
                    aria-label="chapter play"
                    style={{ textDecoration: "none" }}
                  >
                    <Play size={26} fill="currentColor" />
                  </Link>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[12px] font-black uppercase leading-[1.5] tracking-[0.18em] text-white/72">
                      Chapter 01
                    </p>
                    <h3 className="mt-1 text-[25px] font-black leading-[1.3] text-white">
                      황궁 면접
                    </h3>
                  </div>
                </div>

                <div className="flex min-h-[290px] flex-col justify-between rounded-[28px] border border-[#eee6fb] bg-white/60 p-7">
                  <div>
                    <h3 className="break-keep text-[26px] font-black leading-[1.3] tracking-[-0.03em] text-[#30283b]">
                      {firstEpisode.title}
                    </h3>

                    <p className="mt-5 break-keep text-[14px] font-semibold leading-[1.9] text-[#786f85]">
                      {firstEpisode.desc}
                    </p>
                  </div>

                  <Link
                    href={`/sanctuary/game/play/${firstEpisode.id}`}
                    className="mt-8 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9b78e5] to-[#7f5bcc] px-5 py-2 text-[14px] font-black leading-[1.3] text-white shadow-[0_12px_26px_rgba(127,91,204,0.22)]"
                    style={{ textDecoration: "none" }}
                  >
                    이어보기
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </article>

            <article className="rounded-[36px] border border-white/76 bg-white/72 p-7 shadow-[0_20px_60px_rgba(127,91,204,0.10)] backdrop-blur-xl sm:p-8">
              {/* 선택지 예시 영역임 */}
              <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.22em] text-[#9b78e5]">
                Choice Moment
              </p>

              <h3 className="mt-3 break-keep text-[30px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[36px]">
                선택의 순간
              </h3>

              <p className="mt-6 break-keep text-[14px] font-semibold leading-[1.9] text-[#786f85]">
                선택은 이야기를 갈라놓는 과장된 장치가 아니라, 장면의 감정 흐름을 따라가는 방식입니다.
              </p>

              <div className="mt-12 space-y-5">
                <button
                  type="button"
                  className="flex min-h-[62px] w-full items-center justify-between rounded-[24px] border border-[#e8ddfb] bg-white/76 px-6 py-4 text-left shadow-sm"
                >
                  <span className="break-keep text-[15px] font-black leading-[1.4] text-[#30283b]">
                    그의 말을 믿는다
                  </span>
                  <ArrowRight size={17} className="shrink-0 text-[#8b68d8]" />
                </button>

                <button
                  type="button"
                  className="flex min-h-[62px] w-full items-center justify-between rounded-[24px] border border-[#e8ddfb] bg-white/50 px-6 py-4 text-left shadow-sm"
                >
                  <span className="break-keep text-[15px] font-black leading-[1.4] text-[#30283b]">
                    거리를 둔다
                  </span>
                  <ArrowRight size={17} className="shrink-0 text-[#8b68d8]" />
                </button>
              </div>

              <div className="mt-12 rounded-[26px] bg-[#f4edff]/72 p-7">
                <div className="flex items-start gap-3">
                  <Eye size={20} className="mt-1 shrink-0 text-[#8b68d8]" />
                  <p className="break-keep text-[14px] font-semibold leading-[1.9] text-[#746985]">
                    선택은 장면 속 감정과 시선을 따라가며 이야기를 더 깊게 읽는 방식이 됩니다.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-[48px] border border-white/72 bg-white/42 px-6 py-16 shadow-[0_28px_80px_rgba(127,91,204,0.08)] backdrop-blur-xl sm:px-8 sm:py-[72px] lg:px-12 lg:py-20">
          {/* 에피소드 카드 목록 영역임 */}
          <div className="mb-16 flex items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.24em] text-[#9b78e5]">
                Episodes
              </p>
              <h2 className="mt-4 break-keep text-[34px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[42px]">
                게임 에피소드
              </h2>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {gameEpisodes.map((episode) => {
              const isPlayable = episode.status === "Play";

              return (
                <article
                  key={episode.id}
                  className="rounded-[34px] border border-white/76 bg-white/72 p-6 shadow-[0_18px_50px_rgba(127,91,204,0.10)] backdrop-blur-xl"
                >
                  <div className="relative">
                    <GameStorageImage
                      path={episode.thumbnailPath}
                      alt={`${episode.title} 썸네일`}
                      className="aspect-[16/10] rounded-[26px] shadow-[0_14px_34px_rgba(93,65,141,0.16)]"
                    />

                    <span className="absolute left-4 top-4 inline-flex min-h-[30px] items-center rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black leading-[1.3] text-[#7f5bcc]">
                      {episode.status}
                    </span>

                    <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-[#7f5bcc] shadow-md">
                      {isPlayable ? <Film size={20} /> : <Lock size={20} />}
                    </div>
                  </div>

                  <div className="px-3 pb-3 pt-8">
                    <h3 className="break-keep text-[23px] font-black leading-[1.3] tracking-[-0.025em] text-[#2f2938]">
                      {episode.title}
                    </h3>

                    <p className="mt-5 min-h-[76px] break-keep text-[14px] font-semibold leading-[1.9] text-[#7a7088]">
                      {episode.desc}
                    </p>

                    {isPlayable ? (
                      <Link
                        href={`/sanctuary/game/play/${episode.id}`}
                        className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#f2ecff] px-5 py-2 text-[14px] font-black leading-[1.3] text-[#7f5bcc] transition hover:bg-[#8b68d8] hover:text-white"
                        style={{ textDecoration: "none" }}
                      >
                        재생하기
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="mt-8 inline-flex min-h-[48px] w-full cursor-default items-center justify-center rounded-full bg-[#f2ecff]/70 px-5 py-2 text-[14px] font-black leading-[1.3] text-[#9e91ae]"
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

        <section className="rounded-[48px] border border-white/72 bg-white/42 px-6 py-16 shadow-[0_28px_80px_rgba(127,91,204,0.08)] backdrop-blur-xl sm:px-8 sm:py-[72px] lg:px-12 lg:py-20">
          {/* CG 갤러리 영역임 */}
          <div className="mb-16 flex items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.24em] text-[#9b78e5]">
                CG Gallery
              </p>
              <h2 className="mt-4 break-keep text-[34px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[42px]">
                CG 갤러리
              </h2>
            </div>

            <Link
              href="/sanctuary/game/gallery"
              className="hidden min-h-[48px] items-center gap-2 rounded-full border border-[#e6d7fb] bg-white/72 px-5 py-2 text-[13px] font-black leading-[1.3] text-[#8b68d8] shadow-sm sm:inline-flex"
              style={{ textDecoration: "none" }}
            >
              전체 보기
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {gameGalleryItems.map((item) => (
              <Link
                key={item.id}
                href="/sanctuary/game/gallery"
                className="relative block"
                style={{ textDecoration: "none" }}
              >
                <GameStorageImage
                  path={item.imagePath}
                  alt={`${item.title} CG 이미지`}
                  className="aspect-[16/9] min-h-[210px] rounded-[28px] shadow-[0_14px_32px_rgba(93,65,141,0.16)]"
                />

                <p className="absolute bottom-6 left-6 break-keep text-[16px] font-black leading-[1.35] text-white">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[48px] border border-white/76 bg-gradient-to-r from-white/82 via-[#f3eaff]/82 to-white/72 px-8 py-16 shadow-[0_24px_72px_rgba(127,91,204,0.11)] backdrop-blur-xl sm:px-10 sm:py-[72px] lg:px-12 lg:py-20">
          {/* 하단 CTA 영역임 */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[13px] font-black uppercase leading-[1.5] tracking-[0.22em] text-[#9b78e5]">
                Start Now
              </p>
              <h2 className="mt-4 break-keep text-[34px] font-black leading-[1.25] tracking-[-0.03em] text-[#30283b] sm:text-[42px]">
                지금, 당신의 이야기를 시작하세요
              </h2>
              <p className="mt-6 break-keep text-[15px] font-semibold leading-[1.9] text-[#786f85]">
                황궁의 문이 열리고, 첫 선택이 이야기를 움직입니다.
              </p>
            </div>

            <Link
              href="/sanctuary/game/play/ep-01"
              className="inline-flex min-h-[60px] shrink-0 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#9b78e5] to-[#7f5bcc] px-9 py-3 text-[16px] font-extrabold leading-[1.3] text-white shadow-[0_16px_34px_rgba(127,91,204,0.28)] transition hover:opacity-95"
              style={{ textDecoration: "none" }}
            >
              <Play size={19} fill="currentColor" />
              게임 시작하기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}