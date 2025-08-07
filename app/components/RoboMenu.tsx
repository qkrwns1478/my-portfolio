"use client";
import Image from 'next/image'
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMail, FiFileText } from "react-icons/fi";
import ContactMe from "./ContactMe";
import Resume from "./Resume";

export default function RoboMenu() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [hovered, setHovered] = useState<"none" | "contact" | "resume">("none");
  const [feedbackState, setFeedbackState] = useState<"default" | "success">("default");
  const pathname = usePathname();

  let roboText = "안녕하세요!\n무엇을 도와드릴까요?";
  let roboImage = "/robo1.png";

  if (!open) {
    if (pathname.startsWith("/projects")) {
      roboText = "프로젝트 소개 페이지입니다.";
      roboImage = "/robo3.png";
    } else if (pathname.startsWith("/about")) {
      roboText = "자기소개 페이지입니다.";
      roboImage = "/robo3.png";
    } else {
      roboText = "안녕하세요!\n무엇을 도와드릴까요?";
      roboImage = "/robo1.png";
    }
  }
  if (open) {
    if (feedbackState === "success") {
      roboText = "메일이 전송되었습니다.\n감사합니다!";
      roboImage = "/robo4.png";
    } else {
      if (hovered === "contact") roboText = "이메일을 보낼 수 있어요!";
      else if (hovered === "resume") roboText = "이력서를 열람할 수 있어요!";
      else roboText = "원하는 기능을 선택하세요.";
      roboImage = "/robo2.png";
    }
  }

  return (
    <>
      <div className="fixed bottom-12 right-12">
        <div className="relative">
          <div className="absolute w-full bottom-full mb-2 left-1/2 -translate-x-1/2 text-white z-50">
            <div className="whitespace-pre-line bg-black border-4 border-white px-3 py-2 font-mono text-sm leading-tight rounded-none">
              {roboText}
            </div>
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-t-4 border-r-4 border-white rotate-135"></div>
          </div>

          <Image
            src={roboImage} alt="Robo Button" width={240} height={240}
            onClick={() => setOpen((prev) => !prev)}
            className="z-[100] relative transition cursor-pointer"
          />

          <button
            onClick={() => setContactOpen(true)}
            onMouseEnter={() => setHovered("contact")}
            onMouseLeave={() => setHovered("none")}
            className={`absolute bottom-24 right-24 w-12 h-12 z-[50] bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-300 transition-all duration-300
              ${open ? "translate-x-[-160px] translate-y-[-100px] opacity-100 scale-100 pointer-events-auto" : "translate-y-0 opacity-0 scale-75 pointer-events-none"}
            `}
          >
            <FiMail size={20} />
          </button>

          <button
            onClick={() => setResumeOpen(true)}
            onMouseEnter={() => setHovered("resume")}
            onMouseLeave={() => setHovered("none")}
            className={`absolute bottom-24 right-24 w-12 h-12 z-[50] bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-300 transition-all duration-300
              ${open ? "translate-x-[-160px] opacity-100 scale-100 pointer-events-auto" : "translate-x-0 opacity-0 scale-75 pointer-events-none"}
            `}
          >
            <FiFileText size={20} />
          </button>
        </div>
      </div>

      <ContactMe
        open={contactOpen}
        setOpen={setContactOpen}
        onSuccess={() => {
          setFeedbackState("success");
          setContactOpen(false);
          setTimeout(() => setFeedbackState("default"), 5000);
        }}
      />
      <Resume open={resumeOpen} setOpen={setResumeOpen} />
    </>
  );
}
