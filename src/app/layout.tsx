import type { Metadata } from "next";
import { Nunito, Space_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "PolyQuest — The Secret World of Materials",
  description:
    "An interactive science adventure for children. Discover the hidden world of materials through experiments, stories, and exploration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${spaceMono.variable}`}>
      <body className="lab-bg antialiased">
        {children}
      </body>
    </html>
  );
}
