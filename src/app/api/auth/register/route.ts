import { NextResponse } from "next/server";
import { createAuthToken, hashPassword } from "@/lib/auth";
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

  const emailExists = store.users.some((user) => user.email === email);
  if (emailExists) {
    return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 409 });
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

  return NextResponse.json({
    message: "Register berhasil",
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
}
