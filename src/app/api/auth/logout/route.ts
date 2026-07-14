import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEY } from "@/constants/auth";

export async function POST() {
  const response = NextResponse.json({ message: "Logout berhasil" });
  response.cookies.set(AUTH_COOKIE_KEY, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
