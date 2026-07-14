"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailInvalid = email.trim().length > 0 && !email.includes("@");
  const passwordInvalid = password.trim().length > 0 && password.trim().length < 6;
  const confirmMismatch = confirmPassword.trim().length > 0 && password !== confirmPassword;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    if (emailInvalid) {
      setError("Format email belum sesuai.");
      return;
    }

    if (passwordInvalid) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    if (confirmMismatch) {
      setError("Konfirmasi kata sandi tidak sama.");
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
        setError("Registrasi belum berhasil. Coba ulangi.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit} noValidate>
      <h1>Buat Akun Baru</h1>
      <p className="muted">Isi data akun untuk mulai menggunakan dashboard.</p>

      <label htmlFor="register-email">Email</label>
      <input
        id="register-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-invalid={emailInvalid}
      />

      <label htmlFor="register-password">Kata sandi</label>
      <input
        id="register-password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-invalid={passwordInvalid}
      />

      <label htmlFor="register-confirm-password">Konfirmasi kata sandi</label>
      <input
        id="register-confirm-password"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        aria-invalid={confirmMismatch}
      />

      {(emailInvalid || passwordInvalid || confirmMismatch) && (
        <p className="error-note">Periksa kembali format email dan kesesuaian kata sandi.</p>
      )}

      {error && (
        <div className="alert error" role="alert">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Memproses registrasi..." : "Daftarkan Akun"}
      </button>
    </form>
  );
}
