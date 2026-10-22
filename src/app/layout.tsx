import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EcoBin OS — Edge-AI Autonomous Waste Segregation & Bio-Utility",
  description:
    "Transforming bulk residential and canteen food waste into decentralized cooking biogas, organic liquid fertilizer, and clean dry recyclables right at the physical source. SWM 2016 Compliant.",
  keywords: [
    "EcoBin",
    "Bio-Utility",
    "Waste Segregation",
    "Edge-AI",
    "Anaerobic Digestion",
    "Biogas",
    "SWM Rules 2016",
    "Smart City",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
