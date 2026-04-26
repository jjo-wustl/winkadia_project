"use client";
import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeartEffect from "@/components/effects/ParticleEffect";
export default function SanctuaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-sanctuary relative">
        <HeartEffect />
        <Navbar />
        <main style={{ position: "relative", zIndex: 10, paddingTop: "5rem", minHeight: "100vh" }}>{children}</main>
        <div style={{ position: "relative", zIndex: 10 }}><Footer /></div>
      </div>
    </AuthGuard>
  );
}
