// src/app/login/page.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useState } from "react"; // 입력값, 화면 모드, 로딩 상태 같은 컴포넌트 내부 상태를 관리하기 위해 useState를 가져옴
import { useRouter } from "next/navigation"; // 로그인 성공 후 다른 페이지로 이동시키기 위해 Next.js 라우터를 가져옴
import { useAuth } from "@/contexts/AuthContext"; // 이메일 로그인, 회원가입, 구글 로그인, 비밀번호 재설정 기능을 사용하기 위해 인증 컨텍스트를 가져옴
import { useLanguage } from "@/contexts/LanguageContext"; // 화면 문구를 현재 언어에 맞게 가져오기 위해 언어 컨텍스트를 가져옴
import LanguageToggle from "@/components/ui/LanguageToggle"; // 로그인 화면 오른쪽 위에서 언어를 바꾸는 컴포넌트를 가져옴
import { Eye, EyeOff, Heart, Lock, Sparkles, UserRound } from "lucide-react"; // 로그인 화면에 사용할 아이콘들을 가져옴

export default function LoginPage() { // 로그인, 회원가입, 비밀번호 재설정 화면을 담당하는 페이지 컴포넌트임
  const { loginWithEmail, signUpWithEmail, loginWithGoogle, resetPassword } =
    useAuth(); // AuthContext에서 인증 관련 함수들을 꺼내옴

  const { t } = useLanguage(); // 현재 언어에 맞는 번역 문구를 꺼내옴
  const router = useRouter(); // 로그인이나 회원가입 성공 후 페이지 이동을 처리하기 위해 사용함

  const [mode, setMode] = useState<"login" | "signup" | "reset">("login"); // 현재 폼 모드를 저장함
  const [email, setEmail] = useState(""); // 이메일 입력값을 저장함
  const [password, setPassword] = useState(""); // 비밀번호 입력값을 저장함
  const [confirmPass, setConfirmPass] = useState(""); // 회원가입 때 비밀번호 확인 입력값을 저장함
  const [displayName, setDisplayName] = useState(""); // 회원가입 때 사용할 표시 이름을 저장함
  const [gender, setGender] = useState("other"); // 회원가입 때 선택한 성별 값을 저장함
  const [showPassword, setShowPassword] = useState(false); // 비밀번호를 보이게 할지 숨길지 저장함
  const [error, setError] = useState(""); // 로그인, 회원가입, 비밀번호 재설정 중 발생한 에러 메시지를 저장함
  const [resetSent, setResetSent] = useState(false); // 비밀번호 재설정 이메일을 보냈는지 저장함
  const [loading, setLoading] = useState(false); // 버튼 중복 클릭을 막고 처리 중 상태를 보여주기 위해 로딩 상태를 저장함

  const handleEmail = async (e: React.FormEvent) => { // 이메일 로그인, 회원가입, 비밀번호 재설정 폼 제출을 처리함
    e.preventDefault(); // 기본 form 제출 동작으로 페이지가 새로고침되는 것을 막음
    setError(""); // 이전 에러 메시지를 초기화함
    setLoading(true); // 요청이 시작됐으므로 로딩 상태로 바꿈

    try {
      if (mode === "login") { // 현재 모드가 로그인일 때 이메일과 비밀번호로 로그인함
        await loginWithEmail(email, password);
        router.push("/sanctuary"); // 로그인 성공 후 sanctuary 페이지로 이동함
      } else if (mode === "signup") { // 현재 모드가 회원가입일 때 회원가입 검사를 진행함
        if (password !== confirmPass) { // 비밀번호와 비밀번호 확인값이 다르면 에러 처리함
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        if (password.length < 6) { // Firebase 이메일 비밀번호 인증 기준에 맞게 최소 길이를 검사함
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }

        await signUpWithEmail(email, password, displayName, gender); // 이메일, 비밀번호, 표시 이름, 성별을 사용해 회원가입을 진행함
        router.push("/sanctuary"); // 회원가입 성공 후 sanctuary 페이지로 이동함
      } else if (mode === "reset") { // 현재 모드가 비밀번호 재설정일 때 재설정 메일을 보냄
        await resetPassword(email);
        setResetSent(true); // 재설정 메일 발송 완료 상태로 바꿈
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : t.auth.loginError; // 에러가 Error 객체면 실제 메시지를 사용하고 아니면 기본 로그인 에러 문구를 사용함

      setError(msg); // 화면에 보여줄 에러 메시지를 저장함
    } finally {
      setLoading(false); // 성공하든 실패하든 요청이 끝나면 로딩 상태를 해제함
    }
  };

  const handleGoogle = async () => { // 구글 로그인 버튼 클릭을 처리함
    setError(""); // 이전 에러 메시지를 초기화함
    setLoading(true); // 구글 로그인 요청이 시작됐으므로 로딩 상태로 바꿈

    try {
      await loginWithGoogle(); // Firebase 구글 로그인을 실행함
      router.push("/sanctuary"); // 구글 로그인 성공 후 sanctuary 페이지로 이동함
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : t.auth.loginError; // 에러가 Error 객체면 실제 메시지를 사용하고 아니면 기본 로그인 에러 문구를 사용함

      setError(msg); // 화면에 보여줄 에러 메시지를 저장함
    } finally {
      setLoading(false); // 성공하든 실패하든 요청이 끝나면 로딩 상태를 해제함
    }
  };

  const pageTitle =
    mode === "login"
      ? "당신을 윙카디아의\n성역으로 초대합니다"
      : mode === "signup"
        ? "윙카디아의 새로운\n인연을 기록합니다"
        : "잃어버린 인장을\n다시 찾아드립니다"; // 현재 모드에 맞는 로그인 카드 제목을 정함

  const submitLabel =
    mode === "login"
      ? t.auth.loginWithEmail
      : mode === "signup"
        ? t.auth.signUpWithEmail
        : t.auth.resetPassword; // 현재 모드에 맞는 제출 버튼 문구를 정함

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fbf7ff] via-[#f3e8ff] to-[#ead8ff] text-[#3a3047]"> {/* 로그인 페이지 전체를 감싸는 최상위 영역이며 연보라 그라데이션 배경을 적용함 */}
      <div className="pointer-events-none absolute left-[-140px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#f4d8ff]/60 blur-[120px]" /> {/* 좌측 상단에 보랏빛 번짐을 추가함 */}
      <div className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#dcb8ff]/50 blur-[140px]" /> {/* 우측 하단에 연보라빛 번짐을 추가함 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.78),_rgba(255,255,255,0.22)_42%,_transparent_72%)]" /> {/* 상단 중심부에 밝은 빛 번짐을 얹음 */}

      <div className="absolute inset-0 z-0 flex items-center justify-center px-4 py-8 sm:px-6"> {/* 배경 이미지를 화면에 꽉 채우지 않고 가운데에 배치하는 영역임 */}
        <div className="overflow-hidden rounded-[34px] ring-1 ring-white/70 shadow-[0_28px_100px_rgba(125,92,178,0.24)] sm:rounded-[40px]"> {/* 배경 사진 자체에 둥근 라운드와 그림자를 적용함 */}
          <img
            src="/images/login/login-bg.png"
            alt=""
            className="block h-auto w-[760px] max-w-[88vw] select-none rounded-[34px] object-contain opacity-80 sm:w-[820px] sm:rounded-[40px] md:w-[900px] lg:w-[980px]"
          /> {/* 배경 사진을 카드처럼 가운데에 표시하고 조금 연하게 만듦 */}
        </div>
      </div>

      <div className="absolute inset-0 z-10 bg-white/18" /> {/* 배경 위에 밝은 필터를 얹어 로그인 카드 가독성을 높임 */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-[#ead7ff]/80 to-transparent" /> {/* 하단을 부드러운 그라데이션으로 마무리함 */}

      <div className="relative z-20 flex min-h-screen flex-col px-5 py-6"> {/* 실제 로그인 콘텐츠를 배경 위에 올리는 영역임 */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-end"> {/* 상단 왼쪽 로고를 제거하고 언어 변경 버튼만 오른쪽에 배치함 */}
          <LanguageToggle /> {/* 언어 변경 버튼을 표시함 */}
        </header>

        <main className="flex flex-1 items-center justify-center py-8"> {/* 로그인 카드와 장식 이미지를 화면 중앙 영역에 배치함 */}
          <div className="relative flex w-full max-w-[900px] justify-center"> {/* 로그인 카드, 왼쪽 장식, 여자고양이 이미지의 위치 기준이 되는 래퍼임 */}
            <section className="relative z-30 flex min-h-[820px] w-full max-w-[560px] flex-col items-center justify-center rounded-[34px] border border-[#d8c7f6]/80 bg-white/80 px-7 py-12 text-center shadow-[0_28px_90px_rgba(118,82,166,0.22)] backdrop-blur-xl sm:min-h-[860px] sm:rounded-[42px] sm:px-12 sm:py-14"> {/* 로그인 창을 더 세로로 늘리고 내부 요소에 위아래 여백을 충분히 줌 */}
              <img
                src="/images/login/login-left-deco.png"
                alt=""
                className="pointer-events-none absolute left-0 top-0 z-40 w-[115px] select-none object-contain opacity-95 drop-shadow-[0_14px_30px_rgba(95,66,145,0.16)] sm:left-0 sm:top-0 sm:w-[140px] md:left-0 md:top-0 md:w-[160px] lg:left-0 lg:top-0 lg:w-[225px]"
              /> {/* 로그인 카드 안쪽 왼쪽 위에 고정되는 보라색 꽃 장식 이미지임 */}

              <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-gradient-to-b from-white/32 via-white/12 to-white/8 sm:rounded-[42px]" /> {/* 카드 안쪽에 얇은 밝은 그라데이션을 넣음 */}

              <div className="relative z-30 mx-auto mb-12 flex w-full max-w-[420px] flex-col items-center justify-center pt-14 text-center sm:pt-16"> {/* 로그인 카드 상단 문구 영역을 가운데 정렬하고 장식 이미지와 겹치지 않게 위쪽 여백을 둠 */}
                <img
                  src="/logo.png"
                  alt="WINKADIA"
                  className="mb-7 h-auto w-[330px] select-none object-contain drop-shadow-[0_4px_12px_rgba(134,102,201,0.16)] sm:w-[400px]"
                /> {/* WINKADIA 텍스트 대신 로고 이미지를 표시함 */}
                <div className="mx-auto mb-8 flex w-fit items-center justify-center gap-2 rounded-full bg-[#eee5ff]/95 px-5 py-2 text-center text-xs font-semibold tracking-wide text-[#8b68d8] shadow-sm">
                  <span className="flex h-4 w-4 items-center justify-center text-center">⌂</span>
                  <span className="block whitespace-nowrap text-center">마음이 쉬어가는 우리만의 공간</span>
                  <Sparkles size={12} className="shrink-0" />
                </div>

                <p className="mx-auto block max-w-[390px] whitespace-pre-line break-keep text-center text-[28px] font-bold leading-[1.65] text-[#3f3549] sm:text-[32px]">
                  {pageTitle}
                </p>
              </div>

              <div className="relative z-30 mx-auto flex w-full max-w-[420px] flex-col items-center justify-center gap-6 text-center"> {/* 폼 전체를 가운데 폭으로 맞추고 요소 사이 간격을 관리함 */}
                {mode !== "reset" && (
                  <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={loading}
                    className="relative flex h-[64px] w-full items-center justify-center rounded-[22px] border border-[#d9c8f4] bg-white/60 px-[78px] text-center text-base font-semibold text-[#7c68a0] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/84 disabled:cursor-not-allowed disabled:opacity-60"
                  > {/* 구글 로그인 버튼도 인풋과 같은 높이, 라운드, 안쪽 여백으로 맞춤 */}
                    <span className="absolute left-5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
                      G
                    </span>
                    <span className="pointer-events-none absolute left-[58px] top-1/2 h-7 w-px -translate-y-1/2 bg-[#dacdf1]" /> {/* 인풋과 같은 위치에 구분선을 둠 */}
                    <span className="block w-full text-center">{t.auth.loginWithGoogle}</span>
                  </button>
                )}

                <form onSubmit={handleEmail} className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center gap-6 text-center"> {/* 이메일 로그인, 회원가입, 비밀번호 재설정에 사용하는 form이며 인풋 사이 간격을 일정하게 맞춤 */}
                  {mode === "signup" && (
                    <div className="relative mx-auto w-full">
                      <UserRound className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#8e71d1]" size={20} />
                      <span className="pointer-events-none absolute left-[58px] top-1/2 h-7 w-px -translate-y-1/2 bg-[#dacdf1]" /> {/* 인풋 안에서 아이콘 영역과 텍스트 영역을 나누는 선임 */}
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="h-[64px] w-full rounded-[22px] border border-[#d9c8f4] bg-white/60 px-[78px] text-center text-base font-semibold text-[#4b4058] outline-none transition placeholder:text-center placeholder:text-[#a89ab8] focus:border-[#9d78db] focus:bg-white/84 focus:shadow-[0_0_0_4px_rgba(157,120,219,0.12)]"
                        required
                        placeholder={t.auth.displayName}
                      />
                    </div>
                  )}

                  {mode === "signup" && (
                    <div className="grid w-full grid-cols-3 gap-3"> {/* 회원가입 모드에서 성별 선택 버튼을 3칸으로 보여줌 */}
                      {(
                        [
                          { value: "male", label: t.auth.male },
                          { value: "female", label: t.auth.female },
                          { value: "other", label: t.auth.other },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setGender(opt.value)}
                          className="rounded-[16px] border px-2 py-3 text-center text-xs font-semibold transition"
                          style={{
                            borderColor:
                              gender === opt.value ? "#9d78db" : "#dfd1f6",
                            background:
                              gender === opt.value
                                ? "rgba(157,120,219,0.16)"
                                : "rgba(255,255,255,0.5)",
                            color: gender === opt.value ? "#7a56c6" : "#9182a4",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="relative mx-auto w-full">
                    <Heart className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#8e71d1]" size={20} />
                    <span className="pointer-events-none absolute left-[58px] top-1/2 h-7 w-px -translate-y-1/2 bg-[#dacdf1]" /> {/* 인풋 안에서 아이콘 영역과 텍스트 영역을 나누는 선임 */}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-[64px] w-full rounded-[22px] border border-[#d9c8f4] bg-white/60 px-[78px] text-center text-base font-semibold text-[#4b4058] outline-none transition placeholder:text-center placeholder:text-[#a89ab8] focus:border-[#9d78db] focus:bg-white/84 focus:shadow-[0_0_0_4px_rgba(157,120,219,0.12)]"
                      required
                      placeholder={mode === "reset" ? t.auth.email : "이메일 또는 아이디"}
                    />
                  </div>

                  {mode !== "reset" && (
                    <div className="relative mx-auto w-full">
                      <Lock className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#8e71d1]" size={20} />
                      <span className="pointer-events-none absolute left-[58px] top-1/2 h-7 w-px -translate-y-1/2 bg-[#dacdf1]" /> {/* 인풋 안에서 아이콘 영역과 텍스트 영역을 나누는 선임 */}
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-[64px] w-full rounded-[22px] border border-[#d9c8f4] bg-white/60 px-[78px] text-center text-base font-semibold text-[#4b4058] outline-none transition placeholder:text-center placeholder:text-[#a89ab8] focus:border-[#9d78db] focus:bg-white/84 focus:shadow-[0_0_0_4px_rgba(157,120,219,0.12)]"
                        required
                        minLength={6}
                        placeholder={t.auth.password}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8e71d1] transition hover:text-[#7958c8]"
                      > {/* 비밀번호 보이기와 숨기기를 전환하는 버튼임 */}
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  )}

                  {mode === "signup" && (
                    <div className="relative mx-auto w-full">
                      <Lock className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#8e71d1]" size={20} />
                      <span className="pointer-events-none absolute left-[58px] top-1/2 h-7 w-px -translate-y-1/2 bg-[#dacdf1]" /> {/* 인풋 안에서 아이콘 영역과 텍스트 영역을 나누는 선임 */}
                      <input
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="h-[64px] w-full rounded-[22px] border border-[#d9c8f4] bg-white/60 px-[78px] text-center text-base font-semibold text-[#4b4058] outline-none transition placeholder:text-center placeholder:text-[#a89ab8] focus:border-[#9d78db] focus:bg-white/84 focus:shadow-[0_0_0_4px_rgba(157,120,219,0.12)]"
                        required
                        minLength={6}
                        placeholder={t.auth.confirmPassword}
                      />
                    </div>
                  )}

                  {error && (
                    <div className="mx-auto w-full rounded-[18px] border border-pink-200 bg-pink-50/80 px-4 py-3 text-center text-sm font-medium text-pink-500"> {/* 에러 메시지가 있을 때만 에러 박스를 보여줌 */}
                      ⚠ {error}
                    </div>
                  )}

                  {resetSent && (
                    <div className="mx-auto w-full rounded-[18px] border border-purple-200 bg-purple-50/80 px-4 py-3 text-center text-sm font-medium text-[#7f61c8]"> {/* 비밀번호 재설정 이메일 발송에 성공했을 때 안내 박스를 보여줌 */}
                      ✦ {t.auth.resetSent}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative mx-auto mt-2 flex h-[66px] w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-[#8d67d6] via-[#8157ca] to-[#7350be] px-6 text-center text-base font-bold text-white shadow-[0_16px_36px_rgba(125,86,200,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(125,86,200,0.42)] disabled:cursor-not-allowed disabled:opacity-60"
                  > {/* 현재 모드에 맞는 제출 버튼이며 아이콘과 문구를 가운데 기준으로 정렬함 */}
                    <Sparkles size={18} className="absolute left-[calc(50%-62px)] top-1/2 -translate-y-1/2" />
                    <span className="block w-full text-center">{loading ? t.common.loading : submitLabel}</span>
                  </button>
                </form>

                <div className="my-9 flex w-full items-center justify-center gap-4 text-[#9a7bd7]"> {/* 버튼 아래 장식 구분선이며 위아래 공간을 일정하게 둠 */}
                  <span className="h-px flex-1 bg-[#d9c8f6]" />
                  <Heart size={17} />
                  <span className="h-px flex-1 bg-[#d9c8f6]" />
                </div>

                <div className="flex w-full flex-col items-center justify-center text-center"> {/* 로그인, 회원가입, 비밀번호 재설정 모드를 전환하는 하단 영역임 */}
                  {mode === "login" && (
                    <div className="flex w-full flex-col items-center justify-center space-y-5 text-center">
                      <label className="inline-flex items-center justify-center gap-2 text-center text-sm font-semibold text-[#9586a7]"> {/* 참고 이미지처럼 로그인 상태 유지 표시를 보여줌 */}
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 accent-[#8d67d6]"
                        />
                        <span>로그인 상태 유지</span>
                      </label>

                      <div className="flex items-center justify-center gap-4 text-center text-sm font-semibold text-[#9586a7]">
                        <button
                          type="button"
                          onClick={() => {
                            setMode("signup");
                            setError("");
                            setResetSent(false);
                          }}
                          className="transition hover:text-[#7857c8]"
                        >
                          회원가입
                        </button>
                        <span className="text-[#c8bdd4]">|</span>
                        <button
                          type="button"
                          onClick={() => {
                            setMode("reset");
                            setError("");
                            setResetSent(false);
                          }}
                          className="transition hover:text-[#7857c8]"
                        >
                          비밀번호 찾기
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === "signup" && (
                    <p className="text-center text-sm text-[#9282a4]">
                      {t.auth.hasAccount}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("login");
                          setError("");
                          setResetSent(false);
                        }}
                        className="font-bold text-[#805dd0] transition hover:text-[#6543b8]"
                      >
                        {t.auth.loginWithEmail}
                      </button>
                    </p>
                  )}

                  {mode === "reset" && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError("");
                        setResetSent(false);
                      }}
                      className="text-center text-sm font-bold text-[#805dd0] transition hover:text-[#6543b8]"
                    >
                      ← {t.common.back}
                    </button>
                  )}
                </div>
              </div>
            </section>

            <img
              src="/images/login/login-figure.png"
              alt=""
              className="pointer-events-none absolute bottom-[-120px] right-[32px] z-40 w-[190px] select-none object-contain drop-shadow-[0_18px_36px_rgba(95,66,145,0.20)] sm:bottom-[-145px] sm:right-[24px] sm:w-[250px] md:bottom-[-165px] md:right-[18px] md:w-[310px] lg:bottom-[-120px] lg:right-[18px] lg:w-[360px]"
            /> {/* 여자와 고양이 이미지를 더 크게 키우고 로그인 카드 오른쪽 아래에 배치함 */}
          </div>
        </main>

        <footer className="pb-5 text-center text-xs font-semibold tracking-wide text-[#9b86bd]"> {/* 로그인 화면 하단 저작권 문구 영역임 */}
          © WINKADIA. All rights reserved. ♡
        </footer>
      </div>
    </div>
  );
}