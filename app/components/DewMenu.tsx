"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMail, FiFileText, FiSettings } from "react-icons/fi";
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import ContactMe from "./ContactMe";
import Resume from "./Resume";
import Settings from "./Settings";

const SHADOW_REST  = "drop-shadow(0 2px 14px rgba(0,0,0,0.65))";
const SHADOW_HOVER =
  "drop-shadow(0 4px 22px rgba(0,0,0,0.75)) drop-shadow(0 0 12px rgba(80,220,255,0.15))";

const menuItems = [
  {
    icon: <FiSettings size={20} />,
    label: "Settings",
    action: "settings",
    offsetY: "-205px",
    delay: "delay-100",
  },
  {
    icon: <FiMail size={20} />,
    label: "Contact Me",
    action: "contact",
    offsetY: "-140px",
    delay: "delay-50",
  },
  {
    icon: <FiFileText size={20} />,
    label: "Resume",
    action: "resume",
    offsetY: "-75px",
    delay: "delay-0",
  },
];

export default function DewMenu() {
  const [isOpen, setIsOpen]         = useState(false);
  const [hovered, setHovered]       = useState(false);
  const [contactOpen, setContactOpen]   = useState(false);
  const [resumeOpen, setResumeOpen]     = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const shaderRef = useRef<HTMLDivElement>(null);

  /* ── Liquid Metal Shader mount ── */
  useEffect(() => {
    const node = shaderRef.current;
    if (!node) return;
    node.innerHTML = "";

    const mount = new ShaderMount(
      node,
      liquidMetalFragmentShader,
      {
        u_repetition: 1.5,
        u_softness:   0.5,
        u_shiftRed:   0.3,
        u_shiftBlue:  0.3,
        u_distortion: 0,
        u_contour:    0,
        u_angle:      100,
        u_scale:      1.5,
        u_shape:      0,
        u_offsetX:    0.1,
        u_offsetY:   -0.1,
      },
      undefined,
      0.6,
    );

    return () => {
      const s = mount as { destroy?: () => void; unmount?: () => void };
      if (typeof s.destroy === "function") s.destroy();
      else if (typeof s.unmount === "function") s.unmount();
      if (node) node.innerHTML = "";
    };
  }, []);

  const handleMenuClick = (action: string) => {
    if (action === "contact")       setContactOpen(true);
    else if (action === "resume")   setResumeOpen(true);
    else if (action === "settings") setSettingsOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative w-14 h-14 flex items-center justify-center">

          {/* 메뉴 아이템 버튼 목록 */}
          {menuItems.map((item) => (
            <div
              key={item.action}
              className={`absolute z-[50] bottom-0 right-[2/3] transition-all duration-300 ${item.delay} group ${
                isOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-75 pointer-events-none"
              }`}
              style={{ transform: isOpen ? `translateY(${item.offsetY})` : "translateY(0)" }}
            >
              {/* 툴팁 */}
              <div
                className="absolute top-1/2 -translate-y-1/2 right-full mr-4 w-max px-3 py-1.5
                  bg-gray-800 text-white text-xs rounded-md
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              >
                {item.label}
              </div>

              {/* 서브 아이콘 버튼 */}
              <button
                onClick={() => handleMenuClick(item.action)}
                className="w-12 h-12 rounded-full shadow-lg
                  flex items-center justify-center
                  bg-[rgba(6,11,24,0.92)] text-slate-200
                  border border-white/15 hover:border-white/30
                  backdrop-blur-sm transition-all duration-300"
                aria-label={item.label}
              >
                {item.icon}
              </button>
            </div>
          ))}

          {/* ── 메인 버튼 — Liquid Metal ── */}
          <motion.div
            animate={{ filter: hovered ? SHADOW_HOVER : SHADOW_REST }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96, transition: { duration: 0.12 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{ position: "relative", zIndex: 200, cursor: "pointer" }}
          >
            {/* 외부 셸 — 셰이더가 3px 테두리처럼 노출됨 */}
            <div
              style={{
                position: "relative",
                padding: 3,
                borderRadius: "50%",
                overflow: "hidden",
                width: 56,
                height: 56,
              }}
            >
              {/* Liquid Metal Shader 배경 */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                <div ref={shaderRef} style={{ width: "100%", height: "100%" }} />
              </div>

              {/* 글래스 페이스 */}
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "rgba(6, 11, 24, 0.84)",
                  backdropFilter: "blur(28px) saturate(150%)",
                  WebkitBackdropFilter: "blur(28px) saturate(150%)",
                  border: "1px solid rgba(210,220,240,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                aria-label="메뉴 열기/닫기"
              >
                {/* 상단 하이라이트 */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "50%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
                    borderRadius: "50% 50% 0 0",
                    pointerEvents: "none",
                  }}
                />

                {/* 광택 스윕 */}
                <div
                  className="prism-sheen-bar"
                  style={{
                    position: "absolute",
                    top: 0, bottom: 0,
                    width: "60%",
                    background:
                      "linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* + 아이콘 */}
                <FiPlus
                  size={26}
                  style={{
                    position: "relative",
                    zIndex: 3,
                    color: "rgba(228,238,255,0.92)",
                    transition: "transform 0.3s",
                    transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                  }}
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 패널 컴포넌트 */}
      <ContactMe open={contactOpen} setOpen={setContactOpen} />
      <Resume    open={resumeOpen}  setOpen={setResumeOpen} />
      <Settings  open={settingsOpen} setOpen={setSettingsOpen} />
    </>
  );
}
