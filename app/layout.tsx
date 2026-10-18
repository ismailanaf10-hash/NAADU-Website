import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naadu Restaurant — Authentic Mangalurean Dining & Sports Screening",
  description:
    "Experience authentic Coastal Karnataka cuisine, vegetarian specials, dedicated kids menu, and live sports screening at Naadu Restaurant, Chilimbi, Mangaluru.",
  keywords: [
    "Naadu Restaurant",
    "Mangaluru restaurant",
    "coastal Karnataka food",
    "Mangalorean cuisine",
    "live sports screening",
    "kids menu Mangaluru",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
