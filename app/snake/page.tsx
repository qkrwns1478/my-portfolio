"use client";
import SnakeGame from "../components/snake/SnakeGame";
import { useSettingsStore } from "../store/settingsStore";
import Button from "../components/Button";

export default function SnakePage() {
  const { language } = useSettingsStore();

  return (
    <div className="p-6">
      <section className="max-w-6xl mx-auto space-y-6 py-10">
        <div>
          <Button href="/">← {language === "Kor" ? "홈으로 돌아가기" : "Back to Home"}</Button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 py-4 px-4">
          <div className="w-full max-w-[480px]">
            <h1 className="text-2xl font-bold text-center mb-5 metal-title font-mono tracking-widest">SNAKE GAME</h1>
            <SnakeGame />
            <p className="text-center text-slate-600 text-[11px] font-mono mt-3 tracking-wider">
              WASD / ↑↓←→ &nbsp;·&nbsp; SPACE: PAUSE &nbsp;·&nbsp; ESC: PAUSE
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
