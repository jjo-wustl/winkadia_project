"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative mt-20" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, var(--pink-300), var(--purple-300), var(--pink-300), transparent)", opacity: 0.4 }}/>
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={20} style={{ color: "var(--pink-500)" }}/>
              <span className="text-display text-lg tracking-[4px] text-pink-gradient" style={{ fontWeight: 700 }}>WINKADIA</span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t.footer.madeWith}</p>
          </div>
          <div>
            <h4 className="text-heading text-sm tracking-[3px] uppercase mb-4" style={{ color: "var(--purple-500)" }}>♡ SANCTUARY ♡</h4>
            <div className="space-y-2 flex flex-col items-center">
              {[t.footer.terms, t.footer.privacy, t.footer.contact].map((label) => (
                <button key={label} className="block text-sm transition-all duration-300" style={{ color: "var(--text-muted)" }}>{label}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-heading text-sm tracking-[3px] uppercase mb-4" style={{ color: "var(--purple-500)" }}>{t.footer.followUs}</h4>
            <div className="flex justify-center gap-4">
              <a href="https://www.youtube.com/@%EC%9C%99%EC%B9%B4%EB%94%94%EC%95%84" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.instagram.com/winkadia?igsh=MTJqZXhvNDllaGFmMg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="ornate-divider mt-8">♡ ♡ ♡</div>
        <p className="text-center text-xs tracking-[2px]" style={{ color: "var(--text-light)" }}>{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
