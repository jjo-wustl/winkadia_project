// src/app/sanctuary/series/page.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import Image from "next/image"; // Next.js 이미지 최적화 컴포넌트를 사용하기 위해 가져옴
import { Play, Sparkles } from "lucide-react"; // 로판 시리즈 페이지 버튼 아이콘을 표시하기 위해 가져옴

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

const rofanData = {
  brandLabel: "Winkadia Original",
  pageTitle: "Romance Fantasy Series",
  pageDesc:
    "황궁의 긴장감, 정략으로 얽힌 관계, 비밀을 숨긴 인물들까지. 윙카디아의 로판 시리즈만 모아 보여주는 프리미엄 시리즈 공간입니다",
  hallName: "Romance Fantasy Hall",
  hallDesc:
    "황궁의 권력과 감정선이 함께 흐르는 로맨스 판타지 전용 상영관입니다. 화려한 세계관 속에서도 가장 오래 남는 건 결국 인물의 선택과 흔들리는 마음입니다",
  continueLabel: "궁정 드라마 이어보기",
  trendingLabel: "지금 가장 주목받는 궁정 드라마",
  shelfA: "오늘의 황궁 드라마",
  shelfB: "관계선이 강한 드라마",
  editorLabel: "황궁 드라마 하이라이트",
  hero: {
    eyebrow: "Romance Fantasy Selection",
    note: "화려한 세계관 속에서 시작되는 가장 치명적인 관계",
  },
  protagonist: {
    name: "세라핀 벨루아",
    role: "몰락 직전 공작가의 장녀",
    desc:
      "가문을 지키기 위해 감정보다 판단을 먼저 배운 인물. 누구보다 냉정해 보이지만, 끝내 자기 사람을 버리지 못하는 약점이 그녀를 더 위험하게 만듭니다",
    tags: ["궁정 서사", "정략 관계", "감정 절제"],
  },
  stats: [
    {
      label: "Weekly Uploads",
      value: "124",
      desc: "이번 주 새롭게 공개된 로판 작품",
    },
    {
      label: "Shortlisted",
      value: "18",
      desc: "특별 추천으로 선정된 작품",
    },
    {
      label: "Mood Boards",
      value: "39",
      desc: "세계관 무드와 감정선이 돋보이는 큐레이션",
    },
  ],
  project: {
    eyebrow: "Featured Title",
    title: "The Contract of Winter Rose",
    desc:
      "서로를 믿을 수 없는 관계로 시작했지만, 가장 위태로운 순간마다 서로를 먼저 떠올리게 되는 이야기. 권력과 감정이 동시에 흔들리는 궁정 로맨스의 매력을 가장 잘 보여주는 대표 작품입니다",
    episode: "EP 06 · 가면무도회 직전",
    status: "지금 가장 많이 주목받는 회차",
    point: "계약으로 시작된 관계가 운명처럼 뒤틀리는 순간",
    visual:
      "bg-[linear-gradient(135deg,#271634_0%,#61356f_55%,#d7789d_100%)]",
  },
  notes: [
    {
      label: "Highlight",
      title: "차가운 계약이 진심으로 바뀌기 시작하는 순간",
      desc:
        "겉으로는 아무 일도 없지만, 단 한 번의 시선으로 관계의 공기가 달라지는 장면이 있습니다. 로판의 매력은 바로 그런 미묘한 변화에 있습니다",
    },
    {
      label: "Must See",
      title: "드레스보다 더 강하게 남는 건 결국 감정입니다",
      desc:
        "화려한 배경과 장식 속에서도 가장 오래 기억에 남는 건 인물의 표정과 선택입니다. 그래서 이 작품은 더 깊게 빠져들게 만듭니다",
    },
  ],
  panels: [
    {
      tag: "Tone Design",
      title: "궁정 텐션 보드",
      desc:
        "권력과 로맨스가 동시에 흐르는 장면들을 모은 큐레이션. 긴장감과 설렘이 한 화면 안에 공존합니다",
    },
    {
      tag: "Character Depth",
      title: "감정선 배치",
      desc:
        "설명보다 눈빛이 먼저 말해주는 관계들. 인물의 감정이 가장 섬세하게 드러나는 장면을 중심으로 소개합니다",
    },
    {
      tag: "Release Setup",
      title: "대표 컷 선별",
      desc:
        "첫 장면만으로도 로판 특유의 무드가 느껴지는 작품들을 모았습니다. 세계관과 감정을 동시에 보여주는 대표 비주얼 큐레이션입니다",
    },
  ],
  actions: [
    "신규 로판 작품 등록",
    "궁정 무드보드 열기",
    "대표 장면 큐레이션",
    "캐릭터 관계축 편집",
  ],
}; // 로판 전용 시리즈 페이지에서 사용할 고정 콘텐츠 데이터임

const heroImage = rofanImages[0]; // 히어로 영역에 사용할 첫 번째 대표 이미지임

const continueWatching = rofanImages.slice(0, 4).map((image, index) => ({
  image,
  progress: progressValues[index % progressValues.length],
})); // 이어보기는 요청대로 4개만 보여줌

const trendingCards = Array.from({ length: 5 }, (_, index) => ({
  rank: index + 1,
  title: rofanData.panels[index % rofanData.panels.length].title,
  subtitle: rofanData.protagonist.tags[index % rofanData.protagonist.tags.length],
  image: rofanImages[index % rofanImages.length],
})); // 인기 로판 카드 목록을 만듦

const shelfA = Array.from({ length: 6 }, (_, index) => ({
  title: rofanData.panels[index % rofanData.panels.length].title,
  desc: rofanData.panels[index % rofanData.panels.length].desc,
  image: rofanImages[index % rofanImages.length],
  tag: rofanData.panels[index % rofanData.panels.length].tag,
})); // 첫 번째 로판 큐레이션 카드 목록을 만듦

const shelfB = Array.from({ length: 6 }, (_, index) => ({
  title: rofanData.actions[index % rofanData.actions.length],
  desc: rofanData.notes[index % rofanData.notes.length].desc,
  image: rofanImages[(index + 1) % rofanImages.length],
  tag: rofanData.notes[index % rofanData.notes.length].label,
})); // 두 번째 로판 큐레이션 카드 목록을 만듦

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

export default function SeriesPage() { // 윙카디아 Series 페이지이며 로판 시리즈만 보여줌
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
            {rofanData.brandLabel}
          </p>

          <h1 className="mx-auto mt-5 max-w-full break-keep px-6 text-display text-5xl font-black tracking-[0.05em] text-pink-gradient sm:text-6xl lg:text-7xl">
            {rofanData.pageTitle}
          </h1>

          <p className={`mx-auto mt-7 max-w-4xl break-keep px-8 text-lg font-semibold leading-9 sm:text-xl ${bodyColorClass}`}>
            {rofanData.pageDesc}
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
                  {rofanData.hallName}
                </span>

                <span
                  className={`inline-flex max-w-full items-center justify-center rounded-full border px-8 py-3 text-center text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${softChipClass}`}
                >
                  Rofan Only
                </span>
              </div>

              <div className="absolute bottom-[64px] left-0 right-0 px-12 py-9 text-left sm:bottom-[76px] sm:px-14 sm:py-10 lg:bottom-[88px] lg:px-16 lg:py-12"> {/* 메인 히어로 텍스트와 버튼 영역 전체에 좌우 패딩을 줌 */}
                <p className={`max-w-full break-keep px-2 text-lg font-black uppercase leading-relaxed tracking-[0.14em] sm:text-xl lg:text-[24px] ${accentColorClass}`}>
                  {rofanData.hero.eyebrow}
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
                    <span className="whitespace-nowrap">지금 재생</span>
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
                    <span className="whitespace-nowrap">1화 무료 보기</span>
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
                    <span className="whitespace-nowrap">예고편 보기</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid min-w-0 gap-7 p-7 text-left md:grid-cols-2 xl:grid-cols-1 xl:p-8">
              <article className={`min-w-0 overflow-hidden rounded-[32px] border px-12 py-8 ${shellClass}`}> {/* 카드 안쪽 전체 좌우 패딩을 줌 */}
                <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                  Hall Identity
                </p>

                <h3 className={`mt-4 max-w-full break-keep text-2xl font-black leading-tight sm:text-3xl ${titleColorClass}`}>
                  {rofanData.hallName}
                </h3>

                <p className={`mt-5 max-w-full break-keep text-base font-semibold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {rofanData.hallDesc}
                </p>
              </article>

              <article className={`min-w-0 overflow-hidden rounded-[32px] border px-12 py-8 ${shellClass}`}> {/* 카드 안쪽 전체 좌우 패딩을 줌 */}
                <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                  Featured Character
                </p>

                <h3 className={`mt-4 max-w-full break-keep text-2xl font-black leading-tight sm:text-3xl ${titleColorClass}`}>
                  {rofanData.protagonist.name}
                </h3>

                <p className={`mt-3 max-w-full break-keep text-base font-bold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {rofanData.protagonist.role}
                </p>

                <p className={`mt-5 max-w-full break-keep text-base font-semibold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {rofanData.protagonist.desc}
                </p>
              </article>

              <article className={`min-w-0 overflow-hidden rounded-[32px] border px-12 py-8 ${shellClass}`}> {/* 카드 안쪽 전체 좌우 패딩을 줌 */}
                <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                  Story Note
                </p>

                <p className={`mt-5 max-w-full break-keep text-base font-semibold leading-relaxed sm:text-lg ${bodyColorClass}`}>
                  {rofanData.hero.note}
                </p>

                <div className="mt-6 flex min-w-0 flex-wrap gap-5 sm:gap-6">
                  {rofanData.protagonist.tags.map((tag) => (
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
            {rofanData.stats.map((stat) => (
              <article
                key={stat.label}
                className={`min-w-0 overflow-hidden rounded-[32px] border px-12 py-8 text-left backdrop-blur-xl ${shellClass}`}
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
              {rofanData.continueLabel}
            </h2>

            <button type="button" className={`shrink-0 rounded-full border border-[#f6c8da] bg-white/72 px-10 py-3 text-base font-black ${accentColorClass}`}>
              전체 보기
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
                    alt={`${rofanData.continueLabel} ${index + 1}`}
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
                    {item.progress} watched
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-14">
          <div className="mb-8 flex min-w-0 flex-wrap items-end justify-between gap-6 px-8">
            <h2 className={`max-w-full break-keep text-left text-3xl font-black leading-tight sm:text-4xl ${titleColorClass}`}>
              {rofanData.trendingLabel}
            </h2>

            <button type="button" className={`shrink-0 rounded-full border border-[#f6c8da] bg-white/72 px-10 py-3 text-base font-black ${accentColorClass}`}>
              순위 보기
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
              <div className={`h-full min-h-[460px] ${rofanData.project.visual} px-14 py-12 text-left`}> {/* 대표 작품 카드 안쪽 패딩을 크게 줌 */}
                <p className="text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] text-white/80 sm:text-xs">
                  {rofanData.project.eyebrow}
                </p>

                <h2 className="mt-5 max-w-full break-keep text-4xl font-black leading-tight text-white sm:text-5xl">
                  {rofanData.project.title}
                </h2>

                <p className="mt-6 max-w-3xl break-keep text-base font-semibold leading-relaxed text-white/78 sm:text-lg">
                  {rofanData.project.desc}
                </p>

                <div className="mt-8 grid min-w-0 gap-5 sm:grid-cols-3">
                  {[
                    { label: "Episode", value: rofanData.project.episode },
                    { label: "Status", value: rofanData.project.status },
                    { label: "Key Point", value: rofanData.project.point },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="min-w-0 overflow-hidden rounded-[24px] border border-white/14 bg-black/20 px-7 py-5 text-white"
                    >
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
                    지금 감상하기
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-white/16 bg-black/20 px-12 py-4 text-base font-bold text-white/85 transition hover:bg-black/30"
                  >
                    상세 정보 보기
                  </button>
                </div>
              </div>
            </div>

            <div className="grid min-w-0 gap-7">
              {rofanData.notes.map((note) => (
                <article
                  key={note.title}
                  className={`min-w-0 overflow-hidden rounded-[34px] border px-12 py-8 text-left backdrop-blur-xl ${shellClass}`}
                >
                  <p className={`text-[11px] font-black uppercase leading-relaxed tracking-[0.08em] sm:text-xs ${accentColorClass}`}>
                    {rofanData.editorLabel}
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
              {rofanData.shelfA}
            </h2>

            <button type="button" className={`shrink-0 rounded-full border border-[#f6c8da] bg-white/72 px-10 py-3 text-base font-black ${accentColorClass}`}>
              더 보기
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
              {rofanData.shelfB}
            </h2>

            <button type="button" className={`shrink-0 rounded-full border border-[#f6c8da] bg-white/72 px-10 py-3 text-base font-black ${accentColorClass}`}>
              전체 보기
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