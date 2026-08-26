import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#FFF8F0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "PolyQuest — The Secret World of Materials",
  description:
    "An interactive children's science adventure and virtual laboratory. Discover the hidden world of materials, fibres, and plastics through experiments and stories.",
  keywords: ["science for kids", "materials science", "grade 8 science", "synthetic fibres", "plastics", "interactive learning"],
  authors: [{ name: "PlayLabs" }],
  openGraph: {
    title: "PolyQuest — The Secret World of Materials",
    description: "An interactive science adventure and virtual laboratory for children.",
    siteName: "PolyQuest",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="lab-bg antialiased selection:bg-pip-blue/20 selection:text-pip-blue-dark">
        {children}
      </body>
    </html>
  );
}
