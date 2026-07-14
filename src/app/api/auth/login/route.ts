import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEY } from "@/constants/auth";
import { verifyPassword } from "@/lib/auth";
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

  const user = store.users.find((item) => item.email === email);
  if (!user) {
    return NextResponse.json({ message: "Kombinasi email dan kata sandi tidak cocok." }, { status: 401 });
  }

  const isPasswordValid = await verifyPassword(password, user.passwordHash);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Kombinasi email dan kata sandi tidak cocok." }, { status: 401 });
  }

  const token = await createAuthToken({
    userId: user.id,
    email: user.email,
  });

  const response = NextResponse.json({
    message: "Login berhasil",
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });

  response.cookies.set(AUTH_COOKIE_KEY, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  return response;
}
