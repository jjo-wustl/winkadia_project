"use client";
import { useLanguage } from "@/contexts/LanguageContext";
export default function LoadingScreen() {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sanctuary">
      <div className="relative">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
            <defs><linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="var(--pink-400)"/><stop offset="100%" stopColor="var(--purple-400)"/></linearGradient></defs>
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#pinkGrad)" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#pinkGrad)" strokeWidth="1" opacity="0.3"/>
            <text x="50" y="56" textAnchor="middle" fontFamily="Cinzel Decorative, serif" fontSize="18" fill="var(--pink-500)" fontWeight="700">W</text>
          </svg>
        </div>
      </div>
      <p className="mt-8 text-heading tracking-[4px] text-sm uppercase" style={{ color: "var(--pink-500)", opacity: 0.7 }}>{t.common.loading}</p>
      <div className="mt-6 h-[1px] overflow-hidden rounded-full" style={{ width: "192px", margin: "0 auto", background: "var(--border)" }}>
        <div className="h-full w-full animate-shimmer" />
      </div>
    </div>
  );
}
