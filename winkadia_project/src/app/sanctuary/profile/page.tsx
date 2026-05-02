// src/app/sanctuary/profile/page.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useAuth } from "@/contexts/AuthContext"; // 현재 로그인한 사용자 정보와 로그아웃 함수를 가져오기 위해 사용함
import { useLanguage } from "@/contexts/LanguageContext"; // 현재 언어에 맞는 프로필 문구를 가져오기 위해 사용함
import { Calendar, LogOut, Sparkles } from "lucide-react"; // 프로필 화면에서 사용할 아이콘들을 가져옴

export default function ProfilePage() { // 로그인한 사용자의 프로필 화면을 담당하는 페이지 컴포넌트임
  const { user, logout } = useAuth(); // 현재 사용자 정보와 로그아웃 함수를 가져옴
  const { t, lang } = useLanguage(); // 번역 문구와 현재 언어 값을 가져옴

  if (!user) return null; // 사용자 정보가 없으면 아무 화면도 보여주지 않음

  const gl =
    user.gender === "male"
      ? lang === "ko"
        ? "영식"
        : "Youngshik"
      : user.gender === "female"
        ? lang === "ko"
          ? "영애"
          : "Youngae"
        : lang === "ko"
          ? "축복받은 자"
          : "Blessed One"; // 사용자 성별과 언어에 따라 표시할 호칭을 정함

  return (
    <div className="page-container" style={{ maxWidth: "700px" }}> {/* 프로필 페이지 전체 콘텐츠 폭을 제한하는 컨테이너임 */}
      <section className="text-center py-16 sm:py-20"> {/* 프로필 페이지 제목 영역임 */}
        <h1
          className="text-display text-3xl sm:text-4xl text-pink-gradient mb-4"
          style={{ fontWeight: 900 }}
        >
          {t.profile.title}
        </h1>

        <p
          className="text-sm tracking-[2px]"
          style={{ color: "var(--text-muted)" }}
        >
          {t.profile.subtitle}
        </p>

        <div className="ornate-divider">♡</div> {/* 제목 아래 장식 구분선임 */}
      </section>

      <div
        className="card-sanctuary p-8 sm:p-10 text-center mb-10 animate-fade-in-up"
        style={{ animationDelay: "0.1s", animationFillMode: "both" }}
      > {/* 사용자 대표 정보가 들어가는 프로필 카드임 */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginBottom: "24px",
          }}
        > {/* 프로필 이미지를 가운데 배치하기 위한 래퍼임 */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--pink-400), var(--purple-400))",
              boxShadow: "var(--glow-pink)",
              margin: "0 auto",
            }}
          > {/* 사용자 사진 또는 이름 첫 글자를 보여주는 원형 아바타임 */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span
                className="text-3xl font-bold"
                style={{ color: "#fff", fontFamily: "var(--font-display)" }}
              >
                {(user.displayName || user.email || "W")[0].toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <h2
          className="text-heading text-2xl mb-2"
          style={{ color: "var(--purple-600)" }}
        >
          {user.displayName || user.email?.split("@")[0]}
        </h2>

        <p
          className="text-sm tracking-[2px] uppercase mb-5"
          style={{ color: "var(--pink-500)", fontFamily: "var(--font-heading)" }}
        >
          {gl}
        </p>

        <p
          className="text-xs flex items-center justify-center gap-2"
          style={{ color: "var(--text-light)" }}
        >
          <Calendar size={14} />
          {t.profile.memberSince}:{" "}
          {user.joinedAt
            ? new Date(user.joinedAt).toLocaleDateString(
                lang === "ko" ? "ko-KR" : "en-US"
              )
            : "—"}
        </p>

        <p className="text-xs mt-2" style={{ color: "var(--text-light)" }}>
          {user.email}
        </p>
      </div>

      <div
        className="text-center pb-16 animate-fade-in-up"
        style={{ animationDelay: "0.7s", animationFillMode: "both" }}
      > {/* 로그아웃 버튼과 하단 장식을 담는 영역임 */}
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full border transition-all duration-300"
          style={{
            borderColor: "var(--pink-300)",
            color: "var(--pink-500)",
            fontFamily: "var(--font-heading)",
            fontSize: "13px",
            letterSpacing: "1px",
          }}
        > {/* 로그아웃을 실행하는 버튼임 */}
          <LogOut size={16} />
          {t.auth.logout}
        </button>

        <div className="mt-10">
          <Sparkles
            size={20}
            style={{
              color: "var(--pink-300)",
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}