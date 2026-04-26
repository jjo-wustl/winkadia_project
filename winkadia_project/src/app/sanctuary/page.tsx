"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import VideoCard from "@/components/video/VideoCard";
import { getVideos, getAnnouncements, seedDemoData, addOracle } from "@/lib/firestore";
import type { Video, Announcement, OracleRarity } from "@/types";
import { Sparkles, Eye, Users, Film, BookOpen, ScrollText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SanctuaryPage() {
  const { user } = useAuth();
  const { t, lang, localized } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]); const [exclusiveVideos, setExclusiveVideos] = useState<Video[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]); const [loaded, setLoaded] = useState(false);
  const [oracleMessage, setOracleMessage] = useState(""); const [oracleRarity, setOracleRarity] = useState<OracleRarity>("rare");
  const [oracleLoading, setOracleLoading] = useState(false); const [oracleReceived, setOracleReceived] = useState(false);
  const [oracleShared, setOracleShared] = useState(false); const [alreadyUsedToday, setAlreadyUsedToday] = useState(false);

  const loadData = useCallback(async () => {
    try { await seedDemoData(); const [a,b,c] = await Promise.all([getVideos({limitCount:6}),getVideos({isExclusive:true,limitCount:3}),getAnnouncements(3)]); setVideos(a); setExclusiveVideos(b); setAnnouncements(c); } catch(e){console.error(e);} finally{setLoaded(true);}
  }, []);

  useEffect(() => {
    loadData();
    const lastOracle = localStorage.getItem("winkadia-last-oracle");
    if (lastOracle && new Date(lastOracle).toDateString() === new Date().toDateString()) {
      setAlreadyUsedToday(true);
      const msg = localStorage.getItem("winkadia-oracle-message"); const rar = localStorage.getItem("winkadia-oracle-rarity") as OracleRarity;
      if (msg && rar) { setOracleMessage(msg); setOracleRarity(rar); setOracleReceived(true); }
    }
  }, [loadData]);

  const handleReceiveOracle = async () => {
    if (alreadyUsedToday || oracleLoading) return; setOracleLoading(true);
    try { const res = await fetch("/api/oracle",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lang})}); const data = await res.json();
      setOracleMessage(data.message); setOracleRarity(data.rarity); setOracleReceived(true); setAlreadyUsedToday(true);
      localStorage.setItem("winkadia-last-oracle",new Date().toISOString()); localStorage.setItem("winkadia-oracle-message",data.message); localStorage.setItem("winkadia-oracle-rarity",data.rarity);
    } catch(e){console.error(e);} finally{setOracleLoading(false);}
  };

  const handleShareOracle = async () => {
    if (!user || oracleShared) return;
    try { await addOracle({userId:user.uid,userName:user.displayName||user.email?.split("@")[0]||"Anon",userGender:user.gender,message:oracleMessage,rarity:oracleRarity,lang}); setOracleShared(true); } catch(e){console.error(e);}
  };

  const ws = user?.gender==="male"?t.sanctuary.welcomeSuffix_male:user?.gender==="female"?t.sanctuary.welcomeSuffix_female:t.sanctuary.welcomeSuffix_other;
  const rl = oracleRarity==="rare"?t.oracle.rare:oracleRarity==="epic"?t.oracle.epic:t.oracle.legend;

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 text-center animate-fade-in-up" style={{animationDelay:"0.1s",animationFillMode:"both"}}>
        <Sparkles size={36} className="animate-float" style={{color:"var(--pink-500)",margin:"0 auto 24px auto",display:"block"}}/>
        {user && <p className="text-heading text-sm tracking-[3px] uppercase mb-5" style={{color:"var(--purple-500)",opacity:0.8}}>{t.sanctuary.welcome}, {user.displayName||user.email?.split("@")[0]} {ws}</p>}
        <h1 className="text-display text-3xl sm:text-5xl lg:text-6xl text-pink-gradient mb-8" style={{fontWeight:900,lineHeight:1.3}}>{t.sanctuary.heroTitle}</h1>
        <p className="text-lg sm:text-xl" style={{color:"var(--text-secondary)",maxWidth:"672px",margin:"0 auto"}}>{t.sanctuary.heroSubtitle}</p>
        <div className="ornate-divider">♡ ♡ ♡</div>
      </section>

      {/* Intro */}
      <section className="section-gap animate-fade-in-up" style={{animationDelay:"0.2s",animationFillMode:"both"}}>
        <div className="section-header"><h2 className="text-heading text-xl sm:text-2xl tracking-[4px] text-pink-gradient mb-6">{t.sanctuary.introTitle}</h2></div>
        <div className="card-sanctuary p-8 sm:p-12 text-center" style={{maxWidth:"768px",margin:"0 auto"}}>
          <p className="text-base sm:text-lg leading-relaxed" style={{color:"var(--text-secondary)"}}>{t.sanctuary.introDesc}</p>
        </div>
      </section>

      {/* Oracle */}
      <section className="section-gap animate-fade-in-up" style={{animationDelay:"0.3s",animationFillMode:"both"}}>
        <div className="section-header">
          <h2 className="text-heading text-xl sm:text-2xl tracking-[4px] text-pink-gradient mb-3">{t.oracle.title}</h2>
          <p className="text-sm" style={{color:"var(--text-muted)"}}>{t.oracle.subtitle}</p>
        </div>
        <div className="text-center" style={{maxWidth:"512px",margin:"0 auto"}}>
          {!oracleReceived && !oracleLoading && (
            <div>
              <button onClick={handleReceiveOracle} disabled={alreadyUsedToday} className="btn-pink text-base px-12 py-4 animate-pulse-glow" style={{opacity:alreadyUsedToday?0.5:1,fontSize:"16px"}}><span>♡ {t.oracle.button} ♡</span></button>
              {alreadyUsedToday && <p className="mt-4 text-sm" style={{color:"var(--text-muted)"}}>{t.oracle.alreadyUsed}</p>}
            </div>
          )}
          {oracleLoading && (
            <div className="py-12">
              <Sparkles size={48} className="animate-float" style={{color:"var(--pink-400)",margin:"0 auto 24px auto",display:"block"}}/>
              <p className="text-heading text-sm tracking-[2px]" style={{color:"var(--pink-500)",opacity:0.7}}>{t.oracle.loading}</p>
              <div className="mt-6 h-[1px] overflow-hidden rounded-full" style={{width:"192px",margin:"24px auto 0",background:"var(--border)"}}><div className="h-full w-full animate-shimmer"/></div>
            </div>
          )}
          {oracleReceived && !oracleLoading && (
            <div className="animate-oracle-reveal">
              <div className={`oracle-card oracle-card-${oracleRarity}`} style={{maxWidth:"448px",margin:"0 auto"}}><div className="oracle-card-inner">
                <span className={`rarity-badge rarity-badge-${oracleRarity}`}>{rl}</span>
                <p className="text-lg sm:text-xl leading-relaxed mt-6 mb-6" style={{color:"var(--text-primary)",fontStyle:"italic"}}>&ldquo;{oracleMessage}&rdquo;</p>
                <p className="text-xs tracking-[3px] uppercase" style={{color:"var(--pink-400)",fontFamily:"var(--font-heading)"}}>— WINKADIA —</p>
              </div></div>
              {!oracleShared ? <button onClick={handleShareOracle} className="btn-outline mt-8 text-sm">♡ {t.oracle.share}</button> : <p className="mt-8 text-sm" style={{color:"var(--pink-500)"}}>✓ {t.oracle.shared}</p>}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      {/* <section className="section-gap animate-fade-in-up" style={{animationDelay:"0.4s",animationFillMode:"both"}}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[{icon:Eye,value:"27,761",label:t.sanctuary.totalViews},{icon:Users,value:"1,204",label:t.sanctuary.totalMembers},{icon:Film,value:"3",label:t.sanctuary.totalEpisodes},{icon:BookOpen,value:"1",label:t.sanctuary.totalSeries}].map((s)=>(
            <div key={s.label} className="card-sanctuary p-6 text-center">
              <s.icon size={24} style={{color:"var(--pink-400)",margin:"0 auto 12px auto",display:"block"}}/>
              <p className="text-2xl sm:text-3xl font-bold text-pink-gradient text-display">{s.value}</p>
              <p className="text-xs tracking-[2px] uppercase mt-2" style={{color:"var(--text-muted)",fontFamily:"var(--font-heading)"}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Featured */}
      {/* {videos.length > 0 && (
        <section className="section-gap animate-fade-in-up" style={{animationDelay:"0.5s",animationFillMode:"both"}}>
          <div className="section-header"><h2 className="text-heading text-xl sm:text-2xl tracking-[4px] text-pink-gradient">{t.sanctuary.featuredTitle}</h2></div>
          <VideoCard video={videos[0]} featured/>
        </section>
      )} */}

      {/* Exclusive */}
      {/* {exclusiveVideos.length > 0 && (
        <section className="section-gap animate-fade-in-up" style={{animationDelay:"0.6s",animationFillMode:"both"}}>
          <div className="section-header"><h2 className="text-heading text-xl sm:text-2xl tracking-[4px]" style={{color:"var(--purple-500)"}}>{t.sanctuary.exclusiveTitle}</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{exclusiveVideos.map((v)=><VideoCard key={v.id} video={v}/>)}</div>
        </section>
      )} */}

      {/* Latest */}
      {/* {videos.length > 1 && (
        <section className="section-gap animate-fade-in-up" style={{animationDelay:"0.7s",animationFillMode:"both"}}>
          <div className="flex items-center justify-center gap-6 mb-12">
            <h2 className="text-heading text-xl sm:text-2xl tracking-[4px] text-pink-gradient">{t.sanctuary.latestTitle}</h2>
            <Link href="/sanctuary/theater" className="flex items-center gap-1 text-sm transition-colors duration-300" style={{color:"var(--pink-500)",fontFamily:"var(--font-heading)",letterSpacing:"1px",textDecoration:"none"}}>{t.common.seeMore}<ChevronRight size={16}/></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{videos.slice(1).map((v)=><VideoCard key={v.id} video={v}/>)}</div>
        </section>
      )} */}

      {/* Announcements */}
      {/* {announcements.length > 0 && (
        <section className="section-gap animate-fade-in-up" style={{animationDelay:"0.8s",animationFillMode:"both"}}>
          <div className="section-header"><h2 className="text-heading text-xl sm:text-2xl tracking-[4px] text-pink-gradient">{t.sanctuary.announcementsTitle}</h2></div>
          <div className="space-y-5" style={{maxWidth:"768px",margin:"0 auto"}}>
            {announcements.map((ann)=>(
              <div key={ann.id} className="card-sanctuary p-6 sm:p-8 flex items-start gap-5">
                <ScrollText size={24} className="mt-1 shrink-0" style={{color:"var(--pink-400)"}}/>
                <div>
                  <h3 className="text-heading text-base mb-2" style={{color:"var(--purple-600)"}}>{localized(ann.title)}</h3>
                  <p className="text-sm leading-relaxed" style={{color:"var(--text-secondary)"}}>{localized(ann.content)}</p>
                  <p className="text-xs mt-3" style={{color:"var(--text-light)"}}>{ann.createdAt?new Date(ann.createdAt).toLocaleDateString(lang==="ko"?"ko-KR":"en-US"):""}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )} */}

      {loaded && videos.length === 0 && (
        <section className="text-center py-20">
          <Sparkles size={48} className="animate-float" style={{color:"var(--pink-300)",margin:"0 auto 16px auto",display:"block"}}/>
          <p className="text-heading text-lg tracking-[2px]" style={{color:"var(--text-muted)"}}>{t.theater.noVideos}</p>
        </section>
      )}
    </div>
  );
}
