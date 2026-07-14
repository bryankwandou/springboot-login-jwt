import { NextResponse } from "next/server";
import { createAuthToken, verifyPassword } from "@/lib/auth";
import { store } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { message: "Email dan password wajib diisi" },
      { status: 400 },
    );
  }

  const email = String(body.email).trim().toLowerCase();
  const password = String(body.password);

  const user = store.users.find((item) => item.email === email);
  if (!user) {
    return NextResponse.json({ message: "Email atau password salah" }, { status: 401 });
  }

  const isPasswordValid = await verifyPassword(password, user.passwordHash);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Email atau password salah" }, { status: 401 });
  }

  const token = await createAuthToken({
    userId: user.id,
    email: user.email,
  });

  return NextResponse.json({
    message: "Login berhasil",
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
}
