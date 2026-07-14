import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js JWT CRUD MVP",
  description: "MVP internship dengan JWT authentication, protected route, dan modul CRUD berbasis REST API.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
