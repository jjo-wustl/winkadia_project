// src/app/sanctuary/page.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useEffect, useMemo, useState } from "react"; // 추천 시리즈 영상의 썸네일 URL을 비동기로 받아오기 위해 사용함
import Link from "next/link"; // 페이지 이동 버튼과 카드 링크를 만들기 위해 Link를 가져옴
import { ArrowRight, Heart, Play, Sparkles } from "lucide-react"; // 홈 화면에 사용할 장식 아이콘과 버튼 아이콘을 가져옴
import { useLanguage } from "@/contexts/LanguageContext"; // 현재 언어에 따라 한국어/영어 문구를 나누기 위해 언어 컨텍스트를 가져옴
import { seriesVideos, type SeriesVideoItem } from "@/data/series-videos"; // Series 페이지와 같은 영상 데이터를 추천 시리즈에도 사용하기 위해 가져옴
import { seriesIPs } from "@/data/series-ips"; // 카드 태그/설명에 사용할 IP 메타데이터를 가져옴
import { getStorageUrlCached } from "@/lib/thumbnail-cache"; // 모듈 레벨 캐시가 적용된 썸네일 URL 발급 함수 (재방문/페이지 이동 시 재발급 X + 이미지 바이트 자동 프리로드)

// 추천 시리즈 카드에 표시할 데이터 타입(영상 정보 + 채워진 썸네일 URL)임
type FeaturedFilm = SeriesVideoItem & { thumbnailUrl: string };

const homeCopy = {
  ko: {
    badge: "윙카디아 신전",
    titleLine1: "모든 판타지의 순간이 모이는 곳,",
    titleLine2: "윙카디아에 오신 것을",
    titleLine3: "환영합니다",
    desc: "윙카디아는 좋아하는 시리즈와 콘텐츠를\n더 가깝게, 더 깊이 즐길 수 있는\n꿈결 같은 OTT 공간입니다",
    start: "시리즈 보러가기",
    about: "갤러리 보기",
    sectionTitle: "윙카디아의 추천 시리즈",
    sectionDesc: "특별한 이야기들을 지금 만나보세요",
    seeAll: "모든 시리즈 보기",
    footer: "당신의 판타지가, 여기에서 빛나기를",
  },
  en: {
    badge: "Winkadia Sanctuary",
    titleLine1: "Where every fantasy moment gathers,",
    titleLine2: "welcome to",
    titleLine3: "Winkadia",
    desc: "Winkadia is a dreamy OTT fan space,\nwhere you can enjoy beloved series and visual stories more closely and deeply",
    start: "View Series",
    about: "View Gallery",
    sectionTitle: "Recommended Series",
    sectionDesc: "Discover special stories curated for you",
    seeAll: "View All Series",
    footer: "May your fantasy shine here",
  },
}; // Home 화면에서 사용할 한국어/영어 고정 문구를 모아둠

export default function SanctuaryPage() { // 로그인 후 처음 보이는 윙카디아 Home 페이지 컴포넌트임
  const { lang } = useLanguage(); // 현재 선택된 언어 값을 가져옴
  const copy = lang === "ko" ? homeCopy.ko : homeCopy.en; // 현재 언어에 맞는 Home 문구를 선택함

  // 추천 시리즈로 표시할 16:9 영상 목록 - Series 페이지와 동일한 데이터(seriesVideos) 에서 가져옴
  const [films, setFilms] = useState<FeaturedFilm[]>([]);
  const [isFilmsLoading, setIsFilmsLoading] = useState(true);

  useEffect(() => {
    // 16:9 (Films) 비율 영상만 필터링하여 추천 카드에 노출함
    const filmVideos = seriesVideos.filter((v) => v.aspectRatio === "16:9");

    // Storage Rules 가 이미지(.png/.jpg/.webp 등) 의 인증 사용자 read 만 허용하므로,
    // 영상 URL은 받아오지 않고 카드 노출용 썸네일 URL만 가져옴 (영상 재생은 Watch 페이지에서 서명 URL 사용)
    Promise.all(
      filmVideos.map(async (video) => ({
        ...video,
        thumbnailUrl: await getStorageUrlCached(video.thumbnailPath),
      })),
    )
      .then((result) => setFilms(result))
      .finally(() => setIsFilmsLoading(false));
  }, []);

  // ipId -> IP 메타데이터 매핑을 미리 만들어 카드 렌더링 시 O(1) 조회되게 함
  const ipById = useMemo(() => {
    const map = new Map<string, (typeof seriesIPs)[number]>();
    for (const ip of seriesIPs) map.set(ip.id, ip);
    return map;
  }, []);

  return (
    <div className="relative flex w-full justify-center text-[#32283d]"> {/* 보라빛 배경 안에서 홈 카드만 가운데 정렬하는 페이지 영역임 */}
      <div className="relative mx-auto w-full max-w-[1420px] overflow-hidden rounded-[42px] border border-white/80 bg-white/76 shadow-[0_30px_110px_rgba(120,82,166,0.20)] backdrop-blur-2xl"> {/* 보라빛 배경 안에 올라가는 큰 홈 화면 카드임 */}
        <section className="relative grid min-h-[620px] grid-cols-1 items-center gap-8 px-8 pb-14 pt-16 text-center sm:px-10 lg:grid-cols-[1.22fr_0.95fr] lg:px-16 lg:pb-12 lg:pt-16"> {/* 카드 상단 히어로 영역이며 글씨 크기에 맞춰 높이와 좌우 비율을 조정함 */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.28)_42%,_transparent_78%)]" /> {/* 카드 내부 상단에 밝은 빛 번짐을 추가함 */}

          <img
            src="/images/home/hero-back2.png"
            alt=""
            className="pointer-events-none absolute left-[-5%] top-[-9%] z-[1] w-[26%] max-w-[620px] select-none object-contain opacity-72 drop-shadow-[0_18px_44px_rgba(126,91,173,0.14)] sm:left-[-4%] sm:top-[-10%] sm:w-[40%] lg:left-[-3%] lg:top-[-11%] lg:w-[40%]"
          /> {/* 두 번째 배경 이미지를 홈 카드 전체 기준 왼쪽 상단 모서리에 작게 배치함 */}

          <div className="relative z-10 flex w-full max-w-[840px] flex-col items-center text-center lg:translate-x-[96px] lg:items-start lg:text-left"> {/* 글씨가 커진 만큼 히어로 왼쪽 문구 영역의 폭을 넓히고 위치를 조정함 */}
            <div className="mb-7 inline-flex items-center justify-center gap-2 rounded-full border border-[#e6d7fb] bg-white/78 px-6 py-2.5 text-[17px] font-semibold text-[#8b68d8] shadow-[0_8px_24px_rgba(137,104,216,0.12)]"> {/* 작은 소개 배지 글씨를 키움 */}
              <Sparkles size={17} />
              <span>{copy.badge}</span>
            </div>

            <h1 className="break-keep text-center text-[42px] font-black leading-[1.34] tracking-[-0.04em] text-[#30283b] sm:text-[54px] lg:text-left lg:text-[60px]"> {/* Home 메인 타이틀 글씨를 전체적으로 키움 */}
              {copy.titleLine1}
              <br />
              {lang === "ko" ? (
                <>
                  <span className="inline-block text-[1.16em] text-[#8b68d8]">
                    윙카디아
                  </span>
                  에 오신 것을
                </>
              ) : (
                <span className="text-[#8b68d8]">{copy.titleLine2}</span>
              )}
              <br />
              {copy.titleLine3}
              <Heart className="ml-2 inline-block translate-y-1 text-[#9b78e5]" size={42} />
            </h1>

            <div className="h-[16px] lg:h-[18px]" /> {/* 환영합니다 아래에 강제로 여백을 만듦 */}

            <p className="relative left-[5px] mx-auto max-w-[760px] whitespace-pre-line break-keep text-center text-[22px] font-medium leading-[1.9] text-[#7b7284] lg:mx-0 lg:text-left"> {/* 설명 문구를 크게 키우고 3줄 줄바꿈을 유지함 */}
              {copy.desc}
            </p>

            <div className="h-[30px] lg:h-[38px]" /> {/* 설명 문구와 버튼 사이에 강제로 여백을 만듦 */}

            <div className="mt-0 flex w-full flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"> {/* 히어로 버튼 영역임 */}
              <Link
                href="/sanctuary/series"
                className="inline-flex h-[64px] min-w-[220px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#8f67d8] to-[#7750c8] px-8 text-[21px] font-bold text-white shadow-[0_14px_32px_rgba(123,86,201,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(123,86,201,0.38)]"
              > {/* Series 페이지로 이동하는 주요 버튼이며 글씨와 버튼 크기를 키움 */}
                <Sparkles size={22} />
                <span>{copy.start}</span>
              </Link>

              <Link
                href="/sanctuary/gallery"
                className="inline-flex h-[64px] min-w-[220px] items-center justify-center gap-2.5 rounded-full border border-[#b99ce8] bg-white/62 px-8 text-[21px] font-bold text-[#8b68d8] shadow-[0_10px_26px_rgba(137,104,216,0.12)] transition hover:-translate-y-0.5 hover:bg-white"
              > {/* Gallery 페이지로 이동하는 보조 버튼이며 글씨와 버튼 크기를 키움 */}
                <Heart size={22} />
                <span>{copy.about}</span>
              </Link>
            </div>
          </div>

          <div className="relative z-[1] flex min-h-[420px] w-full items-center justify-center overflow-visible lg:min-h-[540px] lg:justify-end"> {/* 히어로 오른쪽 이미지와 첫 번째 배경 이미지를 겹쳐 배치하는 영역임 */}
            <img
              src="/images/home/hero-back1.png"
              alt=""
              className="pointer-events-none absolute left-[-12%] top-[-12%] z-0 w-[112%] scale-[1.30] max-w-[1280px] select-none object-contain opacity-80 drop-shadow-[0_22px_54px_rgba(126,91,173,0.14)] sm:left-[-14%] sm:top-[-14%] sm:w-[124%] lg:left-[-36%] lg:top-[-10%] lg:w-[140%]"
            /> {/* 여자와 고양이 뒤에 깔리는 첫 번째 배경 이미지를 화면 크기별 기준에 맞춰 왼쪽 위로 자연스럽게 배치함 */}

            <img
              src="/images/home/home-hero.png"
              alt=""
              className="relative z-10 w-full max-w-[780px] -translate-x-[140px] scale-[1.50] select-none object-contain drop-shadow-[0_26px_68px_rgba(126,91,173,0.20)]"
            /> {/* 오른쪽에 들어가는 성전, 여자, 고양이 히어로 이미지임 */}
          </div>
        </section>

        <div className="relative z-[20] flex w-full justify-center px-5 sm:px-8 lg:px-8"> {/* 추천 시리즈 박스 자체를 홈 카드 가운데에 배치하는 래퍼임 */}
          <section className="mb-12 w-full max-w-[1320px] rounded-[34px] border border-[#ecdff9] bg-white/80 px-8 py-10 text-center shadow-[0_18px_60px_rgba(126,91,173,0.13)] sm:px-10 lg:px-12"> {/* 추천 시리즈 전체 카드 박스의 최대 폭을 넓혀 카드와 라벨이 덜 답답하게 보이게 함 */}
            <div className="mb-10 flex flex-col gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"> {/* 추천 시리즈 제목과 전체 보기 버튼 영역에 여백을 더 줌 */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
                <h2 className="text-[32px] font-black tracking-[-0.03em] text-[#8b68d8] sm:text-[38px] lg:translate-x-[28px]">
                  {copy.sectionTitle}
                  <Sparkles className="ml-2 inline-block translate-y-0.5" size={26} />
                </h2>
              </div>

              <Link
                href="/sanctuary/series"
                className="mx-auto inline-flex h-[44px] lg:translate-x-[-28px] w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-[#b99ce8] bg-white/70 text-[18px] font-bold text-[#8b68d8] transition hover:bg-white sm:mx-0"
                style={{ paddingLeft: "38px", paddingRight: "38px" }}
              > {/* 모든 시리즈 보기 버튼은 글자 수에 맞게 두고 좌우 여백만 넉넉하게 줌 */}
                <span>{copy.seeAll}</span>
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="mx-auto flex w-full max-w-[1280px] translate-x-[17px] flex-wrap justify-center gap-8 "> {/* 추천 시리즈 카드 묶음을 넓힌 공간 안에서 가운데 정렬함 */}
              {isFilmsLoading ? (
                // 썸네일 로딩 중일 때 보여줄 미니멀 안내 영역 (빈 카드 줄어들기 방지)
                <div className="flex min-h-[280px] w-full items-center justify-center text-[16px] font-bold text-[#9a7c92]">
                  {lang === "ko" ? "영상을 불러오는 중..." : "Loading videos..."}
                </div>
              ) : films.length === 0 ? (
                <div className="flex min-h-[280px] w-full items-center justify-center text-[16px] font-bold text-[#9a7c92]">
                  {lang === "ko" ? "표시할 추천 시리즈가 없습니다." : "No recommended series available."}
                </div>
              ) : (
                films.map((video) => {
                  const title = video.title[lang] ?? video.title.ko; // 현재 언어에 맞는 영상 제목
                  const ip = ipById.get(video.ipId); // 영상이 속한 IP 메타데이터 (태그/설명에 사용)
                  const tag = ip ? ip.name[lang] ?? ip.name.ko : ""; // 카드 태그로 IP 이름 사용 (예: "Winkadia Original")
                  const desc = ip ? ip.description[lang] ?? ip.description.ko : ""; // 카드 설명으로 IP 설명 사용

                  return (
                    <Link
                      key={video.id}
                      href={`/sanctuary/watch/${video.id}`}
                      className="group w-full max-w-[400px] overflow-hidden rounded-[28px] border border-[#eee4f7] bg-white text-left shadow-[0_12px_34px_rgba(105,76,148,0.12)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(105,76,148,0.18)] sm:w-[400px]"
                    > {/* 추천 시리즈 하나를 보여주는 카드 링크이며 클릭 시 Watch 페이지로 이동 */}
                      <div className="relative h-[240px] overflow-hidden"> {/* 카드 이미지 영역 (16:9 영상의 썸네일) */}
                        <img
                          src={video.thumbnailUrl}
                          alt={title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        /> {/* Firebase Storage 에서 받아온 썸네일 표시 */}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" /> {/* 이미지 위에 은은한 하단 그라데이션을 얹음 */}

                        <span
                          className="absolute bottom-5 left-5 inline-flex h-[34px] w-auto items-center justify-center whitespace-nowrap rounded-full bg-[#e8d8ff]/90 py-1 text-center text-[15px] font-bold text-[#7b5ac8] shadow-[0_6px_18px_rgba(91,63,135,0.12)]"
                          style={{ paddingLeft: "30px", paddingRight: "30px" }}
                        > {/* IP 이름을 카드 태그로 표시 */}
                          {tag}
                        </span>

                        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/42 text-white shadow-[0_8px_26px_rgba(54,38,84,0.22)] backdrop-blur-md transition group-hover:scale-110">
                          <Play size={25} fill="currentColor" />
                        </span> {/* 영상 재생 느낌을 주는 플레이 버튼 */}
                      </div>

                      <div className="flex min-h-[170px] items-start justify-between gap-6 px-9 py-8"> {/* 카드 안쪽 글씨 영역 - 좌우/위아래 여백을 넉넉하게 줌 */}
                        <div className="pr-2">
                          <h3 className="text-[25px] font-black tracking-[-0.03em] text-[#32283d] lg:translate-x-[10px]">
                            {title}
                          </h3>

                          <p className="mt-3 text-[18px] font-medium leading-[1.75] text-[#83798d] lg:translate-x-[10px]">
                            {desc}
                          </p>
                        </div>

                        <Heart className="mt-2 shrink-0 text-[#b79bea]" size={32} />
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}