// src/components/layout/Navbar.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useState } from "react"; // 모바일 메뉴 열림 상태를 관리하기 위해 useState를 가져옴
import Link from "next/link"; // 페이지 이동 링크를 만들기 위해 Link를 가져옴
import { usePathname } from "next/navigation"; // 현재 경로를 확인해 활성 메뉴를 표시하기 위해 usePathname을 가져옴
import { useAuth } from "@/contexts/AuthContext"; // 현재 사용자 정보와 로그아웃 함수를 가져오기 위해 인증 컨텍스트를 가져옴
import { useLanguage } from "@/contexts/LanguageContext"; // 현재 언어 상태와 번역 문구를 사용하기 위해 가져옴
import LanguageToggle from "@/components/ui/LanguageToggle"; // 언어 전환 버튼을 가져옴
import { LogIn, LogOut, Menu, Sparkles, User, X } from "lucide-react"; // 네비게이션에 사용할 아이콘들을 가져옴

export default function Navbar() { // sanctuary 영역 상단 네비게이션 컴포넌트임
  const { user, logout } = useAuth(); // 현재 사용자 정보와 로그아웃 함수를 가져옴
  const { t } = useLanguage(); // 번역 문구를 가져옴
  const pathname = usePathname(); // 현재 접속 중인 경로를 가져옴
  const [mobileOpen, setMobileOpen] = useState(false); // 모바일 메뉴가 열려 있는지 저장함

  const navLinks = [
    { href: "/sanctuary", label: "Home" },
    { href: "/sanctuary/series", label: "Series" },
    { href: "/sanctuary/gallery", label: "Gallery" },
  ]; // 메뉴 이름을 영어로 고정함

  const isActive = (href: string) =>
    href === "/sanctuary" ? pathname === "/sanctuary" : pathname.startsWith(href); // 현재 경로와 메뉴 경로를 비교해 활성 메뉴인지 판단함

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/45 bg-white/50 backdrop-blur-xl"
      style={{ boxShadow: "0 10px 30px rgba(141, 113, 182, 0.08)" }}
    > {/* 화면 상단에 고정되는 가로 전체 네비게이션 영역임 */}
      <div className="mx-auto w-full px-6 sm:px-8 lg:px-10"> {/* 헤더 내부 좌우 여백을 잡음 */}
        <div className="grid h-[84px] grid-cols-[auto_1fr_auto] items-center gap-6"> {/* 로고, 가운데 메뉴, 오른쪽 영역을 가로로 배치함 */}
          <Link
            href="/sanctuary"
            className="flex items-center"
            style={{ textDecoration: "none" }}
          > {/* 로고를 누르면 Home으로 이동함 */}
            <img
              src="/logo.png"
              alt="WINKADIA"
              className="h-auto w-[190px] select-none object-contain sm:w-[220px] lg:w-[250px]"
            /> {/* public/logo.png 이미지를 로고로 표시함 */}
          </Link>

          <div className="hidden items-center justify-center md:flex"> {/* 데스크톱 가운데 메뉴 영역임 */}
            <div className="flex items-center gap-12 lg:gap-16"> {/* 메뉴 사이 여백을 넉넉하게 줌 */}
              {navLinks.map((link) => {
                const active = isActive(link.href); // 현재 메뉴가 활성 상태인지 저장함

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative inline-flex items-center justify-center px-1 py-2 font-semibold transition-all duration-200"
                    style={{
                      textDecoration: "none",
                      color: active ? "#7f5bcc" : "#3c3a44",
                      fontSize: "21px",
                      lineHeight: 1.1,
                    }}
                  > {/* 메뉴 링크를 텍스트형으로 표시함 */}
                    <span className="relative inline-block">
                      {link.label}

                      {active && (
                        <>
                          <span
                            className="pointer-events-none absolute left-0 top-[calc(100%+8px)] h-[6px] w-[74px] rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, #9b7be8 0%, #7f5bcc 55%, #9b7be8 100%)",
                              boxShadow: "0 2px 8px rgba(127, 91, 204, 0.18)",
                            }}
                          /> {/* 활성 메뉴 아래에 보라색 밑줄 장식을 표시함 */}

                          <Sparkles
                            size={12}
                            className="pointer-events-none absolute -right-4 top-0"
                            style={{ color: "#b89ef3" }}
                          /> {/* 활성 메뉴 옆에 작은 반짝이 장식을 표시함 */}
                        </>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 sm:gap-4"> {/* 오른쪽 언어, 유저, 로그인 영역임 */}
            <div className="hidden md:block">
              <LanguageToggle /> {/* 데스크톱에서 언어 전환 버튼을 표시함 */}
            </div>

            {user ? (
              <>
                <Link
                  href="/sanctuary/profile"
                  className="hidden items-center gap-2 rounded-full border border-[#e7dcfa] bg-white/72 px-4 py-2.5 text-sm font-semibold text-[#7a6997] shadow-sm transition hover:bg-white md:flex"
                  style={{ textDecoration: "none" }}
                > {/* 로그인한 사용자의 프로필 링크임 */}
                  <User size={16} />
                  <span className="max-w-[120px] truncate">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#e7dcfa] bg-white/72 text-[#8a69d6] shadow-sm transition hover:bg-white md:flex"
                  title={t.auth.logout}
                > {/* 로그아웃 버튼임 */}
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#9b78e5] to-[#7f5bcc] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(127,91,204,0.25)] transition hover:opacity-95 md:flex"
                style={{ textDecoration: "none" }}
              > {/* 로그인하지 않은 사용자에게 보여주는 로그인 버튼임 */}
                <LogIn size={15} />
                <span>Login</span>
              </Link>
            )}

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7dcfa] bg-white/72 text-[#8a69d6] md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            > {/* 모바일 메뉴 열기와 닫기를 전환함 */}
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/60 bg-[#fcf9ff]/95 px-5 py-5 shadow-[0_16px_40px_rgba(132,98,174,0.12)] backdrop-blur-xl md:hidden"> {/* 모바일 메뉴 영역임 */}
          <div className="mx-auto flex max-w-[520px] flex-col gap-3">
            {navLinks.map((link) => {
              const active = isActive(link.href); // 모바일 메뉴 활성 상태를 저장함

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-5 py-3 text-center font-semibold transition-all duration-200"
                  style={{
                    textDecoration: "none",
                    color: active ? "#7f5bcc" : "#3c3a44",
                    background: active ? "rgba(155, 123, 232, 0.08)" : "transparent",
                    fontSize: "18px",
                  }}
                > {/* 모바일 메뉴 링크임 */}
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-2 border-t border-[#eee6fb] pt-3"> {/* 모바일 하단 유저 영역을 메뉴와 나눔 */}
              <div className="mb-3">
                <LanguageToggle /> {/* 모바일에서 언어 전환 버튼을 표시함 */}
              </div>

              {user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/sanctuary/profile"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl bg-white px-5 py-3 text-center text-[15px] font-semibold text-[#7a6997]"
                    style={{ textDecoration: "none" }}
                  > {/* 모바일 프로필 링크임 */}
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="rounded-2xl bg-white px-5 py-3 text-center text-[15px] font-semibold text-[#8a69d6]"
                  > {/* 모바일 로그아웃 버튼임 */}
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl bg-gradient-to-r from-[#9b78e5] to-[#7f5bcc] px-5 py-3 text-center text-[15px] font-semibold text-white"
                  style={{ textDecoration: "none" }}
                > {/* 모바일 로그인 버튼임 */}
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}