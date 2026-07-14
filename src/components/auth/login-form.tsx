"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth-client";
import { HttpError } from "@/services/http";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailInvalid = email.trim().length > 0 && !email.includes("@");
  const passwordInvalid = password.trim().length > 0 && password.trim().length < 6;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi.");
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

    setLoading(true);
    try {
      await login({ email, password });
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Terjadi kendala saat proses login.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit} noValidate>
      <h1>Masuk ke Dashboard</h1>
      <p className="muted">
        Gunakan akun yang valid untuk mendapatkan token JWT dan mengakses modul CRUD.
      </p>

      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-invalid={emailInvalid}
      />

      <label htmlFor="login-password">Kata sandi</label>
      <input
        id="login-password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-invalid={passwordInvalid}
      />

      {(emailInvalid || passwordInvalid) && (
        <p className="error-note">Periksa kembali format email dan panjang kata sandi.</p>
      )}

      {error && (
        <div className="alert error" role="alert">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Memproses login..." : "Masuk"}
      </button>
    </form>
  );
}
