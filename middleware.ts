import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_KEY } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_KEY)?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyAuthToken(token);
  if (!payload) {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set(AUTH_COOKIE_KEY, "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
