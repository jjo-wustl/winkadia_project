"use client";
import { useLanguage } from "@/contexts/LanguageContext";
export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button onClick={() => setLang(lang === "ko" ? "en" : "ko")} className="flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all duration-300 text-sm font-medium tracking-wider"
      style={{ borderColor: "var(--border)", fontFamily: "var(--font-heading)", color: "var(--purple-500)", fontSize: "12px", background: "var(--bg-card)" }} title="Toggle Language">
      <span style={{ opacity: lang === "ko" ? 1 : 0.4, transition: "opacity 0.3s" }}>KOR</span>
      <span style={{ color: "var(--border-strong)" }}>|</span>
      <span style={{ opacity: lang === "en" ? 1 : 0.4, transition: "opacity 0.3s" }}>ENG</span>
    </button>
  );
}
