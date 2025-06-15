import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { StatsProvider } from "@/contexts/StatsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inglês pra Já - Aprenda Inglês do Dia a Dia",
  description: "Aprenda inglês para situações do dia a dia com IA. Nada de 'The book is on the table'. Foque em frases que você usaria HOJE.",
  keywords: ["inglês", "english", "AI", "aprender inglês", "conversação", "english tutor", "inglês pra já"],
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  openGraph: {
    title: "Inglês pra Já - Aprenda Inglês do Dia a Dia",
    description: "Aprenda inglês para situações do dia a dia com IA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <StatsProvider>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50">
              Pular para o conteúdo principal
            </a>
            <main id="main-content">
              {children}
            </main>
          </StatsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
