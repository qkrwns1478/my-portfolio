"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useSnakeStore } from "../../store/snakeStore";

function ActionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 bg-white/8 border border-white/18 hover:bg-white/15 active:scale-95 text-slate-200 font-mono text-sm font-bold tracking-widest transition-all duration-100"
    >
      {children}
    </button>
  );
}

export default function GameOverlay() {
  const status = useSnakeStore((s) => s.status);
  const score = useSnakeStore((s) => s.score);
  const highScore = useSnakeStore((s) => s.highScore);
  const isNewHighScore = useSnakeStore((s) => s.isNewHighScore);
  const startGame = useSnakeStore((s) => s.startGame);
  const resumeGame = useSnakeStore((s) => s.resumeGame);

  return (
    <AnimatePresence>
      {status !== "running" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-[2px]"
        >
          {/* ── IDLE ───────────────────────────────────────────────────────────── */}
          {status === "idle" && (
            <>
              <p className="text-5xl mb-3 select-none">🐍</p>
              <h2 className="text-2xl font-bold text-slate-100 mb-1 font-mono tracking-widest">
                SNAKE
              </h2>
              <p className="text-slate-500 text-xs font-mono mb-8 text-center px-4">
                WASD / ARROW KEYS TO MOVE
              </p>
              <ActionButton onClick={startGame}>PRESS SPACE TO START</ActionButton>
            </>
          )}

          {/* ── PAUSED ─────────────────────────────────────────────────────────── */}
          {status === "paused" && (
            <>
              <p className="text-5xl mb-3 select-none">⏸</p>
              <h2 className="text-2xl font-bold text-slate-100 mb-1 font-mono tracking-widest">
                PAUSED
              </h2>
              <p className="text-slate-500 text-xs font-mono mb-8">
                PRESS SPACE TO RESUME
              </p>
              <ActionButton onClick={resumeGame}>RESUME</ActionButton>
            </>
          )}

          {/* ── GAME OVER ──────────────────────────────────────────────────────── */}
          {status === "over" && (
            <>
              {isNewHighScore && (
                <motion.p
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="text-yellow-400 font-mono font-bold text-sm mb-2 tracking-widest"
                >
                  🎉 NEW RECORD!
                </motion.p>
              )}
              <p className="text-4xl mb-3 select-none">💀</p>
              <h2 className="text-2xl font-bold text-red-400 mb-3 font-mono tracking-widest">
                GAME OVER
              </h2>
              <div className="font-mono text-sm text-slate-400 mb-1">
                SCORE{" "}
                <span className="text-slate-200 font-bold">{score}</span>
              </div>
              <div className="font-mono text-sm text-slate-500 mb-8">
                BEST <span className="text-slate-300">{highScore}</span>
              </div>
              <ActionButton onClick={startGame}>PLAY AGAIN</ActionButton>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
