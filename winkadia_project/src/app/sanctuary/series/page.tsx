// src/app/sanctuary/series/page.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import Image from "next/image"; // Next.js 이미지 최적화 컴포넌트를 사용하기 위해 가져옴
import { Play, Sparkles } from "lucide-react"; // 로판 시리즈 페이지 버튼 아이콘을 표시하기 위해 가져옴
import { useLanguage } from "@/contexts/LanguageContext"; // 한국어/영어 번역을 가져오기 위해 사용함

const rofanImages = [
  "/images/home/series-01.png",
  "/images/home/series-02.png",
  "/images/home/series-03.png",
  "/images/home/series-04.png",
  "/images/home/series-05.png",
  "/images/home/series-06.png",
  "/images/home/series-07.png",
  "/images/home/series-08.png",
]; // 로판 시리즈 페이지에서 사용할 대표 이미지 목록임

const progressValues = ["74%", "48%", "63%", "29%"]; // 이어보기 카드에 보여줄 임시 시청률 값임

const heroImage = rofanImages[0]; // 히어로 영역에 사용할 첫 번째 대표 이미지임

const continueWatching = rofanImages.slice(0, 4).map((image, index) => ({
  image,
  progress: progressValues[index % progressValues.length],
})); // 이어보기는 요청대로 4개만 보여줌 - 이미지/진행률은 번역이 필요 없으므로 컴포넌트 밖에서 계산함

const titleColorClass = "text-[#6f4b67]"; // 로판 페이지 제목 색상 클래스임
const bodyColorClass = "text-[#8f7186]"; // 로판 페이지 본문 색상 클래스임
const accentColorClass = "text-[#d17fa2]"; // 로판 페이지 포인트 색상 클래스임

const shellClass =
  "border-[#f1d6de] bg-white/82 shadow-[0_24px_60px_rgba(192,116,142,0.10)]"; // 로판 카드 공통 박스 스타일임

const chipClass =
  "border-[#f7bfd6] bg-white/75 text-[#c76790] shadow-sm"; // 로판 메인 칩 스타일임

const softChipClass =
  "border-[#f7cfe0] bg-[#fff7fb]/85 text-[#b96b8b]"; // 로판 보조 칩 스타일임

const primaryButtonClass =
  "bg-[linear-gradient(135deg,#ff9cc3,#ffc7df)] text-[#3a2040] shadow-[0_14px_28px_rgba(255,160,200,0.36)] hover:brightness-105"; // 메인 버튼 글씨와 아이콘을 진한 검보라색으로 표시함

const secondaryButtonClass =
  "border-[#f6c8da] bg-white/80 text-[#3a2040] hover:bg-white"; // 보조 버튼 글씨를 진한 검보라색으로 표시함

const projectVisual =
  "bg-[linear-gradient(135deg,#271634_0%,#61356f_55%,#d7789d_100%)]"; // 대표 작품 카드 배경 그라데이션임 (번역과 무관하므로 분리함)

export default function SeriesPage() { // 윙카디아 Series 페이지이며 로판 시리즈만 보여줌
  const { t } = useLanguage(); // 현재 언어에 맞는 번역 묶음을 가져옴
  const series = t.series; // series 섹션 번역만 짧게 참조함

  // panels/notes/actions/protagonist.tags 길이에 안전하게 모듈로 인덱싱하기 위해 length를 미리 변수화함
  const panelsLen = series.panels.length;
  const notesLen = series.notes.length;
  const actionsLen = series.actions.length;
  const tagsLen = series.protagonist.tags.length;

  const trendingCards = Array.from({ length: 5 }, (_, index) => ({
    rank: index + 1,
    title: series.panels[index % panelsLen].title,
    subtitle: series.protagonist.tags[index % tagsLen],
    image: rofanImages[index % rofanImages.length],
  })); // 인기 로판 카드 목록을 만듦 - 번역 데이터에 의존하므로 컴포넌트 안에서 계산함

  const shelfA = Array.from({ length: 6 }, (_, index) => ({
    title: series.panels[index % panelsLen].title,
    desc: series.panels[index % panelsLen].desc,
    image: rofanImages[index % rofanImages.length],
    tag: series.panels[index % panelsLen].tag,
  })); // 첫 번째 로판 큐레이션 카드 목록을 만듦

  const shelfB = Array.from({ length: 6 }, (_, index) => ({
    title: series.actions[index % actionsLen],
    desc: series.notes[index % notesLen].desc,
    image: rofanImages[(index + 1) % rofanImages.length],
    tag: series.notes[index % notesLen].label,
  })); // 두 번째 로판 큐레이션 카드 목록을 만듦

  return (
    <div className="relative isolate w-full overflow-hidden bg-[#fff8fc] text-[#6f4b67]"> {/* 로판 전용 시리즈 페이지 전체 영역이며 layout이 높이를 담당하므로 min-h-screen은 사용하지 않음 */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden"> {/* 로판 분위기의 배경 그라데이션과 빛 번짐을 깔아주는 영역임 */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff8fc_0%,#fff6fb_18%,#fff8fc_48%,#f8fbff_100%)]" />
        <div className="absolute left-[-185px] top-[-350px] h-[700px] w-[700px] rounded-full bg-[#ffd8ec] blur-[165px]" />
        <div className="absolute left-[15%] top-[-185px] h-[470px] w-[470px] rounded-full bg-[#fff8fc] blur-[130px]" />
        <div className="absolute right-[-185px] top-[-230px] h-[680px] w-[680px] rounded-full bg-[#eef9ff] blur-[165px]" />
        <div className="absolute bottom-[-120px] left-[14%] h-[340px] w-[340px] rounded-full bg-[#e7dcff] blur-[110px]" />
        <div className="absolute bottom-[-100px] right-[10%] h-[320px] w-[320px] rounded-full bg-[#dff4ff] blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,216,236,0.24),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(223,244,255,0.20),transparent_30%),radial-gradient(circle_at_18%_6%,rgba(231,220,255,0.18),transparent_28%)]" />
      </div>

      <div className="page-container relative z-10"> {/* 윙카디아 기존 페이지와 같은 가운데 컨테이너를 사용함 */}
        <section className="py-20 text-center sm:py-24"> {/* 상단 제목 영역임 */}
          <p className={`px-6 text-sm font-black uppercase leading-relaxed tracking-[0.24em] sm:text-base ${accentColorClass}`}>
            {series.brandLabel}
          </p>

          <h1 className="mx-auto mt-5 max-w-full break-keep px-6 text-display text-5xl font-black tracking-[0.05em] text-pink-gradient sm:text-6xl lg:text-7xl">
            {series.pageTitle}
          </h1>

          <p className={`mx-auto mt-7 max-w-4xl break-keep px-8 text-lg font-semibold leading-9 sm:text-xl ${bodyColorClass}`}>
            {series.pageDesc}
          </p>

          <div className="ornate-divider">♡</div>
        </section>

        <section className={`overflow-hidden rounded-[42px] border ${shellClass}`}> {/* 로판 대표 히어로 섹션임 */}
          <div className="grid min-w-0 gap-0 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[680px] min-w-0 overflow-hidden">
              <Image
                src={heroImage}
                alt="Royal fantasy hall hero"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 55vw"
                priority
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(255,250,252,0.94)_12%,rgba(255,250,252,0.34)_48%,rgba(255,250,252,0.08)_100%)]" />

              <div className="absolute left-0 right-0 top-8 flex min-w-0 flex-wrap gap-6 px-12 sm:gap-8 sm:px-14 lg:px-16"> {/* 상단 라벨 영역 전체에 좌우 패딩을 줘서 카드 안쪽으로 넣음 */}
                <span
                  className={`inline-flex max-w-full items-center justify-center rounded-full border px-8 py-3 text-center text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${chipClass}`}
                >
                  {series.hallName}
                </span>

                <span
                  className={`inline-flex max-w-full items-center justify-center rounded-full border px-8 py-3 text-center text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${softChipClass}`}
                >
                  {series.rofanOnly}
                </span>
              </div>

              <div className="absolute bottom-[64px] left-0 right-0 px-12 py-9 text-left sm:bottom-[76px] sm:px-14 sm:py-10 lg:bottom-[88px] lg:px-16 lg:py-12"> {/* 메인 히어로 텍스트와 버튼 영역 전체에 좌우 패딩을 줌 */}
                <p className={`max-w-full break-keep px-2 text-lg font-black uppercase leading-relaxed tracking-[0.14em] sm:text-xl lg:text-[24px] ${accentColorClass}`}>
                  {series.hero.eyebrow}
                </p>

                <div className="mt-7 flex min-w-0 flex-wrap gap-7 px-2 sm:gap-9">
                  <button
                    type="button"
                    className={`inline-flex min-h-[56px] items-center gap-3 rounded-full text-lg font-black leading-none transition sm:text-xl ${primaryButtonClass}`}
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      paddingTop: "16px",
                      paddingBottom: "16px",
                      minWidth: "120px",
                      justifyContent: "center",
                    }}
                  >
                    <Play size={22} fill="currentColor" className="shrink-0" />
                    <span className="whitespace-nowrap">{series.buttons.playNow}</span>
                  </button>

                  <button
                    type="button"
                    className={`inline-flex min-h-[56px] items-center gap-3 rounded-full text-lg font-black leading-none transition sm:text-xl ${primaryButtonClass}`}
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      paddingTop: "16px",
                      paddingBottom: "16px",
                      minWidth: "150px",
                      justifyContent: "center",
                    }}
                  >
                    <Sparkles size={22} className="shrink-0" />
                    <span className="whitespace-nowrap">{series.buttons.freeFirstEp}</span>
                  </button>

                  <button
                    type="button"
                    className={`inline-flex min-h-[56px] items-center justify-center rounded-full border text-lg font-black leading-none transition sm:text-xl ${secondaryButtonClass}`}
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      paddingTop: "16px",
                      paddingBottom: "16px",
                      minWidth: "100px",
                      justifyContent: "center",
                    }}
                  >
                    <span className="whitespace-nowrap">{series.buttons.trailer}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid min-w-0 gap-7 p-7 text-left md:grid-cols-2 xl:grid-cols-1 xl:p-8">
              <article className={`min-w-0 overflow-hidden rounded-[20px] border px-16 py-10 ${shellClass}`}> {/* 텍스트 전용 카드 - overflow-hidden은 텍스트가 박스 밖으로 튀어나오지 않도록 유지하고, radius를 padding의 안전 비율 이내(radius=20 < padding-top=40)로 낮춰 첫 줄 텍스트가 코너 클립 영역(y<20)을 벗어나도록 함 */}
                <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                  {series.ui.hallIdentity}
                </p>

                <h3 className={`mt-4 max-w-full break-keep text-2xl font-black leading-tight sm:text-3xl ${titleColorClass}`}>
                  {series.hallName}
                </h3>

                <p className={`mt-5 max-w-full break-keep text-base font-semibold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {series.hallDesc}
                </p>
              </article>

              <article className={`min-w-0 overflow-hidden rounded-[20px] border px-16 py-10 ${shellClass}`}> {/* 텍스트 전용 카드 - radius를 padding보다 충분히 작게 두어 첫 줄 텍스트가 코너 클립 영역 바깥에 위치하면서 텍스트는 박스 안에 안전하게 머무름 */}
                <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                  {series.ui.featuredCharacter}
                </p>

                <h3 className={`mt-4 max-w-full break-keep text-2xl font-black leading-tight sm:text-3xl ${titleColorClass}`}>
                  {series.protagonist.name}
                </h3>

                <p className={`mt-3 max-w-full break-keep text-base font-bold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {series.protagonist.role}
                </p>

                <p className={`mt-5 max-w-full break-keep text-base font-semibold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {series.protagonist.desc}
                </p>
              </article>

              <article className={`min-w-0 overflow-hidden rounded-[20px] border px-16 py-10 ${shellClass}`}> {/* 텍스트 전용 카드 - radius를 padding보다 충분히 작게 두어 첫 줄 텍스트가 코너 클립 영역 바깥에 위치하면서 텍스트는 박스 안에 안전하게 머무름 */}
                <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                  {series.ui.storyNote}
                </p>

                <p className={`mt-5 max-w-full break-keep text-base font-semibold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {series.hero.note}
                </p>

                <div className="mt-6 flex min-w-0 flex-wrap gap-5 sm:gap-6">
                  {series.protagonist.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex max-w-full items-center justify-center rounded-full border px-7 py-3 text-sm font-bold leading-relaxed ${chipClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="pt-14"> {/* 통계 카드 영역임 */}
          <div className="grid gap-8 md:grid-cols-3">
            {series.stats.map((stat) => (
              <article
                key={stat.label}
                className={`min-w-0 overflow-hidden rounded-[20px] border px-16 py-10 text-left backdrop-blur-xl ${shellClass}`}
              >
                <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                  {stat.label}
                </p>

                <h3 className={`mt-4 max-w-full text-5xl font-black leading-tight ${titleColorClass}`}>
                  {stat.value}
                </h3>

                <p className={`mt-5 max-w-full break-keep text-base font-semibold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {stat.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-14">
          <div className="mb-8 flex min-w-0 flex-wrap items-end justify-between gap-6 px-8">
            <h2 className={`max-w-full break-keep text-left text-3xl font-black leading-tight sm:text-4xl ${titleColorClass}`}>
              {series.continueLabel}
            </h2>

            <button type="button" className={`shrink-0 rounded-full border border-[#f6c8da] bg-white/72 px-10 py-3 text-base font-black ${accentColorClass}`}>
              {series.buttons.seeAll}
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {continueWatching.map((item, index) => (
              <article
                key={`${item.image}-${index}`}
                className={`min-w-0 overflow-hidden rounded-[32px] border ${shellClass}`}
              >
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${series.continueLabel} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 25vw"
                  />
                </div>

                <div className="px-10 py-6 text-left"> {/* 이어보기 진행률 글자도 카드 안쪽 패딩으로 넣음 */}
                  <div className="h-2.5 w-full rounded-full bg-black/10">
                    <div
                      className="h-2.5 rounded-full bg-[#f2a8cb]"
                      style={{ width: item.progress }}
                    />
                  </div>

                  <p className={`mt-4 max-w-full break-keep text-sm font-bold leading-relaxed ${bodyColorClass}`}>
                    {item.progress} {series.ui.watchedSuffix}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-14">
          <div className="mb-8 flex min-w-0 flex-wrap items-end justify-between gap-6 px-8">
            <h2 className={`max-w-full break-keep text-left text-3xl font-black leading-tight sm:text-4xl ${titleColorClass}`}>
              {series.trendingLabel}
            </h2>

            <button type="button" className={`shrink-0 rounded-full border border-[#f6c8da] bg-white/72 px-10 py-3 text-base font-black ${accentColorClass}`}>
              {series.buttons.seeRanking}
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {trendingCards.map((item) => (
              <article
                key={`${item.rank}-${item.title}`}
                className={`min-w-0 overflow-hidden rounded-[32px] border ${shellClass}`}
              >
                <div className="relative h-[320px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 20vw"
                  />

                  <div className="absolute left-8 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/86 text-xl font-black text-[#c76790] shadow-sm">
                    {item.rank}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-14">
          <div className="grid min-w-0 gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div className={`min-w-0 overflow-hidden rounded-[38px] border ${shellClass}`}>
              <div className={`h-full min-h-[460px] ${projectVisual} px-14 py-12 text-left`}> {/* 대표 작품 카드 안쪽 패딩을 크게 줌 */}
                <p className="text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] text-white/80 sm:text-xs">
                  {series.project.eyebrow}
                </p>

                <h2 className="mt-5 max-w-full break-keep text-4xl font-black leading-tight text-white sm:text-5xl">
                  {series.project.title}
                </h2>

                <p className="mt-6 max-w-3xl break-keep text-base font-semibold leading-relaxed text-white/78 sm:text-lg">
                  {series.project.desc}
                </p>

                <div className="mt-8 grid min-w-0 gap-5 sm:grid-cols-3">
                  {[
                    { label: series.ui.episode, value: series.project.episode },
                    { label: series.ui.status, value: series.project.status },
                    { label: series.ui.keyPoint, value: series.project.point },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="min-w-0 overflow-hidden rounded-[14px] border border-white/14 bg-black/20 px-9 py-5 text-white"
                    > {/* 텍스트 전용 inner 카드 - radius를 padding(px-7=28, py-5=20)의 절반 이하(14)로 두어 코너 클립 영역이 텍스트 영역까지 침범하지 못하게 함 */}
                      <p className="text-[10px] font-black uppercase leading-relaxed tracking-[0.06em] opacity-70">
                        {label}
                      </p>

                      <p className="mt-3 max-w-full break-keep text-sm font-bold leading-relaxed sm:text-base">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex min-w-0 flex-wrap gap-7 sm:gap-9">
                  <button
                    type="button"
                    className={`rounded-full px-12 py-4 text-base font-black transition ${primaryButtonClass}`}
                  >
                    {series.buttons.watchNow}
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-white/16 bg-black/20 px-12 py-4 text-base font-bold text-white/85 transition hover:bg-black/30"
                  >
                    {series.buttons.seeDetails}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid min-w-0 gap-7">
              {series.notes.map((note) => (
                <article
                  key={note.title}
                  className={`min-w-0 overflow-hidden rounded-[20px] border px-16 py-10 text-left backdrop-blur-xl ${shellClass}`}
                >
                  <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                    {series.editorLabel}
                  </p>

                  <h3 className={`mt-4 max-w-full break-keep text-2xl font-black leading-tight sm:text-3xl ${titleColorClass}`}>
                    {note.title}
                  </h3>

                  <p className={`mt-5 max-w-full break-keep text-base font-semibold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                    {note.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-14">
          <div className="mb-8 flex min-w-0 flex-wrap items-end justify-between gap-6 px-8">
            <h2 className={`max-w-full break-keep text-left text-3xl font-black leading-tight sm:text-4xl ${titleColorClass}`}>
              {series.shelfA}
            </h2>

            <button type="button" className={`shrink-0 rounded-full border border-[#f6c8da] bg-white/72 px-10 py-3 text-base font-black ${accentColorClass}`}>
              {series.buttons.seeMore}
            </button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {shelfA.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className={`min-w-0 overflow-hidden rounded-[32px] border ${shellClass}`}
              >
                <div className="relative h-[270px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 16vw"
                  />

                  <div className="absolute left-0 right-0 top-5 px-7"> {/* 포스터 위 라벨도 좌우 패딩으로 안쪽에 넣음 */}
                    <span className="inline-flex max-w-full rounded-full bg-white/86 px-5 py-2.5 text-[10px] font-black leading-relaxed text-[#c76790] shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-16 pt-14">
          <div className="mb-8 flex min-w-0 flex-wrap items-end justify-between gap-6 px-8">
            <h2 className={`max-w-full break-keep text-left text-3xl font-black leading-tight sm:text-4xl ${titleColorClass}`}>
              {series.shelfB}
            </h2>

            <button type="button" className={`shrink-0 rounded-full border border-[#f6c8da] bg-white/72 px-10 py-3 text-base font-black ${accentColorClass}`}>
              {series.buttons.seeAll}
            </button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {shelfB.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className={`min-w-0 overflow-hidden rounded-[32px] border ${shellClass}`}
              >
                <div className="relative h-[270px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 16vw"
                  />

                  <div className="absolute left-0 right-0 top-5 px-7"> {/* 포스터 위 라벨도 좌우 패딩으로 안쪽에 넣음 */}
                    <span className="inline-flex max-w-full rounded-full bg-white/86 px-5 py-2.5 text-[10px] font-black leading-relaxed text-[#c76790] shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
