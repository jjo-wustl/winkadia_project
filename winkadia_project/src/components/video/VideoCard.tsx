// src/components/video/VideoCard.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import Link from "next/link"; // 영상 상세 페이지로 이동하는 링크를 만들기 위해 가져옴
import { useLanguage } from "@/contexts/LanguageContext"; // 영상 제목과 설명을 현재 언어에 맞게 보여주기 위해 사용함
import { Eye, Heart, Play } from "lucide-react"; // 조회수, 좋아요, 재생 아이콘을 가져옴
import type { Video } from "@/types"; // 영상 데이터 타입을 가져옴

export default function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) { // 영상 카드 컴포넌트이며 대표 카드 여부를 받을 수 있음
  const { t, localized } = useLanguage(); // 번역 문구와 다국어 필드 선택 함수를 가져옴
  return (
    <Link href={`/sanctuary/series/${video.id}`} className="block group" style={{ textDecoration: "none" }}> {/* 카드를 누르면 해당 영상 상세 페이지로 이동함 */}
      <div className={`card-sanctuary overflow-hidden ${featured ? "md:flex" : ""}`}> {/* 영상 카드 전체 영역이며 featured면 데스크톱에서 가로 배치함 */}
        <div className={`relative overflow-hidden ${featured ? "md:w-2/3" : ""}`} style={{ aspectRatio: featured ? undefined : "16/9" }}> {/* 썸네일 또는 영상 미리보기 영역임 */}
          <div className="w-full h-full" style={{ minHeight: "200px", background: "linear-gradient(135deg, var(--pink-100), var(--purple-100), var(--pink-100))" }}> {/* 실제 썸네일 대신 그라디언트 배경을 표시함 */}
            <div className="absolute inset-0 flex items-center justify-center"> {/* 재생 버튼을 가운데 배치함 */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ background: "rgba(232,85,138,0.1)", border: "2px solid var(--pink-400)" }}>
                <Play size={28} style={{ color: "var(--pink-500)", marginLeft: "4px" }}/>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(232,85,138,0.08) 100%)" }}/> {/* hover 때 나타나는 부드러운 오버레이임 */}
          {video.isExclusive && <span className="badge-exclusive absolute top-3 right-3">{t.sanctuary.exclusiveBadge}</span>} {/* 독점 영상이면 배지를 표시함 */}
          {video.episode && <span className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.9)", color: "var(--pink-600)", fontFamily: "var(--font-heading)", letterSpacing: "1px" }}>{t.theater.episode}{video.episode}{t.theater.episodeSuffix}</span>} {/* 에피소드 번호가 있으면 표시함 */}
        </div>
        <div className={`p-5 ${featured ? "md:w-1/3 md:flex md:flex-col md:justify-center" : ""}`}> {/* 영상 텍스트 정보 영역임 */}
          {video.seriesTitle && <p className="text-xs tracking-[2px] uppercase mb-1" style={{ color: "var(--purple-500)", fontFamily: "var(--font-heading)" }}>{localized(video.seriesTitle)}</p>} {/* 시리즈 제목이 있으면 현재 언어에 맞게 표시함 */}
          <h3 className="text-heading text-base sm:text-lg mb-2 transition-colors duration-300" style={{ color: "var(--text-primary)", lineHeight: 1.4 }}>{localized(video.title)}</h3>
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{localized(video.description)}</p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-light)" }}> {/* 조회수와 좋아요 수를 가로로 표시함 */}
            <span className="flex items-center gap-1"><Eye size={14}/>{video.views.toLocaleString()} {t.theater.views}</span>
            <span className="flex items-center gap-1"><Heart size={14}/>{video.likes.toLocaleString()} {t.theater.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}