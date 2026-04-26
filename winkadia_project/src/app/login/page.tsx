"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ParticleEffect from "@/components/effects/ParticleEffect";
import { Sparkles, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { loginWithEmail, signUpWithEmail, loginWithGoogle, resetPassword } =
    useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [gender, setGender] = useState("other");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        router.push("/sanctuary");
      } else if (mode === "signup") {
        if (password !== confirmPass) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }
        await signUpWithEmail(email, password, displayName, gender);
        router.push("/sanctuary");
      } else if (mode === "reset") {
        await resetPassword(email);
        setResetSent(true);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : t.auth.loginError;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/sanctuary");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : t.auth.loginError;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sanctuary bg-stars flex items-center justify-center px-4 py-10 relative">
      <ParticleEffect />

      {/* Language toggle */}
      <div className="absolute top-6 right-6" style={{ zIndex: 20 }}>
        <LanguageToggle />
      </div>

      <div
        className="w-full max-w-md animate-gate-open"
        style={{ animationDelay: "0.2s", position: "relative", zIndex: 10 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles
                size={40}
                className="animate-float"
                style={{ color: "var(--gold-400)" }}
              />
              <div
                className="absolute inset-0 blur-xl"
                style={{
                  background: "var(--gold-500)",
                  opacity: 0.2,
                }}
              />
            </div>
          </div>
          <h1
            className="text-display text-3xl sm:text-4xl text-gold-gradient mb-3"
            style={{ fontWeight: 900 }}
          >
            {t.auth.gateTitle}
          </h1>
          <p
            className="text-heading text-sm tracking-[3px] uppercase mb-2"
            style={{ color: "var(--gold-500)", opacity: 0.7 }}
          >
            {t.auth.gateSubtitle}
          </p>
          <div className="ornate-divider text-xs">✦</div>
          <p
            className="text-sm italic"
            style={{ color: "var(--ivory-muted)", opacity: 0.6 }}
          >
            {t.auth.gateDescription}
          </p>
        </div>

        {/* Form Card */}
        <div
          className="card-sanctuary p-8 sm:p-10"
          style={{ boxShadow: "var(--shadow-sanctuary)" }}
        >
          {/* Google Login */}
          {mode !== "reset" && (
            <>
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="btn-outline w-full flex items-center justify-center gap-3 mb-6"
              >
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                {t.auth.loginWithGoogle}
              </button>

              <div className="ornate-divider text-xs my-6">OR</div>
            </>
          )}

          <form onSubmit={handleEmail} className="space-y-5">
            {/* Display Name (signup only) */}
            {mode === "signup" && (
              <div>
                <label
                  className="block text-sm mb-2 text-heading tracking-[1px]"
                  style={{ color: "var(--gold-500)" }}
                >
                  {t.auth.displayName}
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input-sanctuary"
                  required
                  placeholder="Aria, Cedric..."
                />
              </div>
            )}

            {/* Gender (signup only) */}
            {mode === "signup" && (
              <div>
                <label
                  className="block text-sm mb-2 text-heading tracking-[1px]"
                  style={{ color: "var(--gold-500)" }}
                >
                  {t.auth.genderSelect}
                </label>
                <div className="grid grid-cols-3 gap-2">
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
                      className="px-3 py-2.5 rounded-md text-xs transition-all duration-300 tracking-wider"
                      style={{
                        fontFamily: "var(--font-heading)",
                        border: `1px solid ${gender === opt.value ? "var(--gold-500)" : "var(--sanctuary-border)"}`,
                        background:
                          gender === opt.value
                            ? "rgba(201, 168, 76, 0.15)"
                            : "var(--sanctuary-surface)",
                        color:
                          gender === opt.value
                            ? "var(--gold-300)"
                            : "var(--ivory-muted)",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                className="block text-sm mb-2 text-heading tracking-[1px]"
                style={{ color: "var(--gold-500)" }}
              >
                {t.auth.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-sanctuary"
                required
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            {mode !== "reset" && (
              <div>
                <label
                  className="block text-sm mb-2 text-heading tracking-[1px]"
                  style={{ color: "var(--gold-500)" }}
                >
                  {t.auth.password}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-sanctuary pr-12"
                    required
                    minLength={6}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                    style={{ color: "var(--ivory-muted)", opacity: 0.5 }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password */}
            {mode === "signup" && (
              <div>
                <label
                  className="block text-sm mb-2 text-heading tracking-[1px]"
                  style={{ color: "var(--gold-500)" }}
                >
                  {t.auth.confirmPassword}
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="input-sanctuary"
                  required
                  minLength={6}
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                className="text-sm px-4 py-3 rounded-md"
                style={{
                  background: "rgba(232, 67, 112, 0.1)",
                  border: "1px solid rgba(232, 67, 112, 0.3)",
                  color: "var(--rose-400)",
                }}
              >
                ⚠ {error}
              </div>
            )}

            {/* Reset success */}
            {resetSent && (
              <div
                className="text-sm px-4 py-3 rounded-md"
                style={{
                  background: "rgba(201, 168, 76, 0.1)",
                  border: "1px solid rgba(201, 168, 76, 0.3)",
                  color: "var(--gold-400)",
                }}
              >
                ✦ {t.auth.resetSent}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              <span>
                {mode === "login"
                  ? t.auth.loginWithEmail
                  : mode === "signup"
                    ? t.auth.signUpWithEmail
                    : t.auth.resetPassword}
              </span>
            </button>
          </form>

          {/* Mode switchers */}
          <div className="mt-6 text-center space-y-2">
            {mode === "login" && (
              <>
                <button
                  onClick={() => {
                    setMode("reset");
                    setError("");
                  }}
                  className="block w-full text-xs transition-colors duration-300"
                  style={{ color: "var(--ivory-muted)", opacity: 0.5 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--gold-400)";
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--ivory-muted)";
                    (e.currentTarget as HTMLElement).style.opacity = "0.5";
                  }}
                >
                  {t.auth.forgotPassword}
                </button>
                <p
                  className="text-xs"
                  style={{ color: "var(--ivory-muted)", opacity: 0.5 }}
                >
                  {t.auth.noAccount}{" "}
                  <button
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    className="underline transition-colors duration-300"
                    style={{ color: "var(--gold-400)" }}
                  >
                    {t.auth.signUpWithEmail}
                  </button>
                </p>
              </>
            )}
            {mode === "signup" && (
              <p
                className="text-xs"
                style={{ color: "var(--ivory-muted)", opacity: 0.5 }}
              >
                {t.auth.hasAccount}{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="underline transition-colors duration-300"
                  style={{ color: "var(--gold-400)" }}
                >
                  {t.auth.loginWithEmail}
                </button>
              </p>
            )}
            {mode === "reset" && (
              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                  setResetSent(false);
                }}
                className="text-xs underline transition-colors duration-300"
                style={{ color: "var(--gold-400)" }}
              >
                ← {t.common.back}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
