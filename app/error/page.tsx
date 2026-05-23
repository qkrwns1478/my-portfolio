"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import MetalButton from "../components/MetalButton";
import { useSettingsStore } from "../store/settingsStore";

const glitchVariants: Variants = {
  animate: {
    x: [0, -3, 3, -2, 2, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut",
    },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ErrorPage() {
  const { language } = useSettingsStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-8 relative overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 4px)",
        }}
      />

      <motion.div
        className="flex flex-col items-center gap-6 max-w-lg w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 glitch number */}
        <motion.div variants={itemVariants}>
          <motion.h1
            className="text-[clamp(6rem,22vw,14rem)] font-extrabold leading-none tracking-tight select-none"
            style={{
              background:
                "linear-gradient(135deg, #94a3b8 0%, #e2e8f0 40%, #64748b 70%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 24px rgba(148,163,184,0.3))",
            }}
            variants={glitchVariants}
            animate="animate"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Floating separator */}
        <motion.div variants={itemVariants} className="w-full">
          <motion.div
            className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"
            variants={floatVariants}
            animate="animate"
          />
        </motion.div>

        {/* Error message */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className="text-xl sm:text-2xl font-semibold text-slate-200">
            {language === "Kor" ? "페이지를 찾을 수 없습니다" : "Page Not Found"}
          </p>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {language === "Kor"
              ? "요청하신 페이지가 존재하지 않거나\n삭제된 것 같습니다."
              : "The page you requested doesn't exist\nor may have been removed."}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="pt-2 flex justify-center">
          <MetalButton href="/" className="w-44">
            {language === "Kor" ? "홈으로 돌아가기" : "Back to Home"}
          </MetalButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
