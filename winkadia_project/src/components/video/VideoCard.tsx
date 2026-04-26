"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, Heart, Play } from "lucide-react";
import type { Video } from "@/types";
export default function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) {
  const { t, localized } = useLanguage();
  return (
    <Link href={`/sanctuary/theater/${video.id}`} className="block group" style={{ textDecoration: "none" }}>
      <div className={`card-sanctuary overflow-hidden ${featured ? "md:flex" : ""}`}>
        <div className={`relative overflow-hidden ${featured ? "md:w-2/3" : ""}`} style={{ aspectRatio: featured ? undefined : "16/9" }}>
          <div className="w-full h-full" style={{ minHeight: "200px", background: "linear-gradient(135deg, var(--pink-100), var(--purple-100), var(--pink-100))" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ background: "rgba(232,85,138,0.1)", border: "2px solid var(--pink-400)" }}>
                <Play size={28} style={{ color: "var(--pink-500)", marginLeft: "4px" }}/>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(232,85,138,0.08) 100%)" }}/>
          {video.isExclusive && <span className="badge-exclusive absolute top-3 right-3">{t.sanctuary.exclusiveBadge}</span>}
          {video.episode && <span className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.9)", color: "var(--pink-600)", fontFamily: "var(--font-heading)", letterSpacing: "1px" }}>{t.theater.episode}{video.episode}{t.theater.episodeSuffix}</span>}
        </div>
        <div className={`p-5 ${featured ? "md:w-1/3 md:flex md:flex-col md:justify-center" : ""}`}>
          {video.seriesTitle && <p className="text-xs tracking-[2px] uppercase mb-1" style={{ color: "var(--purple-500)", fontFamily: "var(--font-heading)" }}>{localized(video.seriesTitle)}</p>}
          <h3 className="text-heading text-base sm:text-lg mb-2 transition-colors duration-300" style={{ color: "var(--text-primary)", lineHeight: 1.4 }}>{localized(video.title)}</h3>
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{localized(video.description)}</p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-light)" }}>
            <span className="flex items-center gap-1"><Eye size={14}/>{video.views.toLocaleString()} {t.theater.views}</span>
            <span className="flex items-center gap-1"><Heart size={14}/>{video.likes.toLocaleString()} {t.theater.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
