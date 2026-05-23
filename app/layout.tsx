import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Code2, Zap, Target } from "lucide-react";
import MenuSelector from "./components/MenuSelector";
import CustomCursor from "./components/CustomCursor";
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
      <body className={`h-full overflow-y-scroll min-h-screen flex flex-col bg-[#06080f] text-slate-200 ${geistSans.variable} ${geistMono.variable} antialiased`} >
        <CustomCursor />
        <div className="relative min-h-screen w-full flex flex-col">
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10">
            {/* Primary gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#06080f] via-[#0b0f1a] to-[#06080f]" />

            {/* Floating metallic reflections */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-slate-400/3 to-slate-300/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-slate-500/3 to-slate-400/4 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}} />
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-slate-400/2 to-slate-500/4 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
            <div className="absolute bottom-40 right-1/3 w-48 h-48 bg-gradient-to-r from-white/3 to-slate-300/5 rounded-full blur-2xl animate-bounce" style={{animationDuration: '8s', animationDelay: '1s'}} />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDY3LDE1NiwyMDIsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-40" />

            {/* Floating particles — silver dust */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/12 rounded-full animate-ping" style={{animationDelay: '0s', animationDuration: '3s'}} />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-slate-300/18 rounded-full animate-ping" style={{animationDelay: '1s', animationDuration: '4s'}} />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-slate-200/14 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '5s'}} />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/10 rounded-full animate-ping" style={{animationDelay: '0.5s', animationDuration: '3.5s'}} />
            <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-slate-400/12 rounded-full animate-ping" style={{animationDelay: '1.5s', animationDuration: '4.5s'}} />
          </div>

          <header className="p-6 text-center shadow-md border-b border-white/8 sticky top-0 z-100 bg-[rgba(6,8,15,0.75)] backdrop-blur-md">
            <div className="mx-auto">
              <h1 className="text-3xl font-bold metal-title">ParkJS&apos; DEV SPACE</h1>
            </div>
          </header>

          {/* Additional floating elements for hero */}
          <div className="absolute top-1/4 left-10 animate-float -z-10">
            <Code2 className="w-8 h-8 text-slate-400/15" />
          </div>
          <div className="absolute top-1/3 right-20 animate-float -z-10" style={{animationDelay: '1s'}}>
            <Zap className="w-6 h-6 text-slate-300/12" />
          </div>
          <div className="absolute bottom-1/4 left-20 animate-float -z-10" style={{animationDelay: '2s'}}>
            <Target className="w-7 h-7 text-slate-400/10" />
          </div>

          <main className="flex-grow max-w-full mx-auto w-full">
            {children}
          </main>
          <footer className="p-6 text-sm text-center border-t border-white/10 text-slate-400">
            &copy; {new Date().getFullYear()} ParkJS. All rights reserved.
          </footer>
        </div>
        <MenuSelector />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
