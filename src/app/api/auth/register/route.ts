import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { hashPassword } from "@/lib/auth";
import { createAuthToken } from "@/lib/jwt";
import { store } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { message: "Email dan kata sandi wajib diisi." },
      { status: 400 },
    );
  }

  const email = String(body.email).trim().toLowerCase();
  const password = String(body.password);

  if (!email.includes("@")) {
    return NextResponse.json({ message: "Format email tidak valid." }, { status: 400 });
  }

  if (password.trim().length < 6) {
    return NextResponse.json({ message: "Kata sandi minimal 6 karakter." }, { status: 400 });
  }

  const emailExists = store.users.some((user) => user.email === email);
  if (emailExists) {
    return NextResponse.json({ message: "Email sudah digunakan." }, { status: 409 });
  }

  const user = {
    id: crypto.randomUUID(),
    email,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);

  const token = await createAuthToken({
    userId: user.id,
    email: user.email,
  });

  const response = NextResponse.json({
    message: "Register berhasil",
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });

  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 2,
    path: "/",
  });

  return response;
}
