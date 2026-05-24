"use client";
import { useCallback, useEffect, useRef } from "react";

/**
 * Manages all snake-game audio:
 *  - BGM  : tetris.mp3  – looped during gameplay
 *  - SFX  : get.mp3 / levelup.mp3 / die.mp3 / highscore.mp3
 *
 * `isMuted` is read from snakeStore and kept in sync via a ref so that
 * all callbacks remain stable (no re-creation on mute toggle).
 */
export function useSnakeSound(isMuted: boolean) {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(isMuted);

  // Keep the muted ref in sync without recreating callbacks
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (isMuted) bgmRef.current?.pause();
  }, [isMuted]);

  // Initialise BGM element once on the client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const bgm = new Audio("/sounds/tetris.mp3");
    bgm.loop = true;
    bgm.volume = 0.4;
    bgmRef.current = bgm;
    return () => {
      bgm.pause();
      bgmRef.current = null;
    };
  }, []);

  // ── Generic SFX helper – new instance each call → overlap-safe ──────────────
  const playSFX = useCallback((src: string, volume = 0.7) => {
    if (isMutedRef.current) return;
    const sfx = new Audio(src);
    sfx.volume = volume;
    sfx.play().catch(() => {/* autoplay policy – silently ignore */});
  }, []);

  // ── BGM controls ────────────────────────────────────────────────────────────
  const playBGM = useCallback(() => {
    if (!bgmRef.current || isMutedRef.current) return;
    bgmRef.current.play().catch(() => {});
  }, []);

  const pauseBGM = useCallback(() => {
    bgmRef.current?.pause();
  }, []);

  const stopBGM = useCallback(() => {
    if (!bgmRef.current) return;
    bgmRef.current.pause();
    bgmRef.current.currentTime = 0;
  }, []);

  /**
   * Stop BGM, play die.mp3, then (optionally) play highscore.mp3
   * after die.mp3 finishes – guaranteed ordering via the `ended` event.
   *
   * `onDieEnded` is called once die.mp3 ends (or immediately when muted),
   * so callers can react precisely at the right moment (e.g. dispatch Robo events).
   */
  const stopBGMAndPlayDie = useCallback(
    (thenHighScore: boolean, onDieEnded?: () => void) => {
      // Always stop BGM regardless of mute state
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }

      if (isMutedRef.current) {
        // No audio – fire the callback immediately so Robo updates without waiting
        onDieEnded?.();
        return;
      }

      const dieAudio = new Audio("/sounds/die.mp3");
      dieAudio.volume = 0.8;
      dieAudio.play().catch(() => {});

      dieAudio.addEventListener(
        "ended",
        () => {
          if (thenHighScore && !isMutedRef.current) {
            const hsAudio = new Audio("/sounds/highscore.mp3");
            hsAudio.volume = 0.8;
            hsAudio.play().catch(() => {});
          }
          onDieEnded?.();
        },
        { once: true }
      );
    },
    []
  );

  // ── SFX shortcuts ────────────────────────────────────────────────────────────
  const playGet = useCallback(() => playSFX("/sounds/get.mp3", 0.7), [playSFX]);
  const playLevelUp = useCallback(() => playSFX("/sounds/levelup.mp3", 0.8), [playSFX]);

  return { playBGM, pauseBGM, stopBGM, stopBGMAndPlayDie, playGet, playLevelUp };
}
