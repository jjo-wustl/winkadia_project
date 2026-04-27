// src/contexts/LanguageContext.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"; // 언어 Context 생성, 사용, 상태 관리, 저장된 언어 불러오기를 위해 React 기능들을 가져옴
import type { Language } from "@/types"; // 프로젝트에서 사용하는 언어 타입을 가져옴
import ko from "@/i18n/ko"; // 한국어 번역 데이터를 가져옴
import en from "@/i18n/en"; // 영어 번역 데이터를 가져옴

type Translations = typeof ko; // 한국어 번역 객체 구조를 기준으로 전체 번역 타입을 정의함

interface LanguageContextType { // LanguageContext에서 제공할 값들의 타입을 정의함
  lang: Language; // 현재 선택된 언어임
  t: Translations; // 현재 언어에 맞는 번역 문구 모음임
  setLang: (lang: Language) => void; // 언어를 변경하는 함수임
  localized: (obj: Record<string, string> | undefined) => string; // 다국어 객체에서 현재 언어에 맞는 문자열을 꺼내는 함수임
}

const translations: Record<Language, Translations> = { ko, en }; // 언어 코드에 따라 번역 데이터를 찾을 수 있게 묶어둠

const LanguageContext = createContext<LanguageContextType>({ // 언어 상태를 전역으로 공유하기 위한 Context를 생성함
  lang: "ko", // 기본 언어를 한국어로 설정함
  t: ko, // 기본 번역 문구를 한국어로 설정함
  setLang: () => {}, // Provider 밖에서 호출되어도 에러가 나지 않게 기본 함수를 둠
  localized: () => "", // Provider 밖에서 호출되어도 빈 문자열을 반환하게 기본 함수를 둠
});

export function LanguageProvider({ children }: { children: React.ReactNode }) { // 앱 전체에 언어 상태와 번역 함수를 제공하는 Provider 컴포넌트임
  const [lang, setLangState] = useState<Language>("ko"); // 현재 선택된 언어를 저장함

  useEffect(() => { // 페이지가 처음 열릴 때 저장된 언어 설정을 불러옴
    const saved = localStorage.getItem("winkadia-lang") as Language | null; // localStorage에서 이전에 선택한 언어를 가져옴
    if (saved && (saved === "ko" || saved === "en")) { // 저장된 값이 ko 또는 en이면 유효한 언어로 판단함
      setLangState(saved); // 저장된 언어로 상태를 변경함
    }
  }, []);

  const setLang = useCallback((newLang: Language) => { // 언어를 변경하고 저장하는 함수임
    setLangState(newLang); // 화면에서 사용할 언어 상태를 변경함
    localStorage.setItem("winkadia-lang", newLang); // 새 언어 값을 localStorage에 저장함
  }, []);

  const localized = useCallback(
    (obj: Record<string, string> | undefined) => { // 다국어 객체에서 현재 언어에 맞는 값을 꺼내는 함수임
      if (!obj) return ""; // 객체가 없으면 빈 문자열을 반환함
      return obj[lang] || obj["ko"] || obj["en"] || ""; // 현재 언어 값을 우선 사용하고 없으면 한국어, 영어 순서로 대체함
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, localized }}> {/* 현재 언어, 번역 문구, 언어 변경 함수, 다국어 선택 함수를 하위 컴포넌트에 전달함 */}
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext); // 다른 컴포넌트에서 언어 Context를 쉽게 사용할 수 있게 만든 커스텀 훅임