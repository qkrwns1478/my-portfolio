"use client";
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSettingsStore } from '../store/settingsStore';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const cyanColors = [
  '#06b6d4', // cyan-500
  '#22d3ee', // cyan-400
  '#67e8f9', // cyan-300
  '#a5f3fc', // cyan-200
];

export default function CustomCursor() {
  const { cursorEffect } = useSettingsStore();
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const lastCursorPos = useRef({ x: 0, y: 0 });
  const particleId = useRef(0);

  const createParticles = useCallback((x: number, y: number) => {
    const count = 3;
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      
      const color = cyanColors[Math.floor(Math.random() * cyanColors.length)];

      newParticles.push({
        id: particleId.current++,
        x: x,
        y: y,
        size: Math.random() * 10 + 5,
        opacity: 1,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: color,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const animateParticles = useCallback(() => {
    setParticles(prevParticles => {
      return prevParticles
        .map(p => {
          const newLife = p.life - 0.03;
          if (newLife <= 0) return null;

          return {
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: newLife,
            size: p.size * 0.97,
            life: newLife,
          };
        })
        .filter((p): p is Particle => p !== null);
    });

    animationFrameId.current = requestAnimationFrame(animateParticles);
  }, []);

  useEffect(() => {
    if (cursorEffect === 'On') {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const dist = Math.hypot(clientX - lastCursorPos.current.x, clientY - lastCursorPos.current.y);
        
        if (dist > 10) {
          createParticles(clientX, clientY);
          lastCursorPos.current = { x: clientX, y: clientY };
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      animationFrameId.current = requestAnimationFrame(animateParticles);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        setParticles([]);
      };
    }
  }, [cursorEffect, animateParticles, createParticles]);

  if (cursorEffect === 'Off') {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-[999]">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
            border: `2px solid ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}