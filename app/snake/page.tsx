import type { Metadata } from "next";
import SnakeGame from "../components/snake/SnakeGame";

export const metadata: Metadata = {
  title: "Snake | ParkJS' DEV SPACE",
  description: "스네이크 미니게임 – WASD or arrow keys to play",
};

export default function SnakePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-8 px-4">
      <div className="w-full max-w-[480px]">
        <h1 className="text-2xl font-bold text-center mb-5 metal-title font-mono tracking-widest">
          SNAKE GAME
        </h1>
        <SnakeGame />
        <p className="text-center text-slate-600 text-[11px] font-mono mt-3 tracking-wider">
          WASD / ↑↓←→ &nbsp;·&nbsp; SPACE: PAUSE &nbsp;·&nbsp; ESC: PAUSE
        </p>
      </div>
    </div>
  );
}
