import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrameFlow Studio",
  description: "Gestão de clientes para fotógrafos",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
