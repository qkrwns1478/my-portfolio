"use client";
import { useState } from "react";
import { FiPlus, FiX, FiMail, FiFileText } from "react-icons/fi";
import ContactMe from "./ContactMe";
import Resume from "./Resume";
import { Tooltip } from "react-tooltip";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <div className="relative w-14 h-14">
          <button
            onClick={() => setContactOpen(true)}
            data-tooltip-id="menu-tooltip"
            data-tooltip-content="이메일 보내기"
            className={`absolute bottom-0 right-0 w-12 h-12 z-[50] bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center transition-all duration-300
              ${open ? "translate-y-[-80px] opacity-100 scale-100 pointer-events-auto" : "translate-y-0 opacity-0 scale-75 pointer-events-none"}
            `}
          >
            <FiMail size={20} />
          </button>

          <button
            onClick={() => setResumeOpen(true)}
            data-tooltip-id="menu-tooltip"
            data-tooltip-content="이력서 보기"
            className={`absolute bottom-0 right-0 w-12 h-12 z-[50] bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center transition-all duration-300
              ${open ? "translate-x-[-80px] opacity-100 scale-100 pointer-events-auto" : "translate-x-0 opacity-0 scale-75 pointer-events-none"}
            `}
          >
            <FiFileText size={20} />
          </button>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-14 h-14 z-[100] bg-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-cyan-400 transition"
            aria-label="메뉴 버튼"
          >
            {open ? <FiX size={24} /> : <FiPlus size={24} />}
          </button>
        </div>
      </div>

      {/* Tooltip */}
      <Tooltip id="menu-tooltip" place="left" className="z-[100]" />

      {/* 패널 */}
      <ContactMe open={contactOpen} setOpen={setContactOpen} />
      <Resume open={resumeOpen} setOpen={setResumeOpen} />
    </>
  );
}
