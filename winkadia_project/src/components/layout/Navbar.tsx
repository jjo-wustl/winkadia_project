"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { Menu, X, LogOut, User, Sparkles } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [
    { href: "/sanctuary", label: t.nav.sanctuary, icon: "🏛" },
    { href: "/sanctuary/theater", label: t.nav.theater, icon: "🎭" },
    { href: "/sanctuary/chronicles", label: t.nav.chronicles, icon: "📜" },
    { href: "/sanctuary/council", label: t.nav.council, icon: "🌌" },
  ];
  const isActive = (href: string) => href === "/sanctuary" ? pathname === "/sanctuary" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(255,250,248,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent 0%, var(--pink-400) 20%, var(--purple-400) 50%, var(--pink-400) 80%, transparent 100%)", opacity: 0.4 }}/>
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          <Link href="/sanctuary" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
            <Sparkles size={24} style={{ color: "var(--pink-500)" }}/>
            <span className="text-display text-lg tracking-[4px] text-pink-gradient hidden sm:inline" style={{ fontWeight: 700 }}>WINKADIA</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="relative px-4 py-2 rounded-full text-sm tracking-[1px] uppercase transition-all duration-300"
                style={{ fontFamily: "var(--font-heading)", color: isActive(link.href) ? "var(--pink-600)" : "var(--text-muted)", background: isActive(link.href) ? "var(--pink-100)" : "transparent", textDecoration: "none", fontSize: "12px" }}>
                <span className="mr-1.5">{link.icon}</span>{link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            {user && (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/sanctuary/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300"
                  style={{ color: "var(--text-secondary)", textDecoration: "none", fontFamily: "var(--font-heading)", fontSize: "12px", letterSpacing: "1px" }}>
                  <User size={16}/>{user.displayName || user.email?.split("@")[0]}
                </Link>
                <button onClick={logout} className="p-2 rounded-full transition-all duration-300" style={{ color: "var(--text-muted)" }} title={t.auth.logout}><LogOut size={16}/></button>
              </div>
            )}
            <button className="md:hidden p-2" style={{ color: "var(--pink-500)" }} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={24}/> : <Menu size={24}/>}</button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden animate-fade-in-up" style={{ background: "rgba(255,250,248,0.98)", borderTop: "1px solid var(--border)" }}>
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm tracking-[1px] uppercase"
                style={{ fontFamily: "var(--font-heading)", color: isActive(link.href) ? "var(--pink-600)" : "var(--text-muted)", background: isActive(link.href) ? "var(--pink-100)" : "transparent", textDecoration: "none" }}>
                <span className="mr-2">{link.icon}</span>{link.label}
              </Link>
            ))}
            {user && (
              <>
                <div className="h-[1px] my-2" style={{ background: "var(--border)" }}/>
                <Link href="/sanctuary/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm tracking-[1px] uppercase" style={{ fontFamily: "var(--font-heading)", color: "var(--text-muted)", textDecoration: "none" }}>👤 {t.nav.profile}</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-sm tracking-[1px] uppercase" style={{ fontFamily: "var(--font-heading)", color: "var(--pink-500)" }}>🚪 {t.auth.logout}</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
