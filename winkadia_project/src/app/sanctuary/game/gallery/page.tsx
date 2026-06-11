// src/app/sanctuary/game/gallery/page.tsx
//
// Game CG 갤러리 전체 보기 화면임.

import Link from "next/link"; // 페이지 이동 링크를 만들기 위해 사용함
import { ArrowLeft } from "lucide-react"; // 뒤로가기 아이콘을 가져옴
import GameStorageImage from "@/components/game/GameStorageImage"; // Firebase Storage 이미지를 표시하는 컴포넌트를 가져옴
import { gameGalleryItems } from "@/data/game-content"; // CG 갤러리 데이터를 가져옴

export default function GameGalleryPage() {
  return (
    <div className="flex w-full justify-center px-6 py-20 text-[#32283d] sm:px-8 lg:px-10">
      {/* 기존 sanctuary layout 배경을 그대로 사용하고, 갤러리 화면만 중앙 정렬함 */}
      <div className="w-full max-w-[1460px]">
        <section className="rounded-[48px] border border-white/72 bg-white/50 px-6 py-12 shadow-[0_28px_90px_rgba(127,91,204,0.12)] backdrop-blur-xl sm:px-8 sm:py-14 lg:px-10">
          {/* 갤러리 헤더 영역임 */}
          <Link
            href="/sanctuary/game"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#e6d7fb] bg-white/72 px-5 text-[13px] font-black text-[#8b68d8] shadow-sm"
            style={{ textDecoration: "none" }}
          >
            <ArrowLeft size={15} />
            Game
          </Link>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.24em] text-[#9b78e5]">
                CG Gallery
              </p>

              <h1 className="mt-3 break-keep text-[42px] font-black leading-[1.18] tracking-[-0.045em] text-[#30283b] sm:text-[58px]">
                CG 갤러리
              </h1>
            </div>

            <p className="max-w-[560px] break-keep text-[15px] font-semibold leading-[1.9] text-[#786f85]">
              황후 면접의 주요 장면과 인물 스틸컷을 모아 볼 수 있습니다.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gameGalleryItems.map((item, index) => (
              <article
                key={item.id}
                className="rounded-[34px] border border-white/76 bg-white/72 p-5 shadow-[0_18px_50px_rgba(127,91,204,0.10)]"
              >
                <div className="relative">
                  <GameStorageImage
                    path={item.imagePath}
                    alt={`${item.title} CG 이미지`}
                    className="aspect-[16/9] rounded-[28px]"
                  />

                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#7f5bcc]">
                    CG {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="px-2 pb-2 pt-6">
                  <h2 className="break-keep text-[23px] font-black leading-[1.3] text-[#30283b]">
                    {item.title}
                  </h2>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}