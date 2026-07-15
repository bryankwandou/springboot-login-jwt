"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export function SiteHeader() {
  const currentPath = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="Halaman utama">
          <ShieldCheck aria-hidden="true" size={18} />
          NusaKarya
        </Link>

        <div className="nav-group">
          <nav className="nav-links nav-menu" aria-label="Navigasi utama">
            <Link data-active={currentPath === "/"} href="/">
              Beranda
            </Link>
            <Link href="/#solusi">Solusi</Link>
            <Link href="/#tentang">Tentang Kami</Link>
            <Link data-active={currentPath === "/dashboard"} href="/dashboard">
              Dashboard
            </Link>
          </nav>

          <div className="nav-links nav-actions" aria-label="Aksi akun">
            <Link data-active={currentPath === "/login"} href="/login">
              Masuk
            </Link>
            <Link className="button button-primary" href="/login">
              Login Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
