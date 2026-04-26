"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getOracles, toggleLikeOracle } from "@/lib/firestore";
import type { Oracle, OracleRarity } from "@/types";
import { Sparkles, Heart, ScrollText } from "lucide-react";
import Link from "next/link";
export default function CouncilPage() {
  const { user } = useAuth(); const { t, lang } = useLanguage();
  const [oracles, setOracles] = useState<Oracle[]>([]); const [loaded, setLoaded] = useState(false);
  const loadOracles = useCallback(async () => { try { setOracles(await getOracles(50)); } catch(e){console.error(e);} finally{setLoaded(true);} }, []);
  useEffect(() => { loadOracles(); }, [loadOracles]);
  const handleLike = async (id: string) => { if (!user) return; await toggleLikeOracle(id, user.uid); setOracles(await getOracles(50)); };
  const rl = (r: OracleRarity) => r==="rare"?t.oracle.rare:r==="epic"?t.oracle.epic:t.oracle.legend;
  const gl = (g?: string) => g==="male"?(lang==="ko"?"영식":"Youngshik"):g==="female"?(lang==="ko"?"영애":"Youngae"):"";
  return (
    <div className="page-container">
      <section className="text-center py-16 sm:py-20">
        <ScrollText size={36} className="animate-float" style={{color:"var(--pink-500)",margin:"0 auto 24px auto",display:"block"}}/>
        <h1 className="text-display text-3xl sm:text-4xl text-pink-gradient mb-4" style={{fontWeight:900}}>{t.council.title}</h1>
        <p className="text-sm tracking-[2px]" style={{color:"var(--text-muted)",maxWidth:"500px",margin:"0 auto"}}>{t.council.subtitle}</p>
        <div className="ornate-divider">♡</div>
        {loaded && oracles.length > 0 && <div className="card-sanctuary" style={{display:"inline-block",padding:"16px 32px"}}><p className="text-xs tracking-[2px] uppercase" style={{color:"var(--text-muted)",fontFamily:"var(--font-heading)"}}>{t.council.totalOracles}</p><p className="text-2xl font-bold text-pink-gradient text-display">{oracles.length}</p></div>}
      </section>
      {loaded && oracles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {oracles.map((o,i)=>(
            <div key={o.id} className="animate-fade-in-up" style={{animationDelay:`${i*0.05}s`,animationFillMode:"both"}}>
              <div className={`oracle-card oracle-card-${o.rarity}`}><div className="oracle-card-inner">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{background:"linear-gradient(135deg, var(--pink-400), var(--purple-400))",color:"#fff",fontFamily:"var(--font-heading)"}}>{(o.userName||"?")[0].toUpperCase()}</div>
                    <div className="text-left">
                      <p className="text-sm" style={{color:"var(--purple-600)",fontFamily:"var(--font-heading)"}}>{o.userName}</p>
                      {o.userGender && <p className="text-xs" style={{color:"var(--pink-400)"}}>{gl(o.userGender)}</p>}
                    </div>
                  </div>
                  <span className={`rarity-badge rarity-badge-${o.rarity}`}>{rl(o.rarity)}</span>
                </div>
                <p className="text-base leading-relaxed mb-5" style={{color:"var(--text-primary)",fontStyle:"italic"}}>&ldquo;{o.message}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{color:"var(--text-light)"}}>{o.createdAt?new Date(o.createdAt).toLocaleDateString(lang==="ko"?"ko-KR":"en-US"):""}</p>
                  <button onClick={()=>handleLike(o.id)} className="flex items-center gap-1 text-xs transition-colors duration-300" style={{color:o.likedBy?.includes(user?.uid||"")?"var(--pink-500)":"var(--text-light)"}}>
                    <Heart size={14} fill={o.likedBy?.includes(user?.uid||"")?"var(--pink-500)":"none"}/>{o.likes>0&&o.likes}
                  </button>
                </div>
              </div></div>
            </div>
          ))}
        </div>
      )}
      {loaded && oracles.length === 0 && (
        <div className="text-center py-20">
          <Sparkles size={48} className="animate-float" style={{color:"var(--pink-300)",margin:"0 auto 24px auto",display:"block"}}/>
          <p className="text-heading text-lg tracking-[2px] mb-8" style={{color:"var(--text-muted)"}}>{t.council.noOracles}</p>
          <Link href="/sanctuary" className="btn-pink" style={{textDecoration:"none",display:"inline-block"}}><span>♡ {t.council.goToSanctuary} ♡</span></Link>
        </div>
      )}
    </div>
  );
}
