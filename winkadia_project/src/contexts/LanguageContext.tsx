"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Language } from "@/types";
import ko from "@/i18n/ko";
import en from "@/i18n/en";

type Translations = typeof ko;

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  localized: (obj: Record<string, string> | undefined) => string;
}

const translations: Record<Language, Translations> = { ko, en };

const LanguageContext = createContext<LanguageContextType>({
  lang: "ko",
  t: ko,
  setLang: () => {},
  localized: () => "",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("winkadia-lang") as Language | null;
    if (saved && (saved === "ko" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("winkadia-lang", newLang);
  }, []);

  const localized = useCallback(
    (obj: Record<string, string> | undefined) => {
      if (!obj) return "";
      return obj[lang] || obj["ko"] || obj["en"] || "";
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, localized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
