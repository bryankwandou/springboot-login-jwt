"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const currentPath = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="Halaman utama">
          Sistem Akses Data JWT
        </Link>

        <nav className="nav-links" aria-label="Navigasi utama">
          <Link data-active={currentPath === "/"} href="/">
            Landing
          </Link>
          <Link data-active={currentPath === "/register"} href="/register">
            Register
          </Link>
          <Link data-active={currentPath === "/login"} href="/login">
            Login
          </Link>
          <Link data-active={currentPath === "/dashboard"} href="/dashboard">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
