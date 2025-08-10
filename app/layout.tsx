import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import MenuSelector from "./components/MenuSelector";
import "./globals.css";
import { Code2, Zap, Target } from "lucide-react";

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
        <div className="relative min-h-screen w-full flex flex-col">
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10">
            {/* Primary gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}} />
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
            <div className="absolute bottom-40 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/10 to-blue-400/15 rounded-full blur-2xl animate-bounce" style={{animationDuration: '8s', animationDelay: '1s'}} />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDY3LDE1NiwyMDIsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-40" />

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping" style={{animationDelay: '0s', animationDuration: '3s'}} />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" style={{animationDelay: '1s', animationDuration: '4s'}} />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400/35 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '5s'}} />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-300/25 rounded-full animate-ping" style={{animationDelay: '0.5s', animationDuration: '3.5s'}} />
            <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-300/20 rounded-full animate-ping" style={{animationDelay: '1.5s', animationDuration: '4.5s'}} />
          </div>

          <header className="p-6 text-center shadow-md border-b border-white/10 sticky top-0 z-100 bg-slate-900/50 backdrop-blur-sm">
            <div className="mx-auto">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">ParkJS' DEV SPACE</h1>
            </div>
          </header>

          {/* Additional floating elements for hero */}
          <div className="absolute top-1/4 left-10 animate-float -z-10">
            <Code2 className="w-8 h-8 text-cyan-400/20" />
          </div>
          <div className="absolute top-1/3 right-20 animate-float -z-10" style={{animationDelay: '1s'}}>
            <Zap className="w-6 h-6 text-blue-400/20" />
          </div>
          <div className="absolute bottom-1/4 left-20 animate-float -z-10" style={{animationDelay: '2s'}}>
            <Target className="w-7 h-7 text-purple-400/20" />
          </div>

          <main className="flex-grow max-w-full mx-auto w-full">
            {children}
          </main>
          <footer className="p-6 text-sm text-center border-t border-white/10 text-violet-200">
            &copy; {new Date().getFullYear()} ParkJS. All rights reserved.
          </footer>
        </div>
        <MenuSelector />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
