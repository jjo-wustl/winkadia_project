"use client";
import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import VideoCard from "@/components/video/VideoCard";
import { getVideos } from "@/lib/firestore";
import type { Video } from "@/types";
import { Sparkles } from "lucide-react";
type FilterType = "all"|"exclusive"|"latest"|"popular";
export default function TheaterPage() {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]); const [filter, setFilter] = useState<FilterType>("all"); const [loaded, setLoaded] = useState(false);
  const loadVideos = useCallback(async () => {
    try { const opts = filter==="exclusive"?{isExclusive:true}:filter==="popular"?{orderField:"likes"}:{}; setVideos(await getVideos(opts)); } catch(e){console.error(e);} finally{setLoaded(true);}
  }, [filter]);
  useEffect(() => { loadVideos(); }, [loadVideos]);
  const filters: {key:FilterType;label:string}[] = [{key:"all",label:t.theater.allSeries},{key:"exclusive",label:t.theater.exclusive},{key:"latest",label:t.theater.latest},{key:"popular",label:t.theater.popular}];
  return (
    <div className="page-container">
      <section className="text-center py-16 sm:py-20">
        <h1 className="text-display text-3xl sm:text-4xl text-pink-gradient mb-4" style={{fontWeight:900}}>{t.theater.title}</h1>
        <p className="text-sm tracking-[2px]" style={{color:"var(--text-muted)"}}>{t.theater.subtitle}</p>
        <div className="ornate-divider">♡</div>
      </section>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((f)=>(<button key={f.key} onClick={()=>{setFilter(f.key);setLoaded(false);}} className="px-6 py-2.5 rounded-full text-xs tracking-[2px] uppercase transition-all duration-300" style={{fontFamily:"var(--font-heading)",border:`2px solid ${filter===f.key?"var(--pink-500)":"var(--border)"}`,background:filter===f.key?"var(--pink-100)":"transparent",color:filter===f.key?"var(--pink-600)":"var(--text-muted)"}}>{f.label}</button>))}
      </div>
      {loaded && videos.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">{videos.map((v,i)=>(<div key={v.id} className="animate-fade-in-up" style={{animationDelay:`${i*0.1}s`,animationFillMode:"both"}}><VideoCard video={v}/></div>))}</div>}
      {loaded && videos.length === 0 && <div className="text-center py-20"><Sparkles size={48} className="animate-float" style={{color:"var(--pink-300)",margin:"0 auto 16px auto",display:"block"}}/><p className="text-heading text-lg tracking-[2px]" style={{color:"var(--text-muted)"}}>{t.theater.noVideos}</p></div>}
    </div>
  );
}
