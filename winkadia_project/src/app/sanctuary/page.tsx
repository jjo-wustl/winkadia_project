// src/app/sanctuary/page.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import Link from "next/link"; // 페이지 이동 버튼과 카드 링크를 만들기 위해 Link를 가져옴
import { ArrowRight, Heart, Play, Sparkles } from "lucide-react"; // 홈 화면에 사용할 장식 아이콘과 버튼 아이콘을 가져옴
import { useLanguage } from "@/contexts/LanguageContext"; // 현재 언어에 따라 한국어/영어 문구를 나누기 위해 언어 컨텍스트를 가져옴

const homeCopy = {
  ko: {
    badge: "팬들을 위한 꿈결 같은 안식처",
    titleLine1: "모든 판타지의 순간이 모이는 곳,",
    titleLine2: "윙카디아에 오신 것을",
    titleLine3: "환영합니다",
    desc: "윙카디아는 좋아하는 시리즈와 콘텐츠를 더 가깝게, 더 깊이 즐길 수 있는 꿈결 같은 OTT 팬 공간입니다",
    start: "시리즈 보러가기",
    about: "갤러리 보기",
    sectionTitle: "윙카디아의 추천 시리즈",
    sectionDesc: "특별한 이야기들을 지금 만나보세요",
    seeAll: "모든 시리즈 보기",
    footer: "당신의 판타지가, 여기에서 빛나기를",
  },
  en: {
    badge: "A dreamlike sanctuary for fans",
    titleLine1: "Where every fantasy moment gathers,",
    titleLine2: "welcome to",
    titleLine3: "Winkadia",
    desc: "Winkadia is a dreamy OTT fan space where you can enjoy beloved series and visual stories more closely and deeply",
    start: "View Series",
    about: "View Gallery",
    sectionTitle: "Recommended Series",
    sectionDesc: "Discover special stories curated for you",
    seeAll: "View All Series",
    footer: "May your fantasy shine here",
  },
}; // Home 화면에서 사용할 한국어/영어 고정 문구를 모아둠

const featuredSeries = [
  {
    titleKo: "황혼의 신전",
    titleEn: "Temple of Twilight",
    descKo: "해가 지는 순간, 신전의 비밀이 깨어난다",
    descEn: "When the sun sets, the secret of the sanctuary awakens",
    tagKo: "로맨스 판타지",
    tagEn: "Romance Fantasy",
    image: "/images/home/series-01.png",
    href: "/sanctuary/series",
  },
  {
    titleKo: "별이 머무는 밤",
    titleEn: "Night Where Stars Stay",
    descKo: "별빛이 흐르는 강가에서 시작되는 이야기",
    descEn: "A story begins beside a river filled with starlight",
    tagKo: "힐링 드라마",
    tagEn: "Healing Drama",
    image: "/images/home/series-02.png",
    href: "/sanctuary/series",
  },
  {
    titleKo: "왕관의 약속",
    titleEn: "Promise of the Crown",
    descKo: "잊혀진 약속 위에 피어나는 새로운 운명",
    descEn: "A new fate blooms above a forgotten promise",
    tagKo: "오리지널 스페셜",
    tagEn: "Original Special",
    image: "/images/home/series-03.png",
    href: "/sanctuary/series",
  },
]; // 추천 시리즈 카드에 표시할 임시 콘텐츠 목록임

export default function SanctuaryPage() { // 로그인 후 처음 보이는 윙카디아 Home 페이지 컴포넌트임
  const { lang } = useLanguage(); // 현재 선택된 언어 값을 가져옴
  const copy = lang === "ko" ? homeCopy.ko : homeCopy.en; // 현재 언어에 맞는 Home 문구를 선택함

  return (
    <div className="relative flex w-full justify-center text-[#32283d]"> {/* 보라빛 배경 안에서 홈 카드만 가운데 정렬하는 페이지 영역임 */}
      <div className="relative mx-auto w-full max-w-[1420px] overflow-hidden rounded-[42px] border border-white/80 bg-white/76 shadow-[0_30px_110px_rgba(120,82,166,0.20)] backdrop-blur-2xl"> {/* 보라빛 배경 안에 올라가는 큰 홈 화면 카드임 */}
        <section className="relative grid min-h-[560px] grid-cols-1 items-center gap-8 px-8 pb-12 pt-14 text-center sm:px-10 lg:grid-cols-[0.9fr_1.22fr] lg:px-16 lg:pb-10 lg:pt-14"> {/* 카드 상단 히어로 영역이며 왼쪽 문구와 오른쪽 이미지를 배치함 */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.28)_42%,_transparent_78%)]" /> {/* 카드 내부 상단에 밝은 빛 번짐을 추가함 */}

          <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center text-center lg:items-start lg:text-left"> {/* 히어로 왼쪽 문구 영역임 */}
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-[#e6d7fb] bg-white/78 px-5 py-2 text-[13px] font-semibold text-[#8b68d8] shadow-[0_8px_24px_rgba(137,104,216,0.12)]"> {/* 작은 소개 배지임 */}
              <Sparkles size={15} />
              <span>{copy.badge}</span>
            </div>

            <h1 className="break-keep text-center text-[36px] font-black leading-[1.42] tracking-[-0.04em] text-[#30283b] sm:text-[46px] lg:text-left lg:text-[50px]"> {/* Home 메인 타이틀임 */}
              {copy.titleLine1}
              <br />
              <span className="text-[#8b68d8]">{copy.titleLine2}</span>
              <br />
              {copy.titleLine3}
              <Heart className="ml-2 inline-block translate-y-1 text-[#9b78e5]" size={34} />
            </h1>

            <p className="mx-auto mt-6 max-w-[390px] break-keep text-center text-[15px] font-medium leading-[1.9] text-[#7b7284] lg:mx-0 lg:text-left"> {/* Home 소개 설명 문구임 */}
              {copy.desc}
            </p>

            <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"> {/* 히어로 버튼 영역임 */}
              <Link
                href="/sanctuary/series"
                className="inline-flex h-[54px] min-w-[188px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f67d8] to-[#7750c8] px-7 text-[15px] font-bold text-white shadow-[0_14px_32px_rgba(123,86,201,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(123,86,201,0.38)]"
              > {/* Series 페이지로 이동하는 주요 버튼임 */}
                <Sparkles size={18} />
                <span>{copy.start}</span>
              </Link>

              <Link
                href="/sanctuary/gallery"
                className="inline-flex h-[54px] min-w-[188px] items-center justify-center gap-2 rounded-full border border-[#b99ce8] bg-white/62 px-7 text-[15px] font-bold text-[#8b68d8] shadow-[0_10px_26px_rgba(137,104,216,0.12)] transition hover:-translate-y-0.5 hover:bg-white"
              > {/* Gallery 페이지로 이동하는 보조 버튼임 */}
                <Heart size={19} />
                <span>{copy.about}</span>
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex w-full items-center justify-center lg:justify-end"> {/* 히어로 오른쪽 이미지 영역임 */}
            <img
              src="/images/home/home-hero.png"
              alt=""
              className="relative z-10 w-full max-w-[780px] select-none object-contain drop-shadow-[0_26px_68px_rgba(126,91,173,0.20)]"
            /> {/* 오른쪽에 들어가는 성전, 여자, 고양이 히어로 이미지임 */}
          </div>
        </section>

        <section className="relative mx-auto mb-10 w-[86%] rounded-[30px] border border-[#ecdff9] bg-white/80 px-5 py-7 text-center shadow-[0_18px_60px_rgba(126,91,173,0.13)] sm:px-8 lg:px-10"> {/* 추천 시리즈 전체 카드 박스임 */}
          <div className="mb-7 flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"> {/* 추천 시리즈 제목과 전체 보기 버튼 영역임 */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-5">
              <h2 className="text-[24px] font-black tracking-[-0.03em] text-[#8b68d8] sm:text-[28px]">
                {copy.sectionTitle}
                <Sparkles className="ml-2 inline-block translate-y-0.5" size={20} />
              </h2>

              <p className="text-[13px] font-semibold text-[#8d8397]">
                {copy.sectionDesc}
              </p>
            </div>

            <Link
              href="/sanctuary/series"
              className="mx-auto inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full border border-[#b99ce8] bg-white/70 px-5 text-[13px] font-bold text-[#8b68d8] transition hover:bg-white sm:mx-0"
            > {/* 모든 시리즈 페이지로 이동하는 버튼임 */}
              <span>{copy.seeAll}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3"> {/* 추천 시리즈 카드들을 3열로 배치함 */}
            {featuredSeries.map((item) => {
              const title = lang === "ko" ? item.titleKo : item.titleEn; // 현재 언어에 맞는 카드 제목을 선택함
              const desc = lang === "ko" ? item.descKo : item.descEn; // 현재 언어에 맞는 카드 설명을 선택함
              const tag = lang === "ko" ? item.tagKo : item.tagEn; // 현재 언어에 맞는 카드 태그를 선택함

              return (
                <Link
                  key={item.titleEn}
                  href={item.href}
                  className="group overflow-hidden rounded-[22px] border border-[#eee4f7] bg-white text-left shadow-[0_12px_34px_rgba(105,76,148,0.12)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(105,76,148,0.18)]"
                > {/* 추천 시리즈 하나를 보여주는 카드 링크임 */}
                  <div className="relative h-[190px] overflow-hidden"> {/* 카드 이미지가 들어가는 영역임 */}
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    /> {/* 카드 대표 이미지를 표시함 */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" /> {/* 이미지 위에 은은한 하단 그라데이션을 얹음 */}

                    <span className="absolute bottom-4 left-4 rounded-full bg-[#e8d8ff]/90 px-3 py-1 text-[12px] font-bold text-[#7b5ac8]">
                      {tag}
                    </span> {/* 카드 장르 태그임 */}

                    <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/42 text-white shadow-[0_8px_26px_rgba(54,38,84,0.22)] backdrop-blur-md transition group-hover:scale-110">
                      <Play size={21} fill="currentColor" />
                    </span> {/* 영상 재생 느낌을 주는 플레이 버튼임 */}
                  </div>

                  <div className="flex min-h-[116px] items-start justify-between gap-4 px-5 py-4"> {/* 카드 텍스트 영역의 높이를 맞춤 */}
                    <div>
                      <h3 className="text-[18px] font-black tracking-[-0.03em] text-[#32283d]">
                        {title}
                      </h3>

                      <p className="mt-1 text-[13px] font-medium leading-[1.6] text-[#83798d]">
                        {desc}
                      </p>
                    </div>

                    <Heart className="mt-2 shrink-0 text-[#b79bea]" size={24} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="relative px-6 pb-10 pt-3 text-center"> {/* Home 카드 내부 하단 문구 영역임 */}
          <p className="break-keep text-center text-[20px] font-black tracking-[0.04em] text-[#8b68d8] sm:text-[24px]">
            {copy.footer}
            <Heart className="ml-2 inline-block translate-y-1" size={22} />
          </p>

          <p className="mt-4 text-center text-xs font-semibold text-[#b3a7c3]">
            © 2025 Winkadia. 모든 운명은 보호받고 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}