import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Afterglam Beauty Studio — Premium Lash, Nail & Brow",
  description:
    "Reservasi layanan Lash, Brow, Nails, dan Waxing premium di Afterglam Beauty Studio. Pilih cabang, tentukan teknisi, dan langsung booking via WhatsApp.",
  keywords: "afterglam, lash extension, nail art, brow lamination, waxing, salon semarang",
  openGraph: {
    title: "Afterglam Beauty Studio",
    description: "Premium beauty services — Lash, Brow, Nails & Waxing",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
