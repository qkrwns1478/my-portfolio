"use client";
import { useEffect, useRef } from "react";
import { Direction, getInterval, useSnakeStore } from "../../store/snakeStore";
import { useSnakeSound } from "../../hooks/useSnakeSound";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import GameOverlay from "./GameOverlay";
import ScoreBoard from "./ScoreBoard";

export default function SnakeGame() {
  // ── Store selectors ────────────────────────────────────────────────────────
  const status = useSnakeStore((s) => s.status);
  const score = useSnakeStore((s) => s.score);
  const level = useSnakeStore((s) => s.level);
  const isMuted = useSnakeStore((s) => s.isMuted);
  const pauseGame = useSnakeStore((s) => s.pauseGame);
  const resumeGame = useSnakeStore((s) => s.resumeGame);
  const tick = useSnakeStore((s) => s.tick);
  const setDirection = useSnakeStore((s) => s.setDirection);

  // ── Sound hook (stable refs internally) ───────────────────────────────────
  const sound = useSnakeSound(isMuted);
  // Keep a ref so effects always access the latest sound fns without listing them as deps
  const soundRef = useRef(sound);
  useEffect(() => { soundRef.current = sound; });

  // ── Previous-value refs for change detection ───────────────────────────────
  const prevScoreRef = useSnakeStore.getState;          // used inline
  const prevScoreNum = useRef(score);
  const prevLevelNum = useRef(level);
  const prevStatusRef = useRef<typeof status>("idle");
  // Timer ref: Robo levelup 메시지를 일정 시간 후 running 상태로 복귀
  const levelupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Game loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(tick, getInterval(level));
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, level]); // `tick` is a stable Zustand action – omit intentionally

  // ── Sound: food eaten (score increased by 1) ───────────────────────────────
  useEffect(() => {
    if (score > prevScoreNum.current) {
      soundRef.current.playGet();
    }
    prevScoreNum.current = score;
  }, [score]);

  // ── Sound + Robo: level up ─────────────────────────────────────────────────
  useEffect(() => {
    if (level > prevLevelNum.current) {
      soundRef.current.playLevelUp();
      window.dispatchEvent(
        new CustomEvent("robo-section", { detail: { sectionId: "snake-levelup" } })
      );
      // 3초 후 Robo를 running 기본 상태로 복귀
      if (levelupTimerRef.current) clearTimeout(levelupTimerRef.current);
      levelupTimerRef.current = setTimeout(() => {
        levelupTimerRef.current = null;
        window.dispatchEvent(
          new CustomEvent("robo-section", { detail: { sectionId: "snake-running" } })
        );
      }, 3000);
    }
    prevLevelNum.current = level;
  }, [level]);

  // ── Sound + Robo: status change ────────────────────────────────────────────
  useEffect(() => {
    const prev = prevStatusRef.current;

    // 게임이 멈추면 levelup Robo 복귀 타이머를 취소
    if (status !== "running" && levelupTimerRef.current) {
      clearTimeout(levelupTimerRef.current);
      levelupTimerRef.current = null;
    }

    if (status === "running" && prev !== "running") {
      soundRef.current.playBGM();
    } else if (status === "paused" && prev === "running") {
      soundRef.current.pauseBGM();
    } else if (status === "over" && prev === "running") {
      // Read isNewHighScore directly from Zustand – guaranteed to be latest
      const { isNewHighScore } = useSnakeStore.getState();
      soundRef.current.stopBGMAndPlayDie(
        isNewHighScore,
        isNewHighScore
          ? () => {
              // Dispatch after die.mp3 ends so Robo's highscore message
              // isn't buried under the game-over message
              window.dispatchEvent(
                new CustomEvent("robo-section", {
                  detail: { sectionId: "snake-highscore" },
                })
              );
            }
          : undefined
      );
    } else if (status === "idle") {
      soundRef.current.stopBGM();
    }

    window.dispatchEvent(
      new CustomEvent("robo-section", { detail: { sectionId: `snake-${status}` } })
    );

    prevStatusRef.current = status;

    // Unused ref to suppress TS lint
    void prevScoreRef;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // ── Keyboard input ─────────────────────────────────────────────────────────
  useEffect(() => {
    const DIR_MAP: Record<string, Direction> = {
      ArrowUp: "UP",    w: "UP",    W: "UP",
      ArrowDown: "DOWN", s: "DOWN", S: "DOWN",
      ArrowLeft: "LEFT", a: "LEFT", A: "LEFT",
      ArrowRight: "RIGHT", d: "RIGHT", D: "RIGHT",
    };

    const handleKey = (e: KeyboardEvent) => {
      const dir = DIR_MAP[e.key];
      if (dir) {
        e.preventDefault();
        // idle/over 상태에선 키보드로 게임 시작 불가 – 버튼으로만 시작
        if (status === "paused") resumeGame();
        if (status === "running" || status === "paused") setDirection(dir);
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        if (status === "running") pauseGame();
        else if (status === "paused") resumeGame();
        return;
      }
      if (e.key === "Escape") {
        if (status === "running") pauseGame();
        else if (status === "paused") resumeGame(); // ESC로 재개 가능
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, pauseGame, resumeGame, setDirection]);

  // ── Touch swipe ────────────────────────────────────────────────────────────
  useEffect(() => {
    let sx = 0;
    let sy = 0;

    const onStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };

    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) < 15 && Math.abs(dy) < 15) return; // ignore taps

      // idle/over 상태에선 스와이프로 게임 시작 불가 – 버튼으로만 시작
      if (status === "paused") resumeGame();
      if (status !== "running" && status !== "paused") return;

      const dir: Direction =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0 ? "RIGHT" : "LEFT"
          : dy > 0 ? "DOWN"  : "UP";
      setDirection(dir);
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [status, resumeGame, setDirection]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center w-full">
      <ScoreBoard />
      <div className="relative w-full border border-white/10">
        <GameBoard />
        <GameOverlay />
      </div>
      <GameControls />
    </div>
  );
}
