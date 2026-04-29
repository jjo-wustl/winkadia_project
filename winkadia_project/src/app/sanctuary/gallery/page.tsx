// src/app/sanctuary/gallery/page.tsx

"use client"; // 브라우저에서 Firebase Storage 이미지를 불러오기 위해 클라이언트 컴포넌트로 사용함

import { useEffect, useState } from "react"; // 이미지 URL과 로딩 상태를 관리하기 위해 가져옴
import { Camera, Heart, Sparkles } from "lucide-react"; // 갤러리 장식 아이콘을 표시하기 위해 가져옴
import { galleryImages, type GalleryImageItem } from "@/data/gallery-images"; // 갤러리 이미지 Storage 경로 데이터를 가져옴
import { getStorageUrl } from "@/lib/storage"; // Firebase Storage 경로를 실제 이미지 URL로 바꾸는 함수를 가져옴

type GalleryViewItem = GalleryImageItem & {
  imageUrl: string;
}; // 화면에서 사용할 실제 이미지 URL이 포함된 타입임

const labelClass =
  "inline-flex w-fit items-center rounded-full bg-white/76 px-7 py-3 text-xs font-black uppercase leading-[1.6] tracking-[0.22em] text-[#8b68d8] shadow-sm"; // 라벨 글자가 잘리지 않도록 좌우 패딩과 줄 높이를 넉넉하게 둔 공통 클래스임

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryViewItem[]>([]); // Storage에서 받아온 실제 이미지 목록임
  const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태임

  useEffect(() => {
    Promise.all(
      galleryImages.map(async (item) => {
        const imageUrl = await getStorageUrl(item.imagePath); // Storage 이미지 경로를 실제 URL로 변환함

        return {
          ...item,
          imageUrl,
        };
      }),
    )
      .then((result) => setItems(result)) // 변환된 이미지 목록을 상태에 저장함
      .finally(() => setIsLoading(false)); // 로딩을 종료함
  }, []);

  const castItems = items.filter((item) => item.category === "cast"); // 배우 사진만 모음
  const sceneItems = items.filter((item) => item.category === "scenes"); // 명장면 사진만 모음
  const heroMain = castItems[4] ?? castItems[0]; // 히어로 메인 사진은 여자 배우 사진을 우선 사용함
  const heroSubA = castItems[0] ?? heroMain; // 히어로 보조 사진 첫 번째임
  const heroSubB = sceneItems[0] ?? heroMain; // 히어로 보조 사진 두 번째임

  return (
    <div className="relative flex w-full justify-center text-[#32283d]">
      <div className="relative mx-auto w-full max-w-[1420px] overflow-hidden rounded-[42px] border border-white/80 bg-white/76 shadow-[0_30px_110px_rgba(120,82,166,0.20)] backdrop-blur-2xl">
        <section className="relative grid min-h-[680px] grid-cols-1 items-center gap-10 px-8 pb-16 pt-16 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.94),_rgba(255,255,255,0.34)_42%,_transparent_78%)]" />
          <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#ead8ff]/70 blur-[100px]" />
          <div className="pointer-events-none absolute right-[-140px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-[#f4d8ff]/70 blur-[120px]" />

          <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className={labelClass}>WINKADIA</p>

            <h1 className="mt-6 break-keep text-[52px] font-black leading-tight tracking-[-0.05em] text-[#30283b] sm:text-[72px]">
              Gallery
            </h1>

            <p className="mt-6 max-w-xl break-keep text-[21px] font-semibold leading-9 text-[#7b7284]">
              인물과 장면을 모아둔 윙카디아 비주얼 아카이브
            </p>

            <div className="mt-10 grid w-full max-w-[560px] gap-4 sm:grid-cols-3">
              <div className="rounded-[26px] border border-[#e6d7fb] bg-white/70 px-6 py-6 shadow-[0_16px_42px_rgba(137,104,216,0.12)]">
                <p className="text-[34px] font-black leading-tight text-[#8b68d8]">8</p>
                <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#7b7284]">Cast</p>
              </div>

              <div className="rounded-[26px] border border-[#e6d7fb] bg-white/70 px-6 py-6 shadow-[0_16px_42px_rgba(137,104,216,0.12)]">
                <p className="text-[34px] font-black leading-tight text-[#8b68d8]">8</p>
                <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#7b7284]">Scenes</p>
              </div>

              <div className="rounded-[26px] border border-[#e6d7fb] bg-white/70 px-6 py-6 shadow-[0_16px_42px_rgba(137,104,216,0.12)]">
                <p className="text-[34px] font-black leading-tight text-[#8b68d8]">16</p>
                <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#7b7284]">Archive</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 min-h-[560px] w-full">
            <div className="pointer-events-none absolute left-[4%] top-[4%] h-[280px] w-[280px] rounded-full bg-[#d8c4ff]/80 blur-[90px]" />
            <div className="pointer-events-none absolute bottom-[4%] right-[4%] h-[340px] w-[340px] rounded-full bg-[#f4d8ff]/80 blur-[100px]" />

            <div className="absolute left-[4%] top-[8%] h-[340px] w-[270px] rotate-[-7deg] overflow-hidden rounded-[34px] border border-white/80 bg-[#eee4fb] shadow-[0_28px_70px_rgba(126,91,173,0.22)]">
              {heroSubA ? (
                <img src={heroSubA.imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-black text-[#8b68d8]">
                  {isLoading ? "Loading..." : "No Image"}
                </div>
              )}
            </div>

            <div className="absolute right-[3%] top-[3%] h-[250px] w-[360px] rotate-[5deg] overflow-hidden rounded-[34px] border border-white/80 bg-[#eee4fb] shadow-[0_28px_70px_rgba(126,91,173,0.20)]">
              {heroSubB ? (
                <img src={heroSubB.imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-black text-[#8b68d8]">
                  {isLoading ? "Loading..." : "No Image"}
                </div>
              )}
            </div>

            <div className="absolute bottom-[2%] left-[26%] h-[420px] w-[330px] rotate-[2deg] overflow-hidden rounded-[38px] border border-white/90 bg-[#eee4fb] shadow-[0_34px_86px_rgba(126,91,173,0.26)]">
              {heroMain ? (
                <img src={heroMain.imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-black text-[#8b68d8]">
                  {isLoading ? "Loading..." : "No Image"}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="relative z-10 px-5 pb-14 sm:px-8 lg:px-10">
          <section className="rounded-[34px] border border-[#ecdff9] bg-white/80 px-8 py-10 shadow-[0_18px_60px_rgba(126,91,173,0.13)] sm:px-10 lg:px-12">
            <div className="mb-8 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-black uppercase leading-[1.6] tracking-[0.24em] text-[#8b68d8]">
                  시안 A
                </p>

                <h2 className="mt-3 text-[32px] font-black tracking-[-0.03em] text-[#30283b] sm:text-[38px]">
                  Cast
                  <Sparkles className="ml-2 inline-block translate-y-0.5 text-[#8b68d8]" size={26} />
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[30px] border border-[#e6d7fb] bg-white/70 px-8 text-center">
                <p className="text-base font-bold leading-relaxed text-[#7b7284]">
                  배우 사진을 불러오는 중...
                </p>
              </div>
            ) : (
              <div className="grid auto-rows-[160px] grid-cols-2 gap-5 md:grid-cols-4 lg:auto-rows-[190px]">
                {castItems.map((item, index) => (
                  <article
                    key={item.id}
                    className={[
                      "group relative overflow-hidden rounded-[30px] border border-[#eee4f7] bg-white shadow-[0_14px_38px_rgba(105,76,148,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(105,76,148,0.20)]",
                      index === 0 ? "row-span-2" : "",
                      index === 3 ? "row-span-2" : "",
                      index === 4 ? "row-span-2" : "",
                      index === 7 ? "row-span-2" : "",
                    ].join(" ")}
                  >
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="mt-10 rounded-[34px] border border-[#ecdff9] bg-white/80 px-8 py-10 shadow-[0_18px_60px_rgba(126,91,173,0.13)] sm:px-10 lg:px-12">
            <div className="mb-8 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-black uppercase leading-[1.6] tracking-[0.24em] text-[#8b68d8]">
                  시안 A
                </p>

                <h2 className="mt-3 text-[32px] font-black tracking-[-0.03em] text-[#30283b] sm:text-[38px]">
                  다시 보는 명장면
                  <Heart className="ml-2 inline-block translate-y-0.5 text-[#8b68d8]" size={26} />
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[30px] border border-[#e6d7fb] bg-white/70 px-8 text-center">
                <p className="text-base font-bold leading-relaxed text-[#7b7284]">
                  명장면 사진을 불러오는 중...
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  {sceneItems.slice(0, 2).map((item) => (
                    <article
                      key={item.id}
                      className="group relative h-[360px] overflow-hidden rounded-[34px] border border-[#eee4f7] bg-white shadow-[0_14px_38px_rgba(105,76,148,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(105,76,148,0.20)]"
                    >
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </article>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                  {sceneItems.slice(2, 4).map((item) => (
                    <article
                      key={item.id}
                      className="group relative h-[360px] overflow-hidden rounded-[34px] border border-[#eee4f7] bg-white shadow-[0_14px_38px_rgba(105,76,148,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(105,76,148,0.20)]"
                    >
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </article>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-4">
                  {sceneItems.slice(4, 8).map((item) => (
                    <article
                      key={item.id}
                      className="group relative h-[240px] overflow-hidden rounded-[30px] border border-[#eee4f7] bg-white shadow-[0_14px_38px_rgba(105,76,148,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(105,76,148,0.20)]"
                    >
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="mt-10 rounded-[34px] border border-[#ecdff9] bg-white/80 px-8 py-10 shadow-[0_18px_60px_rgba(126,91,173,0.13)] sm:px-10 lg:px-12">
            <div className="mb-8 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-black uppercase leading-[1.6] tracking-[0.24em] text-[#8b68d8]">
                  시안 B
                </p>

                <h2 className="mt-3 text-[32px] font-black tracking-[-0.03em] text-[#30283b] sm:text-[38px]">
                  Cast
                  <Sparkles className="ml-2 inline-block translate-y-0.5 text-[#8b68d8]" size={26} />
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[30px] border border-[#e6d7fb] bg-white/70 px-8 text-center">
                <p className="text-base font-bold leading-relaxed text-[#7b7284]">
                  배우 사진을 불러오는 중...
                </p>
              </div>
            ) : (
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {castItems.map((item) => (
                  <article
                    key={item.id}
                    className="group relative h-[430px] overflow-hidden rounded-[30px] border border-[#eee4f7] bg-white shadow-[0_14px_38px_rgba(105,76,148,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(105,76,148,0.20)]"
                  >
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="mt-10 rounded-[34px] border border-[#ecdff9] bg-white/80 px-8 py-10 shadow-[0_18px_60px_rgba(126,91,173,0.13)] sm:px-10 lg:px-12">
            <div className="mb-8 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-black uppercase leading-[1.6] tracking-[0.24em] text-[#8b68d8]">
                  시안 B
                </p>

                <h2 className="mt-3 text-[32px] font-black tracking-[-0.03em] text-[#30283b] sm:text-[38px]">
                  다시 보는 명장면
                  <Heart className="ml-2 inline-block translate-y-0.5 text-[#8b68d8]" size={26} />
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[30px] border border-[#e6d7fb] bg-white/70 px-8 text-center">
                <p className="text-base font-bold leading-relaxed text-[#7b7284]">
                  명장면 사진을 불러오는 중...
                </p>
              </div>
            ) : (
              <div className="grid gap-7 lg:grid-cols-2">
                {sceneItems.map((item) => (
                  <article
                    key={item.id}
                    className="group relative h-[330px] overflow-hidden rounded-[30px] border border-[#eee4f7] bg-white shadow-[0_14px_38px_rgba(105,76,148,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(105,76,148,0.20)]"
                  >
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="mt-10 rounded-[40px] border border-[#ecdff9] bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(244,232,255,0.72),rgba(255,238,248,0.78))] px-7 py-10 shadow-[0_24px_80px_rgba(126,91,173,0.16)] sm:px-10 lg:px-12">
            <div className="mb-10 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-black uppercase leading-[1.6] tracking-[0.24em] text-[#8b68d8]">
                  시안 C
                </p>

                <h2 className="mt-3 text-[34px] font-black tracking-[-0.04em] text-[#30283b] sm:text-[44px]">
                  Visual Moodboard
                  <Camera className="ml-2 inline-block translate-y-0.5 text-[#8b68d8]" size={28} />
                </h2>
              </div>

              <p className="max-w-md break-keep text-sm font-bold leading-7 text-[#7b7284]">
                인물 사진과 명장면 이미지를 한 화면 안에 겹쳐 배치하는 화보형 갤러리 시안
              </p>
            </div>

            {isLoading ? (
              <div className="flex min-h-[520px] items-center justify-center rounded-[34px] border border-[#e6d7fb] bg-white/70 px-8 text-center">
                <p className="text-base font-bold leading-relaxed text-[#7b7284]">
                  무드보드를 불러오는 중...
                </p>
              </div>
            ) : (
              <div className="relative min-h-[980px] overflow-hidden rounded-[38px] border border-white/80 bg-white/48 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] sm:p-8 lg:min-h-[760px]">
                <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#d8c4ff]/80 blur-[100px]" />
                <div className="pointer-events-none absolute bottom-[-150px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#ffd8ec]/80 blur-[120px]" />
                <div className="pointer-events-none absolute left-[35%] top-[30%] h-[280px] w-[280px] rounded-full bg-white/70 blur-[90px]" />

                <div className="relative z-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[620px]">
                    <article className="absolute left-[3%] top-[2%] h-[520px] w-[72%] max-w-[360px] rotate-[-4deg] overflow-hidden rounded-[36px] border border-white/80 bg-white shadow-[0_28px_80px_rgba(126,91,173,0.23)]">
                      {castItems[4] && (
                        <img
                          src={castItems[4].imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </article>

                    <article className="absolute bottom-[2%] right-[2%] h-[260px] w-[48%] overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_70px_rgba(126,91,173,0.20)]">
                      {castItems[5] && (
                        <img
                          src={castItems[5].imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </article>

                    <div className="absolute bottom-[15%] left-[12%] rounded-[28px] border border-[#e6d7fb] bg-white/78 px-7 py-6 shadow-[0_18px_46px_rgba(137,104,216,0.14)] backdrop-blur-xl">
                      <p className="text-xs font-black uppercase leading-[1.6] tracking-[0.22em] text-[#8b68d8]">
                        Cast Board
                      </p>
                      <p className="mt-2 text-3xl font-black leading-tight text-[#30283b]">
                        8 Portraits
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                      <article className="h-[260px] overflow-hidden rounded-[34px] border border-white/80 bg-white shadow-[0_24px_70px_rgba(126,91,173,0.18)] md:h-[300px]">
                        {sceneItems[0] && (
                          <img
                            src={sceneItems[0].imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </article>

                      <article className="h-[260px] rotate-[2deg] overflow-hidden rounded-[34px] border border-white/80 bg-white shadow-[0_24px_70px_rgba(126,91,173,0.18)] md:h-[300px]">
                        {sceneItems[1] && (
                          <img
                            src={sceneItems[1].imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </article>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                      {[castItems[0], castItems[1], castItems[6]].map((item, index) => (
                        <article
                          key={item?.id ?? index}
                          className={[
                            "h-[260px] overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_20px_58px_rgba(126,91,173,0.17)]",
                            index === 1 ? "md:translate-y-8" : "",
                          ].join(" ")}
                        >
                          {item && (
                            <img
                              src={item.imageUrl}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          )}
                        </article>
                      ))}
                    </div>

                    <div className="mt-6 rounded-[32px] border border-[#e6d7fb] bg-white/72 px-7 py-6 shadow-[0_18px_46px_rgba(137,104,216,0.12)] backdrop-blur-xl">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee4fb] text-[#8b68d8]">
                          <Sparkles size={22} />
                        </div>

                        <p className="break-keep text-base font-bold leading-7 text-[#7b7284]">
                          사진을 규칙적으로 나열하기보다 화보 보드처럼 배치하는 버전
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sceneItems.slice(4, 8).map((item, index) => (
                    <article
                      key={item.id}
                      className={[
                        "h-[190px] overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_18px_50px_rgba(126,91,173,0.15)]",
                        index % 2 === 0 ? "lg:-translate-y-4" : "lg:translate-y-4",
                      ].join(" ")}
                    >
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="mt-10">
            <div className="relative flex min-h-[190px] items-center justify-center overflow-hidden rounded-[32px] border border-[#ecdff9] bg-white/78 px-8 text-center shadow-[0_18px_60px_rgba(126,91,173,0.13)]">
              <div className="pointer-events-none absolute left-[-90px] top-[-90px] h-56 w-56 rounded-full bg-[#ead8ff]/70 blur-[80px]" />
              <div className="pointer-events-none absolute right-[-90px] bottom-[-90px] h-56 w-56 rounded-full bg-[#f4d8ff]/70 blur-[80px]" />

              <div className="relative z-10 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e6d7fb] bg-white/80 text-[#8b68d8] shadow-sm">
                  <Camera size={20} />
                </div>

                <p className="text-left text-base font-bold leading-relaxed text-[#7b7284]">
                  추후 배우별 사진첩과 다른 IP 갤러리도 추가될 예정입니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}