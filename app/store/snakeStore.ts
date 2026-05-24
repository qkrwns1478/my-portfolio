import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ── Types ──────────────────────────────────────────────────────────────────────
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type GameStatus = "idle" | "running" | "paused" | "over";
export type Cell = { x: number; y: number };

// ── Constants ──────────────────────────────────────────────────────────────────
export const BOARD_SIZE = 20;
export const FOOD_PER_LEVEL = 5;

const OPPOSITE: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

/** ms per tick, indexed by (level - 1) */
const LEVEL_INTERVALS = [200, 180, 160, 140, 140, 120, 120, 100, 100, 80];

export function getInterval(level: number): number {
  return LEVEL_INTERVALS[Math.min(level - 1, LEVEL_INTERVALS.length - 1)];
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function randomCell(exclude: Cell[]): Cell {
  const occupied = new Set(exclude.map((c) => `${c.x},${c.y}`));
  let cell: Cell;
  do {
    cell = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (occupied.has(`${cell.x},${cell.y}`));
  return cell;
}

interface GameData {
  snake: Cell[];
  food: Cell;
  direction: Direction;
  nextDirection: Direction;
  status: GameStatus;
  score: number;
  level: number;
  foodEaten: number;
  isNewHighScore: boolean;
}

function getInitialData(): GameData {
  const snake: Cell[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  return {
    snake,
    food: randomCell(snake),
    direction: "RIGHT",
    nextDirection: "RIGHT",
    status: "idle",
    score: 0,
    level: 1,
    foodEaten: 0,
    isNewHighScore: false,
  };
}

// ── Store interface ────────────────────────────────────────────────────────────
interface SnakeState extends GameData {
  highScore: number;
  isMuted: boolean;

  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  tick: () => void;
  setDirection: (dir: Direction) => void;
  toggleMute: () => void;
}

// ── Store ──────────────────────────────────────────────────────────────────────
export const useSnakeStore = create<SnakeState>()(
  persist(
    (set, get) => ({
      ...getInitialData(),
      highScore: 0,
      isMuted: false,

      startGame: () =>
        set({
          ...getInitialData(),
          status: "running",
          highScore: get().highScore,
          isMuted: get().isMuted,
        }),

      pauseGame: () => {
        if (get().status === "running") set({ status: "paused" });
      },

      resumeGame: () => {
        if (get().status === "paused") set({ status: "running" });
      },

      resetGame: () =>
        set({
          ...getInitialData(),
          highScore: get().highScore,
          isMuted: get().isMuted,
        }),

      tick: () => {
        const { snake, food, nextDirection, score, highScore, level, foodEaten } =
          get();
        const direction = nextDirection;
        const head = snake[0];

        // Compute new head position
        let newHead: Cell;
        switch (direction) {
          case "UP":
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case "DOWN":
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case "LEFT":
            newHead = { x: head.x - 1, y: head.y };
            break;
          case "RIGHT":
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE
        ) {
          set({
            status: "over",
            highScore: Math.max(score, highScore),
            isNewHighScore: score > highScore,
          });
          return;
        }

        // Self collision – exclude tail since it moves away this tick
        const bodyWithoutTail = snake.slice(0, -1);
        if (bodyWithoutTail.some((c) => c.x === newHead.x && c.y === newHead.y)) {
          set({
            status: "over",
            highScore: Math.max(score, highScore),
            isNewHighScore: score > highScore,
          });
          return;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake: Cell[] = ateFood
          ? [newHead, ...snake]           // keep tail → snake grows
          : [newHead, ...snake.slice(0, -1)]; // drop tail → snake moves

        const newFoodEaten = ateFood ? foodEaten + 1 : foodEaten;
        const newScore = ateFood ? score + 1 : score;
        const newLevel = ateFood
          ? Math.min(10, Math.floor(newFoodEaten / FOOD_PER_LEVEL) + 1)
          : level;
        const newFood = ateFood ? randomCell(newSnake) : food;

        set({
          snake: newSnake,
          food: newFood,
          direction,
          score: newScore,
          level: newLevel,
          foodEaten: newFoodEaten,
        });
      },

      setDirection: (dir) => {
        const { direction, nextDirection } = get();
        // Ignore reverse inputs
        if (dir === OPPOSITE[direction]) return;
        if (dir === OPPOSITE[nextDirection]) return;
        set({ nextDirection: dir });
      },

      toggleMute: () => set({ isMuted: !get().isMuted }),
    }),
    {
      name: "snake-game",
      storage: createJSONStorage(() => localStorage),
      // Only persist score record and audio preference
      partialize: (state) => ({
        highScore: state.highScore,
        isMuted: state.isMuted,
      }),
    }
  )
);
