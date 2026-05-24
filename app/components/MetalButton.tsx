"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";

// ── Outer drop-shadow ─────────────────────────────────────────────────────
const SHADOW_REST = "drop-shadow(0 2px 14px rgba(0,0,0,0.65))";
const SHADOW_HOVER = "drop-shadow(0 4px 22px rgba(0,0,0,0.75)) " + "drop-shadow(0 0  12px rgba(80,220,255,0.15))";

// ─────────────────────────────────────────────────────────────────────────
interface PrismButtonProps {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function PrismButton({ href, onClick, children, className = "" }: PrismButtonProps) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // React Strict Mode 마운트 꼬임 방지
    node.innerHTML = "";

    const mount = new ShaderMount(
      node,
      liquidMetalFragmentShader,
      {
        u_repetition: 1.5,
        u_softness: 0.5,
        u_shiftRed: 0.3,
        u_shiftBlue: 0.3,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 100,
        u_scale: 1.5,
        u_shape: 0,
        u_offsetX: 0.1,
        u_offsetY: -0.1,
      },
      undefined,
      0.6,
    );

    return () => {
      const s = mount as { destroy?: () => void; unmount?: () => void };
      if (typeof s.destroy === "function") s.destroy();
      else if (typeof s.unmount === "function") s.unmount();
      if (node) {
        node.innerHTML = "";
      }
    };
  }, []);

  const core = (
    <motion.div
      animate={{ filter: hovered ? SHADOW_HOVER : SHADOW_REST }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.968, transition: { duration: 0.12 } }}
      style={{ display: "inline-flex", cursor: "pointer" }}
    >
      {/*
       * ── Button shell ──
       * 외부 래퍼에 4px 패딩을 주고 내부에 글래스 페이스를 배치하여
       * 배경으로 깔린 WebGL 캔버스가 2px 테두리처럼 노출되게 합니다.
       */}
      <div
        style={{
          position: "relative",
          padding: 4,
          borderRadius: 14, // inner border-radius (12) + padding (2)
          overflow: "hidden",
        }}
      >
        {/* ── Liquid Metal Shader Background ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            aspectRatio: "1 / 1",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {/* 스트레칭 없이 원래 비율대로 그려지는 캔버스 영역 */}
          <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* ── Glass face ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: 12,
            padding: "11px 28px",
            background: "rgba(6, 11, 24, 0.84)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            border: "1px solid rgba(210,220,240,0.07)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            overflow: "hidden",
            minWidth: 130,
            justifyContent: "center",
          }}
        >
          {/* Top specular gloss */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
              borderRadius: "12px 12px 0 0",
              pointerEvents: "none",
            }}
          />

          {/* Bottom catch-light */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "22%",
              right: "22%",
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Periodic light sweep */}
          <div
            className="prism-sheen-bar"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "36%",
              background: "linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Label */}
          <span
            style={{
              position: "relative",
              zIndex: 3,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "rgba(228,238,255,0.92)",
              textShadow: "0 1px 10px rgba(160,190,255,0.20)",
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </span>

          {/* Arrow */}
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowRight size={15} color="rgba(190,215,255,0.80)" strokeWidth={2.2} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} style={{ display: "inline-block", textDecoration: "none" }} className={className}>
        {core}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      {core}
    </button>
  );
}
