"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, UserPlus } from "lucide-react";
import { requestJson, HttpError } from "@/services/http";
import { AUTH_TOKEN_KEY } from "@/constants/auth";

type RegisterResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailInvalid = email.trim().length > 0 && !email.includes("@");
  const passwordInvalid = password.trim().length > 0 && password.trim().length < 6;
  const confirmMismatch = confirmPassword.trim().length > 0 && password !== confirmPassword;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Lengkapi semua kolom sebelum membuat akun.");
      return;
    }

    if (emailInvalid) {
      setError("Email perlu memakai format yang benar.");
      return;
    }

    if (passwordInvalid) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    if (confirmMismatch) {
      setError("Konfirmasi sandi belum sama.");
      return;
    }

    setLoading(true);
    try {
      const result = await requestJson<RegisterResponse>("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Akun belum bisa dibuat. Coba lagi beberapa saat lagi.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-card" onSubmit={handleSubmit} noValidate aria-busy={loading}>
      <div className="auth-card-head">
        <span className="auth-mark">
          <UserPlus aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="section-kicker">Akun Demo</p>
          <h1>Buat akun internal untuk simulasi korporat.</h1>
          <p>Akun ini dipakai untuk mencoba alur masuk dan dashboard pada presentasi website perusahaan.</p>
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="register-email">Email</label>
        <div className="input-shell">
          <Mail aria-hidden="true" size={18} />
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={emailInvalid}
            aria-describedby={emailInvalid ? "register-email-error" : undefined}
            placeholder="nama@email.com"
          />
        </div>
        {emailInvalid && (
          <p className="error-note" id="register-email-error">
            Email perlu memuat tanda @.
          </p>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="register-password">Kata sandi</label>
        <div className="input-shell">
          <LockKeyhole aria-hidden="true" size={18} />
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            spellCheck={false}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={passwordInvalid}
            aria-describedby={passwordInvalid ? "register-password-error" : undefined}
            placeholder="minimal 6 karakter"
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
          </button>
        </div>
        {passwordInvalid && (
          <p className="error-note" id="register-password-error">
            Kata sandi minimal 6 karakter.
          </p>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="register-confirm-password">Ulangi kata sandi</label>
        <div className="input-shell">
          <LockKeyhole aria-hidden="true" size={18} />
          <input
            id="register-confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            spellCheck={false}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            aria-invalid={confirmMismatch}
            aria-describedby={confirmMismatch ? "register-confirm-error" : undefined}
            placeholder="ketik ulang sandi"
          />
        </div>
        {confirmMismatch && (
          <p className="error-note" id="register-confirm-error">
            Isinya belum sama dengan sandi pertama.
          </p>
        )}
      </div>

      {error && (
        <div className="alert error" role="alert">
          {error}
        </div>
      )}

      <button className="button button-primary full-width" type="submit" disabled={loading}>
        {loading ? "Membuat akses..." : "Buat akun dan masuk"}
      </button>

      <p className="auth-switch">
        Sudah punya akun? <Link href="/login">Masuk di sini</Link>
      </p>
    </form>
  );
}
