import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50">
            Pular para o conteúdo principal
          </a>
          <main id="main-content">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
