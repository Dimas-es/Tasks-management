import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

// Impor domestik
import { Providers } from "./providers";
import Header from "@/components/header/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "iTasks - Mempermudah Pengelolaan Tugas, Tantangan, dan Manajemen Waktu",
  description:
    "Tingkatkan produktivitas Anda dengan iTasks — menyederhanakan pengelolaan tugas dengan efisiensi tanpa hambatan dan menguasai manajemen waktu secara efektif.",
  authors: [
    { name: "Al Siam" },
    {
      name: "Al Siam",
      url: "https://www.x.com/_alsiam/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
    { rel: "icon", url: "/icons/icon-192x192.png" },
    { rel: "favicon", url: "/icons/favicon.ico" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
