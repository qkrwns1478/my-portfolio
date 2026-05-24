"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSnakeStore } from "../../store/snakeStore";

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-center min-w-[52px]">
      <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-0.5">
        {label}
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}

export default function ScoreBoard() {
  const score = useSnakeStore((s) => s.score);
  const highScore = useSnakeStore((s) => s.highScore);
  const level = useSnakeStore((s) => s.level);
  const isMuted = useSnakeStore((s) => s.isMuted);
  const toggleMute = useSnakeStore((s) => s.toggleMute);

  // Animate score number on change
  const [scoreKey, setScoreKey] = useState(0);
  const prevScoreRef = useRef(score);
  useEffect(() => {
    if (score !== prevScoreRef.current) {
      setScoreKey((k) => k + 1);
      prevScoreRef.current = score;
    }
  }, [score]);

  return (
    <div className="flex items-center justify-between w-full pb-3">
      <div className="flex items-center gap-5">
        {/* Score */}
        <Stat label="SCORE">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={scoreKey}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="text-xl font-bold text-slate-100 font-mono"
            >
              {score}
            </motion.span>
          </AnimatePresence>
        </Stat>

        {/* Best */}
        <Stat label="BEST">
          <span className="text-xl font-bold text-slate-400 font-mono">{highScore}</span>
        </Stat>

        {/* Level */}
        <Stat label="LV">
          <span className="text-xl font-bold text-slate-400 font-mono">{level}</span>
        </Stat>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-500 hover:text-slate-200 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
      </button>
    </div>
  );
}
