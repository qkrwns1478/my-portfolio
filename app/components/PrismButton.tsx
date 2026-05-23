"use client";

/**
 * PrismButton — holographic-foil border on a glass button
 *
 * Border technique:
 *   ① conic-gradient on .prism-wrapper, centered at the div's middle
 *      → smooth angular colour sweep (cyan → blue → violet → magenta → amber → cyan)
 *   ② inner glass face sits inside the 2 px padding gap, covering the gradient center
 *      → only the 2 px ring at the edge remains visible (no mask-composite needed)
 *   ③ .prism-wrapper::before — blurred copy of the same gradient behind the ring
 *      → soft ambient holographic glow bleeding outward
 *   ④ @property --prism-angle (globals.css) animates the sweep on the GPU
 *      → colours flow smoothly around the border like a rotating holographic foil
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

// ── Outer drop-shadow ─────────────────────────────────────────────────────
const SHADOW_REST  = "drop-shadow(0 2px 14px rgba(0,0,0,0.65))";
const SHADOW_HOVER =
  "drop-shadow(0 4px 22px rgba(0,0,0,0.75)) " +
  "drop-shadow(0 0  12px rgba(80,220,255,0.15))";

// ─────────────────────────────────────────────────────────────────────────
interface PrismButtonProps {
  href?:      string;
  onClick?:   () => void;
  children?:  React.ReactNode;
  className?: string;
}

export default function PrismButton({
  href,
  onClick,
  children,
  className = "",
}: PrismButtonProps) {
  const [hovered, setHovered] = useState(false);

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
       * .prism-wrapper: structural, padding:2px creates the ring gap.
       * .prism-border-ring: absolute inside it, repeating-radial-gradient
       *   + mask-composite to show only the 2 px ring as iridescent metal foil.
       */}
      <div className="prism-wrapper">
        <div className="prism-border-ring" />

        {/* ── Glass face ── */}
        <div
          style={{
            position:              "relative",
            zIndex:                1,
            borderRadius:          12,
            padding:               "11px 28px",
            background:            "rgba(6, 11, 24, 0.84)",
            backdropFilter:        "blur(28px) saturate(150%)",
            WebkitBackdropFilter:  "blur(28px) saturate(150%)",
            border:                "1px solid rgba(210,220,240,0.07)",
            display:               "inline-flex",
            alignItems:            "center",
            gap:                   8,
            overflow:              "hidden",
            minWidth:              130,
            justifyContent:        "center",
          }}
        >
          {/* Top specular gloss */}
          <div
            style={{
              position:     "absolute",
              top: 0, left: 0, right: 0,
              height:       "50%",
              background:   "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
              borderRadius: "12px 12px 0 0",
              pointerEvents: "none",
            }}
          />

          {/* Bottom catch-light */}
          <div
            style={{
              position:   "absolute",
              bottom: 0, left: "22%", right: "22%",
              height:     1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Periodic light sweep */}
          <div
            className="prism-sheen-bar"
            style={{
              position:   "absolute",
              top: 0, bottom: 0,
              width:      "36%",
              background: "linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Label */}
          <span
            style={{
              position:      "relative",
              zIndex:        3,
              fontSize:      15,
              fontWeight:    600,
              letterSpacing: "0.05em",
              color:         "rgba(228,238,255,0.92)",
              textShadow:    "0 1px 10px rgba(160,190,255,0.20)",
              whiteSpace:    "nowrap",
            }}
          >
            {children}
          </span>

          {/* Arrow */}
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            style={{
              position:   "relative",
              zIndex:     3,
              display:    "flex",
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
      <Link
        href={href}
        style={{ display: "inline-block", textDecoration: "none" }}
        className={className}
      >
        {core}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      {core}
    </button>
  );
}
