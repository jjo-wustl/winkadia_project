// src/app/sanctuary/series/page.tsx

"use client"; // 브라우저에서 Firebase Storage 영상/이미지를 불러오고 페이지 이동을 처리하기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useMemo, useState } from "react"; // 썸네일 URL, 영상 URL, 로딩 상태를 관리하기 위해 가져옴
import { useRouter } from "next/navigation"; // 영상 클릭 시 Watch 페이지로 이동하기 위해 가져옴
import { Play, Sparkles, Clock } from "lucide-react"; // 페이지 안의 아이콘을 표시하기 위해 가져옴
import { seriesVideos, type SeriesVideoItem } from "@/data/series-videos"; // 영상 데이터 + 타입을 가져옴
import { seriesIPs, type SeriesIP } from "@/data/series-ips"; // IP(작품 단위) 메타데이터를 가져옴
import { getStorageUrlCached } from "@/lib/thumbnail-cache"; // 모듈 레벨 캐시가 적용된 썸네일 URL 발급 함수 (페이지 이동/재방문 시 재발급 X + 이미지 바이트 자동 프리로드)
import { useLanguage } from "@/contexts/LanguageContext"; // 한/영 번역과 현재 언어를 가져오기 위해 사용함
import type { Language } from "@/types"; // 다국어 타입을 가져옴

// 화면 카드에 사용할 썸네일 URL이 채워진 영상 데이터 타입임
// (실제 영상 URL은 Watch 페이지에서 서버 API로 단기 만료 서명 URL을 받아 사용하므로 여기서는 보관하지 않음)
type ResolvedItem = SeriesVideoItem & {
  thumbnailUrl: string;
};

export default function SeriesPage() {
  const router = useRouter(); // 페이지 이동에 사용함
  const { t, lang } = useLanguage(); // 현재 언어와 번역 묶음을 가져옴
  const copy = t.series; // series 섹션 번역만 짧게 참조함

  const [items, setItems] = useState<ResolvedItem[]>([]); // Firebase Storage URL이 채워진 영상 목록임
  const [isLoading, setIsLoading] = useState(true); // Storage URL 로딩 상태임

  useEffect(() => {
    // Series 페이지에서는 카드 표시용 썸네일 URL만 미리 받아옴
    // 실제 영상 URL은 사용자가 카드를 클릭해 Watch 페이지로 이동했을 때 서버 API(/api/series/video/[id])
    // 가 단기 만료 서명 URL을 발급. 이렇게 분리해 두면 Storage Rules 가 영상에 대한 직접 read 를 막아도
    // 페이지가 정상 동작하고, 서비스 전반의 영상 URL 노출이 차단됨
    Promise.all(
      seriesVideos.map(async (item) => {
        const thumbnailUrl = await getStorageUrlCached(item.thumbnailPath); // 캐시가 적용된 헬퍼로 발급 — 같은 path를 여러 번 요청해도 한 번만 fetch 됨

        return {
          ...item,
          thumbnailUrl,
        } satisfies ResolvedItem;
      }),
    )
      .then((result) => setItems(result)) // 변환된 URL 목록을 상태에 저장함
      .finally(() => setIsLoading(false)); // 로딩을 종료함
  }, []);

  // ipId 별로 영상을 그룹화한 맵을 만듦. IP 섹션을 렌더링할 때 O(1)로 조회하기 위해 useMemo로 캐싱함
  const itemsByIp = useMemo(() => {
    const map = new Map<string, ResolvedItem[]>();
    for (const item of items) {
      const list = map.get(item.ipId);
      if (list) {
        list.push(item);
      } else {
        map.set(item.ipId, [item]);
      }
    }
    return map;
  }, [items]);

  return (
    <div className="relative isolate w-full overflow-hidden bg-[#fff8fc] text-[#583950]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden"> {/* 배경 그라데이션과 빛 번짐을 깔아주는 영역임 */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff8fc_0%,#fff4fa_42%,#f8fbff_100%)]" />
        <div className="absolute left-[-180px] top-[-260px] h-[620px] w-[620px] rounded-full bg-[#ffd6e8]/80 blur-[150px]" />
        <div className="absolute right-[-220px] top-[-180px] h-[640px] w-[640px] rounded-full bg-[#e7f4ff]/90 blur-[150px]" />
        <div className="absolute bottom-[-240px] left-[20%] h-[520px] w-[520px] rounded-full bg-[#eadcff]/70 blur-[150px]" />
      </div>

      <div className="page-container relative z-10 pb-20">
        {/* === Page Header (Hero 섹션 제거됨 - 페이지 타이틀만 깔끔하게 유지) === */}
        <section className="py-12 text-center sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#f1d6de] bg-white/72 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#c76790] shadow-sm">
            <Sparkles size={13} />
            {copy.badge}
          </span>

          <h1 className="mt-5 break-keep text-5xl font-black leading-[1.05] tracking-[-0.04em] text-[#6f4b67] sm:text-6xl">
            {copy.pageTitle}
          </h1>
        </section>

        {/* === IP 섹션 반복 렌더링 === */}
        <div className="flex flex-col gap-16 sm:gap-20">
          {seriesIPs.map((ip) => {
            const ipItems = itemsByIp.get(ip.id) ?? [];
            return (
              <IPSection
                key={ip.id}
                ip={ip}
                items={ipItems}
                isLoading={isLoading}
                lang={lang}
                copy={copy}
                onPlay={(id) => router.push(`/sanctuary/watch/${id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 한 IP의 헤더 + 영상 그리드(또는 Coming Soon placeholder)를 렌더링하는 컴포넌트임
function IPSection({
  ip,
  items,
  isLoading,
  lang,
  copy,
  onPlay,
}: {
  ip: SeriesIP;
  items: ResolvedItem[];
  isLoading: boolean;
  lang: Language;
  copy: typeof import("@/i18n/ko").default.series;
  onPlay: (videoId: string) => void;
}) {
  const isAvailable = ip.status === "available";
  const ipName = ip.name[lang] ?? ip.name.ko;
  const ipDesc = ip.description[lang] ?? ip.description.ko;
  const statusLabel = isAvailable ? copy.ipStatus.available : copy.ipStatus.comingSoon;

  // 16:9 와 9:16 영상을 분리해 각각 그리드로 보여줌
  const films = items.filter((item) => item.aspectRatio === "16:9");
  const shorts = items.filter((item) => item.aspectRatio === "9:16");

  return (
    <section className="relative">
      {/* IP 헤더 — 상태 배지 + 이름 + 설명 */}
      <div className="mb-8 max-w-3xl px-2">
        <span
          className={
            isAvailable
              ? "inline-flex items-center gap-1.5 rounded-full border border-[#f1d6de] bg-white/80 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#c76790] shadow-sm"
              : "inline-flex items-center gap-1.5 rounded-full border border-[#e5d6f0] bg-white/72 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#9b78c2] shadow-sm"
          }
        >
          {isAvailable ? <Sparkles size={12} /> : <Clock size={12} />}
          {statusLabel}
        </span>

        <h2 className="mt-4 break-keep text-3xl font-black leading-tight tracking-[-0.03em] text-[#6f4b67] sm:text-4xl">
          {ipName}
        </h2>

        <p className="mt-3 break-keep text-sm font-semibold leading-relaxed text-[#9a7c92] sm:text-base">
          {ipDesc}
        </p>
      </div>

      {/* IP 콘텐츠 영역 - 공개 IP면 영상 그리드, 그 외엔 Coming Soon placeholder */}
      {isAvailable ? (
        <div className="flex flex-col gap-12">
          {films.length > 0 && (
            <SubSection
              title={copy.films.title}
              desc={copy.films.desc}
              aspectChip="16 : 9"
              isLoading={isLoading}
              loadingMessage={copy.states.thumbLoading}
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {films.map((item) => (
                  <FilmCard
                    key={item.id}
                    item={item}
                    title={item.title[lang] ?? item.title.ko}
                    onPlay={() => onPlay(item.id)}
                  />
                ))}
              </div>
            </SubSection>
          )}

          {shorts.length > 0 && (
            <SubSection
              title={copy.shorts.title}
              desc={copy.shorts.desc}
              aspectChip="9 : 16"
              isLoading={isLoading}
              loadingMessage={copy.states.thumbLoading}
            >
              <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2"> {/* 9:16 카드는 좁은 래퍼 안에서 가운데 정렬해서 보여줌 */}
                {shorts.map((item) => (
                  <ShortCard
                    key={item.id}
                    item={item}
                    title={item.title[lang] ?? item.title.ko}
                    onPlay={() => onPlay(item.id)}
                  />
                ))}
              </div>
            </SubSection>
          )}

          {/* 공개 IP인데 영상 데이터가 비어있을 때(데이터 누락 등 예외)도 빈 화면이 되지 않도록 안내함 */}
          {!isLoading && films.length === 0 && shorts.length === 0 && (
            <ComingSoonPlaceholder message={copy.comingSoonMessage} />
          )}
        </div>
      ) : (
        <ComingSoonPlaceholder message={copy.comingSoonMessage} />
      )}
    </section>
  );
}

// IP 안에서 Films/Shorts 같은 하위 섹션 헤더 + 콘텐츠 슬롯을 묶어주는 래퍼 컴포넌트임
function SubSection({
  title,
  desc,
  aspectChip,
  isLoading,
  loadingMessage,
  children,
}: {
  title: string;
  desc: string;
  aspectChip: string;
  isLoading: boolean;
  loadingMessage: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 px-2">
        <div>
          <h3 className="text-xl font-black leading-tight text-[#6f4b67] sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1.5 text-sm font-semibold leading-relaxed text-[#9a7c92]">
            {desc}
          </p>
        </div>

        <span className="rounded-full border border-[#f1d6de] bg-white/72 px-5 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#c76790] shadow-sm">
          {aspectChip}
        </span>
      </div>

      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-[28px] border border-[#f1d6de] bg-white/62 px-8 text-center shadow-[0_22px_60px_rgba(192,116,142,0.10)] backdrop-blur-xl">
          <p className="text-base font-bold leading-relaxed text-[#9a7c92]">
            {loadingMessage}
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

// Coming Soon IP를 위한 placeholder 컴포넌트임. 시각적으로 데이터가 비어있다는 것을 즉시 알 수 있도록 점선 테두리와 흐린 배경을 사용함
function ComingSoonPlaceholder({ message }: { message: string }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-[28px] border-2 border-dashed border-[#e5d6f0] bg-white/40 px-8 text-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e5d6f0] bg-white/70 text-[#9b78c2] shadow-sm">
          <Clock size={22} />
        </div>
        <p className="max-w-md break-keep text-sm font-bold leading-relaxed text-[#9b78c2] sm:text-base">
          {message}
        </p>
      </div>
    </div>
  );
}

// 16:9 영상 카드 컴포넌트임
function FilmCard({
  item,
  title,
  onPlay,
}: {
  item: ResolvedItem;
  title: string;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group flex w-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/68 text-left shadow-[0_22px_60px_rgba(192,116,142,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(192,116,142,0.20)]"
    >
      <div className="relative aspect-video overflow-hidden bg-[#f7d6e5]"> {/* 16:9 썸네일 영역 */}
        <img
          src={item.thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,15,38,0.46),rgba(35,15,38,0.08)_52%,transparent_80%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/88 text-[#c76790] shadow-[0_18px_45px_rgba(80,30,60,0.24)] transition group-hover:scale-110">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="px-6 py-5"> {/* 카드 하단 제목 영역 */}
        <h4 className="break-keep text-center text-base font-black leading-snug text-[#6f4b67] sm:text-lg">
          {title}
        </h4>
      </div> {/* text-center 로 카드 안에서 가운데 정렬, break-keep 으로 한글 단어 단위 줄바꿈 유지. 폭을 넘으면 자동으로 두 줄로 wrap 됨 */}
    </button>
  );
}

// 9:16 세로 영상 카드 컴포넌트임
function ShortCard({
  item,
  title,
  onPlay,
}: {
  item: ResolvedItem;
  title: string;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group flex w-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/68 text-left shadow-[0_22px_60px_rgba(192,116,142,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(192,116,142,0.20)]"
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-[#f7d6e5]"> {/* 9:16 세로 썸네일 영역 */}
        <img
          src={item.thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,15,38,0.50),rgba(35,15,38,0.08)_56%,transparent_82%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/88 text-[#c76790] shadow-[0_18px_45px_rgba(80,30,60,0.24)] transition group-hover:scale-110">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="px-6 py-5"> {/* 카드 하단 제목 영역 */}
        <h4 className="break-keep text-center text-base font-black leading-snug text-[#6f4b67] sm:text-lg">
          {title}
        </h4>
      </div> {/* text-center 로 카드 안에서 가운데 정렬, break-keep 으로 한글 단어 단위 줄바꿈 유지. 폭을 넘으면 자동으로 두 줄로 wrap 됨 */}
    </button>
  );
}
