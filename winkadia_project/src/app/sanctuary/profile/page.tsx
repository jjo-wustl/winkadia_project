"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Eye, MessageCircle, Heart, Settings, LogOut, Sparkles } from "lucide-react";
export default function ProfilePage() {
  const { user, logout } = useAuth(); const { t, lang } = useLanguage();
  if (!user) return null;
  const gl = user.gender==="male"?(lang==="ko"?"영식":"Youngshik"):user.gender==="female"?(lang==="ko"?"영애":"Youngae"):(lang==="ko"?"축복받은 자":"Blessed One");
  const menu = [{icon:Eye,label:t.profile.watchHistory,color:"var(--pink-400)",count:12},{icon:MessageCircle,label:t.profile.myComments,color:"var(--purple-400)",count:5},{icon:Heart,label:t.profile.favorites,color:"var(--pink-500)",count:8},{icon:Settings,label:t.profile.settings,color:"#5fa8ff",count:null}];
  return (
    <div className="page-container" style={{maxWidth:"700px"}}>
      <section className="text-center py-16 sm:py-20">
        <h1 className="text-display text-3xl sm:text-4xl text-pink-gradient mb-4" style={{fontWeight:900}}>{t.profile.title}</h1>
        <p className="text-sm tracking-[2px]" style={{color:"var(--text-muted)"}}>{t.profile.subtitle}</p>
        <div className="ornate-divider">♡</div>
      </section>
      <div className="card-sanctuary p-8 sm:p-10 text-center mb-10 animate-fade-in-up" style={{animationDelay:"0.1s",animationFillMode:"both"}}>
        <div style={{position:"relative",display:"inline-block",marginBottom:"24px"}}>
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg, var(--pink-400), var(--purple-400))",boxShadow:"var(--glow-pink)",margin:"0 auto"}}>
            {user.photoURL?<img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover"/>:
            <span className="text-3xl font-bold" style={{color:"#fff",fontFamily:"var(--font-display)"}}>{(user.displayName||user.email||"W")[0].toUpperCase()}</span>}
          </div>
        </div>
        <h2 className="text-heading text-2xl mb-2" style={{color:"var(--purple-600)"}}>{user.displayName||user.email?.split("@")[0]}</h2>
        <p className="text-sm tracking-[2px] uppercase mb-5" style={{color:"var(--pink-500)",fontFamily:"var(--font-heading)"}}>{gl}</p>
        <p className="text-xs flex items-center justify-center gap-2" style={{color:"var(--text-light)"}}><Calendar size={14}/>{t.profile.memberSince}: {user.joinedAt?new Date(user.joinedAt).toLocaleDateString(lang==="ko"?"ko-KR":"en-US"):"—"}</p>
        <p className="text-xs mt-2" style={{color:"var(--text-light)"}}>{user.email}</p>
      </div>
      <div className="space-y-4 mb-12">
        {menu.map((m,i)=>(
          <button key={i} className="card-sanctuary w-full p-6 flex items-center justify-between group animate-fade-in-up cursor-pointer text-left" style={{animationDelay:`${0.2+i*0.1}s`,animationFillMode:"both"}}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{background:`${m.color}15`,border:`1px solid ${m.color}30`}}><m.icon size={18} style={{color:m.color}}/></div>
              <span className="text-heading text-sm tracking-[1px]" style={{color:"var(--text-primary)"}}>{m.label}</span>
            </div>
            {m.count!==null && <span className="text-xs px-3 py-1 rounded-full" style={{background:`${m.color}15`,color:m.color,fontFamily:"var(--font-heading)"}}>{m.count}</span>}
          </button>
        ))}
      </div>
      <div className="text-center pb-16 animate-fade-in-up" style={{animationDelay:"0.7s",animationFillMode:"both"}}>
        <button onClick={logout} className="inline-flex items-center gap-2 px-8 py-3 rounded-full border transition-all duration-300" style={{borderColor:"var(--pink-300)",color:"var(--pink-500)",fontFamily:"var(--font-heading)",fontSize:"13px",letterSpacing:"1px"}}><LogOut size={16}/>{t.auth.logout}</button>
        <div className="mt-10"><Sparkles size={20} style={{color:"var(--pink-300)",margin:"0 auto",display:"block"}}/></div>
      </div>
    </div>
  );
}
