"use client";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { Direction, useSnakeStore } from "../../store/snakeStore";

const BTN =
  "w-14 h-14 flex items-center justify-center bg-white/6 border border-white/12 " +
  "active:bg-white/20 active:border-white/28 rounded-lg text-slate-400 active:text-white " +
  "transition-all duration-75 select-none touch-manipulation";

export default function GameControls() {
  const setDirection = useSnakeStore((s) => s.setDirection);
  const status = useSnakeStore((s) => s.status);
  const startGame = useSnakeStore((s) => s.startGame);
  const resumeGame = useSnakeStore((s) => s.resumeGame);

  const handlePress = (dir: Direction) => {
    if (status === "idle" || status === "over") startGame();
    else if (status === "paused") resumeGame();
    setDirection(dir);
  };

  return (
    <div className="flex md:hidden flex-col items-center gap-1.5 mt-5">
      <button className={BTN} onPointerDown={() => handlePress("UP")}>
        <ChevronUp size={22} />
      </button>

      <div className="flex gap-1.5">
        <button className={BTN} onPointerDown={() => handlePress("LEFT")}>
          <ChevronLeft size={22} />
        </button>
        {/* centre spacer */}
        <div className="w-14 h-14" />
        <button className={BTN} onPointerDown={() => handlePress("RIGHT")}>
          <ChevronRight size={22} />
        </button>
      </div>

      <button className={BTN} onPointerDown={() => handlePress("DOWN")}>
        <ChevronDown size={22} />
      </button>
    </div>
  );
}
