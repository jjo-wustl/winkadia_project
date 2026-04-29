// src/app/sanctuary/series/page.tsx

"use client"; // 브라우저에서 Firebase Storage 영상/이미지를 불러오고 페이지 이동을 처리하기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useState } from "react"; // 썸네일 URL, 영상 URL, 로딩 상태를 관리하기 위해 가져옴
import { useRouter } from "next/navigation"; // 영상 클릭 시 Watch 페이지로 이동하기 위해 가져옴
import { Play, Sparkles, Crown, ImageIcon } from "lucide-react"; // 페이지 안의 아이콘을 표시하기 위해 가져옴
import { seriesVideos } from "@/data/series-videos"; // Firebase Storage 경로가 들어있는 영상 데이터를 가져옴
import { getStorageUrl } from "@/lib/storage"; // Storage 경로를 실제 URL로 변환하는 함수를 가져옴

type SeriesThumbnailItem = {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}; // 화면에 표시할 영상 데이터 타입임

const labelClass =
  "inline-flex w-fit items-center rounded-full bg-white/72 px-7 py-3 text-xs font-black uppercase leading-[1.6] tracking-[0.22em] text-[#d17fa2] shadow-sm"; // 라벨 글자가 잘리지 않도록 좌우 패딩과 줄 높이를 넉넉하게 둔 공통 클래스임

export default function SeriesPage() {
  const router = useRouter(); // 페이지 이동에 사용함
  const [items, setItems] = useState<SeriesThumbnailItem[]>([]); // Storage에서 받아온 썸네일과 영상 URL 목록임
  const [isLoading, setIsLoading] = useState(true); // Storage URL 로딩 상태임

  useEffect(() => {
    Promise.all(
      seriesVideos.map(async (item) => {
        const [thumbnailUrl, videoUrl] = await Promise.all([
          getStorageUrl(item.thumbnailPath), // Firebase Storage 썸네일 경로를 실제 URL로 변환함
          getStorageUrl(item.videoPath), // Firebase Storage 영상 경로를 실제 URL로 변환함
        ]);

        return {
          id: item.id,
          title: item.title,
          thumbnailUrl,
          videoUrl,
        };
      }),
    )
      .then((result) => setItems(result)) // 변환된 URL 목록을 상태에 저장함
      .finally(() => setIsLoading(false)); // 로딩을 종료함
  }, []);

  const heroItem = items[0]; // 첫 번째 영상을 히어로 대표 영상으로 사용함
  const featuredItem = items[1] ?? items[0]; // Featured에는 두 번째 영상을 우선 사용하고 없으면 첫 번째 영상을 사용함

  return (
    <div className="relative isolate w-full overflow-hidden bg-[#fff8fc] text-[#583950]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff8fc_0%,#fff4fa_42%,#f8fbff_100%)]" />
        <div className="absolute left-[-180px] top-[-260px] h-[620px] w-[620px] rounded-full bg-[#ffd6e8]/80 blur-[150px]" />
        <div className="absolute right-[-220px] top-[-180px] h-[640px] w-[640px] rounded-full bg-[#e7f4ff]/90 blur-[150px]" />
        <div className="absolute bottom-[-240px] left-[20%] h-[520px] w-[520px] rounded-full bg-[#eadcff]/70 blur-[150px]" />
      </div>

      <div className="page-container relative z-10 pb-20">
        <section className="py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-[44px] border border-white/70 bg-white/54 shadow-[0_30px_90px_rgba(178,93,133,0.16)] backdrop-blur-xl">
            <div className="grid min-h-[560px] lg:grid-cols-[1.48fr_0.52fr]">
              <div className="relative min-h-[420px] overflow-hidden rounded-[36px] bg-[#f7d6e5] lg:m-5 lg:min-h-[520px]">
                {heroItem ? (
                  <video
                    src={heroItem.videoUrl}
                    poster={heroItem.thumbnailUrl}
                    muted
                    autoPlay
                    playsInline
                    loop
                    preload="metadata"
                    onTimeUpdate={(event) => {
                      if (event.currentTarget.currentTime >= 10) {
                        event.currentTarget.currentTime = 0; // 히어로 미리보기는 10초까지만 반복되게 함
                      }
                    }}
                    className="h-full w-full rounded-[36px] object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[420px] items-center justify-center text-base font-black text-[#b86f91] lg:min-h-[520px]">
                    {isLoading ? "영상 불러오는 중..." : "영상을 불러올 수 없음"}
                  </div>
                )}

                <div className="absolute inset-0 rounded-[36px] bg-[linear-gradient(to_top,rgba(255,248,252,0.80)_0%,rgba(255,248,252,0.10)_48%,rgba(255,248,252,0.02)_100%)]" />

                <button
                  type="button"
                  onClick={() => heroItem && router.push(`/sanctuary/watch/${heroItem.id}`)}
                  className="absolute bottom-8 left-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#c76790] shadow-[0_18px_45px_rgba(80,30,60,0.24)] transition hover:scale-105"
                >
                  <Play size={28} fill="currentColor" />
                </button>
              </div>

              <div className="relative flex min-w-0 flex-col justify-start px-8 py-10 lg:px-9">
                <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#ffd6e8]/70 blur-[80px]" />
                <div className="pointer-events-none absolute bottom-[-90px] left-[-90px] h-56 w-56 rounded-full bg-[#e7dcff]/60 blur-[80px]" />

                <div className="relative z-10">
                  <p className={labelClass}>WINKADIA</p>

                  <h1 className="mt-3 break-keep text-4xl font-black leading-tight tracking-[-0.04em] text-[#6f4b67] sm:text-5xl">
                    Series
                  </h1>

                  <div className="mt-8 grid gap-3">
                    <div className="rounded-[22px] border border-[#f1d6de] bg-white/68 px-5 py-5 shadow-[0_18px_46px_rgba(192,116,142,0.10)]">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff0f7] text-[#d17fa2]">
                          <Play size={18} fill="currentColor" />
                        </div>

                        <div>
                          <p className="text-2xl font-black leading-tight text-[#6f4b67]">5</p>
                          <p className="mt-1 text-xs font-bold leading-relaxed text-[#9a7c92]">Videos</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-[#f1d6de] bg-white/68 px-5 py-5 shadow-[0_18px_46px_rgba(192,116,142,0.10)]">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff0f7] text-[#d17fa2]">
                          <Crown size={19} />
                        </div>

                        <div>
                          <p className="text-2xl font-black leading-tight text-[#6f4b67]">Only</p>
                          <p className="mt-1 text-xs font-bold leading-relaxed text-[#9a7c92]">Winkadia</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-[#f1d6de] bg-white/54 px-5 py-5 shadow-[0_18px_46px_rgba(192,116,142,0.08)]">
                      <div className="flex items-start gap-4">
                        <ImageIcon className="mt-1 shrink-0 text-[#d17fa2]" size={20} />
                        <p className="break-keep text-xs font-bold leading-6 text-[#9a7c92]">
                          공개되지 않은 장면들을 한곳에 모아둔 공간
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-[#f1d6de] bg-white/54 px-5 py-5 shadow-[0_18px_46px_rgba(192,116,142,0.08)]">
                      <p className="break-keep text-xs font-bold leading-6 text-[#9a7c92]">
                        내용 뭐 넣을지 상의.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-2">
          <div className="mb-6 flex items-end justify-between px-2">
            <h2 className="text-2xl font-black leading-tight text-[#6f4b67] sm:text-3xl">
              이어보기
            </h2>
          </div>

          <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-[32px] border border-[#f1d6de] bg-white/62 px-8 text-center shadow-[0_22px_60px_rgba(192,116,142,0.10)] backdrop-blur-xl">
            <div className="pointer-events-none absolute left-[-90px] top-[-90px] h-56 w-56 rounded-full bg-[#ffd6e8]/70 blur-[80px]" />
            <div className="pointer-events-none absolute right-[-90px] bottom-[-90px] h-56 w-56 rounded-full bg-[#e7dcff]/60 blur-[80px]" />

            <div className="relative z-10 flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f1d6de] bg-white/80 text-[#c76790] shadow-sm">
                <Sparkles size={20} />
              </div>

              <p className="text-left text-base font-bold leading-relaxed text-[#9a7c92]">
                아직 시청한 영상이 없습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="pt-14">
          <div className="mb-6 flex items-end justify-between px-2">
            <h2 className="text-2xl font-black leading-tight text-[#6f4b67] sm:text-3xl">
              Featured
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <button
              type="button"
              onClick={() => featuredItem && router.push(`/sanctuary/watch/${featuredItem.id}`)}
              className="group relative min-h-[320px] overflow-hidden rounded-[36px] border border-white/70 bg-[#f7d6e5] shadow-[0_24px_70px_rgba(192,116,142,0.14)] transition hover:-translate-y-1 lg:min-h-[380px]"
            >
              {featuredItem ? (
                <img
                  src={featuredItem.thumbnailUrl}
                  alt={featuredItem.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center text-base font-bold text-[#9a7c92] lg:min-h-[380px]">
                  {isLoading ? "이미지 불러오는 중..." : "이미지를 불러올 수 없음"}
                </div>
              )}

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,15,38,0.48),rgba(35,15,38,0.08)_56%,transparent_82%)]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#c76790] shadow-[0_18px_45px_rgba(80,30,60,0.24)] transition group-hover:scale-110">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>
            </button>

            <div className="relative rounded-[36px] border border-[#f1d6de] bg-white/62 p-8 shadow-[0_24px_70px_rgba(192,116,142,0.10)] backdrop-blur-xl">
              <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-64 w-64 rounded-full bg-[#ffd6e8]/70 blur-[80px]" />
              <div className="pointer-events-none absolute bottom-[-90px] left-[-90px] h-64 w-64 rounded-full bg-[#e7dcff]/60 blur-[80px]" />

              <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between">
                <div>
                  <p className={labelClass}>Unreleased Film</p>

                  <h3 className="mt-5 max-w-xl break-keep text-4xl font-black leading-tight text-[#6f4b67]">
                    오늘의 미방분
                  </h3>

                  <p className="mt-5 max-w-xl break-keep text-base font-semibold leading-8 text-[#8f7186]">
                    어떤 내용 넣을지 상의.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-14">
          <div className="mb-6 flex items-end justify-between px-2">
            <h2 className="text-2xl font-black leading-tight text-[#6f4b67] sm:text-3xl">
              미방분 영상
            </h2>
          </div>

          {isLoading ? (
            <div className="flex min-h-[260px] items-center justify-center rounded-[32px] border border-[#f1d6de] bg-white/62 px-8 text-center shadow-[0_22px_60px_rgba(192,116,142,0.10)] backdrop-blur-xl">
              <p className="text-base font-bold leading-relaxed text-[#9a7c92]">
                영상 썸네일을 불러오는 중...
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => router.push(`/sanctuary/watch/${item.id}`)}
                  className="group relative h-[340px] overflow-hidden rounded-[32px] border border-white/70 bg-[#f7d6e5] shadow-[0_22px_60px_rgba(192,116,142,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(192,116,142,0.20)]"
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,15,38,0.46),rgba(35,15,38,0.08)_52%,transparent_80%)]" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/88 text-[#c76790] shadow-[0_18px_45px_rgba(80,30,60,0.24)] transition group-hover:scale-110">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="pt-14">
          <div className="mb-6 flex items-end justify-between px-2">
            <h2 className="text-2xl font-black leading-tight text-[#6f4b67] sm:text-3xl">
              Coming Soon
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {["Gallery", "New Series", "New IP"].map((label) => (
              <div
                key={label}
                className="relative min-h-[180px] rounded-[32px] border border-[#f1d6de] bg-white/58 p-7 shadow-[0_22px_60px_rgba(192,116,142,0.10)] backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-48 w-48 rounded-full bg-[#ffd6e8]/70 blur-[70px]" />

                <div className="relative z-10">
                  <p className={labelClass}>Soon</p>

                  <h3 className="mt-5 text-2xl font-black leading-tight text-[#6f4b67]">
                    {label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}