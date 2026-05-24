"use client";
import { useEffect, useRef, useState } from "react";
import { useSnakeStore, BOARD_SIZE } from "../../store/snakeStore";

export default function GameBoard() {
  const snake = useSnakeStore((s) => s.snake);
  const food = useSnakeStore((s) => s.food);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Canvas resolution tracks wrapper width (max 480 px)
  const [size, setSize] = useState(400);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const update = () => {
      const w = Math.floor(wrapper.clientWidth);
      setSize(Math.min(w, 480));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  // ── Draw frame whenever snake / food / size changes ───────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cs = size / BOARD_SIZE; // cell size in px

    // ── Background ────────────────────────────────────────────────────────────
    ctx.fillStyle = "#06080f";
    ctx.fillRect(0, 0, size, size);

    // ── Grid lines ───────────────────────────────────────────────────────────
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= BOARD_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cs, 0);
      ctx.lineTo(i * cs, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cs);
      ctx.lineTo(size, i * cs);
      ctx.stroke();
    }

    // ── Food (orange glow) ────────────────────────────────────────────────────
    const pad = Math.max(1, cs * 0.15);
    const r = Math.max(2, cs * 0.2);

    ctx.shadowColor = "#f97316";
    ctx.shadowBlur = cs * 0.8;
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.roundRect(
      food.x * cs + pad,
      food.y * cs + pad,
      cs - pad * 2,
      cs - pad * 2,
      r
    );
    ctx.fill();
    ctx.shadowBlur = 0; // ← reset before drawing snake

    // ── Snake ────────────────────────────────────────────────────────────────
    snake.forEach((cell, idx) => {
      const isHead = idx === 0;
      const alpha = Math.max(0.25, 1 - idx * 0.025);

      ctx.fillStyle = isHead
        ? "#e2e8f0"
        : `rgba(100,116,139,${alpha.toFixed(2)})`;

      ctx.beginPath();
      ctx.roundRect(
        cell.x * cs + 1,
        cell.y * cs + 1,
        cs - 2,
        cs - 2,
        isHead ? Math.max(2, cs * 0.25) : Math.max(1, cs * 0.15)
      );
      ctx.fill();
    });

    // ── Border ────────────────────────────────────────────────────────────────
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
  }, [snake, food, size]);

  return (
    <div ref={wrapperRef} className="w-full">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="block"
        aria-label="Snake game board – use arrow keys or WASD to play"
      />
    </div>
  );
}
