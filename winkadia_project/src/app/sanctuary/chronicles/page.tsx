"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Users, Clock, Crown, Sword, Heart, Star, Shield } from "lucide-react";
type Tab = "lore"|"characters"|"timeline";
export default function ChroniclesPage() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("lore");
  const tabs: {key:Tab;label:string;icon:React.ReactNode}[] = [{key:"lore",label:t.chronicles.worldLore,icon:<BookOpen size={18}/>},{key:"characters",label:t.chronicles.characters,icon:<Users size={18}/>},{key:"timeline",label:t.chronicles.timeline,icon:<Clock size={18}/>}];
  const characters = [
    {name:{ko:"윙카디아",en:"Winkadia"},title:{ko:"운명과 사랑의 신",en:"God of Destiny and Love"},desc:{ko:"모든 이야기의 시작이자 끝. 윙카디아는 수많은 평행 세계에서 운명의 실을 짜며, 선택받은 자들에게 이야기를 보여준다.",en:"The beginning and end of all stories. Winkadia weaves threads of destiny across countless parallel worlds."},icon:Star,color:"var(--pink-500)"},
    {name:{ko:"아리아 폰 크레센트",en:"Aria von Crescent"},title:{ko:"크레센트 공작가의 영애",en:"Lady of House Crescent"},desc:{ko:"황금빛 머리카락과 보랏빛 눈을 가진 공작가의 딸. 무도회에서 운명적인 만남을 하게 된다.",en:"The duke's daughter with golden hair and violet eyes. She encounters a fateful meeting at the ball."},icon:Crown,color:"var(--purple-500)"},
    {name:{ko:"카엘 아슈레인",en:"Kael Ashrain"},title:{ko:"정체불명의 흑기사",en:"The Mysterious Black Knight"},desc:{ko:"어둠 속에서 나타난 기사. 그의 검은 갑옷 아래 감춰진 비밀은 두 왕국의 운명을 뒤흔들 진실을 품고 있다.",en:"A knight who appeared from the darkness. The secret beneath his black armor holds a truth that will shake two kingdoms."},icon:Sword,color:"#5fa8ff"},
    {name:{ko:"엘리제 루미나",en:"Elise Lumina"},title:{ko:"아리아의 시녀이자 절친한 벗",en:"Aria's Handmaiden and Closest Friend"},desc:{ko:"밝은 미소 뒤에 날카로운 통찰을 숨긴 시녀. 위기의 순간마다 지혜로운 조언을 건넨다.",en:"A handmaiden who hides sharp insight behind a bright smile. She offers wise counsel in moments of crisis."},icon:Heart,color:"var(--pink-400)"},
    {name:{ko:"레오하르트 폰 카르디아",en:"Leonhart von Cardia"},title:{ko:"카르디아 왕국의 제1왕자",en:"First Prince of Cardia Kingdom"},desc:{ko:"완벽한 왕자의 가면 아래 야심을 품은 자. 아리아에게 정략 결혼을 제안하지만 더 깊은 음모가 숨어 있다.",en:"One who harbors ambition beneath the mask of a perfect prince. Deeper schemes lie behind his intentions."},icon:Shield,color:"var(--gold-500)"},
  ];
  const timeline = [
    {year:{ko:"태초",en:"The Beginning"},event:{ko:"윙카디아 신이 세계를 창조하고, 운명의 실을 짜기 시작하다.",en:"The god Winkadia creates the world and begins weaving threads of destiny."}},
    {year:{ko:"제1기 — 건국",en:"Era I — Foundation"},event:{ko:"크레센트 공작가와 카르디아 왕국이 세워지다.",en:"House Crescent and the Cardia Kingdom are established."}},
    {year:{ko:"제2기 — 번영",en:"Era II — Prosperity"},event:{ko:"두 세력의 동맹 하에 대륙은 번영을 누리다. 그러나 왕실 내부에서 암투가 시작되다.",en:"The continent prospers under the alliance. However, secret struggles begin within the royal court."}},
    {year:{ko:"제3기 — 균열",en:"Era III — The Rift"},event:{ko:"정체불명의 흑기사가 나타나다. 무도회에서의 만남, 금지된 감정의 시작.",en:"A mysterious black knight appears. A meeting at the ball, the beginning of forbidden feelings."}},
    {year:{ko:"제4기 — ???",en:"Era IV — ???"},event:{ko:"아직 기록되지 않은 운명... 윙카디아만이 그 결말을 알고 있다.",en:"A destiny not yet recorded... Only Winkadia knows its conclusion."}},
  ];
  return (
    <div className="page-container">
      <section className="text-center py-16 sm:py-20">
        <h1 className="text-display text-3xl sm:text-4xl text-pink-gradient mb-4" style={{fontWeight:900}}>{t.chronicles.title}</h1>
        <p className="text-sm tracking-[2px]" style={{color:"var(--text-muted)"}}>{t.chronicles.subtitle}</p>
        <div className="ornate-divider">♡</div>
      </section>
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {tabs.map((tab)=>(<button key={tab.key} onClick={()=>setActiveTab(tab.key)} className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs tracking-[2px] uppercase transition-all duration-300" style={{fontFamily:"var(--font-heading)",border:`2px solid ${activeTab===tab.key?"var(--pink-500)":"var(--border)"}`,background:activeTab===tab.key?"var(--pink-100)":"transparent",color:activeTab===tab.key?"var(--pink-600)":"var(--text-muted)"}}>{tab.icon}{tab.label}</button>))}
      </div>
      {activeTab==="lore" && <div className="space-y-8 pb-16" style={{maxWidth:"768px",margin:"0 auto"}}>
        {[{titleKo:"♡ 윙카디아 — 운명의 신 ♡",titleEn:"♡ Winkadia — God of Destiny ♡",desc:t.chronicles.godDesc},{titleKo:"♡ 신전 — 선택받은 자의 성소 ♡",titleEn:"♡ The Sanctuary — Sacred Place ♡",desc:t.chronicles.templeDesc},{titleKo:"♡ 세계 — 무한한 가능성 ♡",titleEn:"♡ The Realm — Infinite Possibilities ♡",desc:t.chronicles.realmDesc}].map((s,i)=>(
          <div key={i} className="card-sanctuary p-8 sm:p-10 text-center animate-fade-in-up" style={{animationDelay:`${i*0.15}s`,animationFillMode:"both"}}>
            <h3 className="text-heading text-lg mb-5 tracking-[2px]" style={{color:"var(--purple-500)"}}>{lang==="ko"?s.titleKo:s.titleEn}</h3>
            <p className="text-base leading-relaxed" style={{color:"var(--text-secondary)"}}>{s.desc}</p>
          </div>
        ))}
      </div>}
      {activeTab==="characters" && <div className="space-y-6 pb-16" style={{maxWidth:"768px",margin:"0 auto"}}>
        {characters.map((c,i)=>(
          <div key={i} className="card-sanctuary p-7 sm:p-9 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left animate-fade-in-up" style={{animationDelay:`${i*0.1}s`,animationFillMode:"both"}}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" style={{background:`${c.color}15`,border:`2px solid ${c.color}`}}><c.icon size={28} style={{color:c.color}}/></div>
            <div>
              <h3 className="text-heading text-lg mb-1" style={{color:c.color}}>{lang==="ko"?c.name.ko:c.name.en}</h3>
              <p className="text-xs tracking-[2px] uppercase mb-4" style={{color:"var(--text-muted)",fontFamily:"var(--font-heading)"}}>{lang==="ko"?c.title.ko:c.title.en}</p>
              <p className="text-sm leading-relaxed" style={{color:"var(--text-secondary)"}}>{lang==="ko"?c.desc.ko:c.desc.en}</p>
            </div>
          </div>
        ))}
      </div>}
      {activeTab==="timeline" && <div className="relative pb-16" style={{maxWidth:"768px",margin:"0 auto"}}>
        <div className="absolute top-0 bottom-0 w-[2px]" style={{left:"16px",background:"linear-gradient(180deg, var(--pink-400), var(--purple-300), transparent)",opacity:0.3}}/>
        <div className="space-y-10">
          {timeline.map((ev,i)=>(
            <div key={i} className="relative flex items-start gap-6 animate-fade-in-up" style={{animationDelay:`${i*0.15}s`,animationFillMode:"both"}}>
              <div className="absolute w-3 h-3 rounded-full mt-2" style={{left:"11px",background:"var(--pink-500)",boxShadow:"var(--glow-pink)",zIndex:10}}/>
              <div className="card-sanctuary p-6 sm:p-7" style={{marginLeft:"40px"}}>
                <p className="text-heading text-sm tracking-[2px] uppercase mb-3" style={{color:"var(--pink-500)"}}>{lang==="ko"?ev.year.ko:ev.year.en}</p>
                <p className="text-sm leading-relaxed" style={{color:"var(--text-secondary)"}}>{lang==="ko"?ev.event.ko:ev.event.en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}
