import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import MenuSelector from "./components/MenuSelector";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ParkJS' DEV SPACE",
  description: "개발자 박준식의 포트폴리오",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className={`h-full overflow-y-scroll min-h-screen flex flex-col bg-slate-900 text-violet-200 ${geistSans.variable} ${geistMono.variable} antialiased`} >
        <header className="p-6 text-center shadow-md border-b border-white/10">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">ParkJS' DEV SPACE</h1>
          </div>
        </header>
        <main className="flex-grow max-w-full mx-auto w-full">
          {children}
        </main>
        <footer className="p-6 text-sm text-center border-t border-white/10 text-violet-200">
          &copy; {new Date().getFullYear()} ParkJS. All rights reserved.
        </footer>
        <MenuSelector />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
