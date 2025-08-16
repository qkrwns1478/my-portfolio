"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { FiMail, FiFileText, FiSettings } from "react-icons/fi";
import ContactMe from "./ContactMe";
import Resume from "./Resume";
import Settings from "./Settings";
import { useSettingsStore } from '../store/settingsStore';

const buttonContainerVariants: Variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {},
};

const buttonVariants: Variants = {
  open: (custom: { x: number; y: number }) => ({
    opacity: 1,
    scale: 1,
    x: custom.x,
    y: custom.y,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  }),
  closed: {
    opacity: 0,
    scale: 0.5,
    x: 0,
    y: 0,
  },
};

export default function RoboMenu() {
  const { language }= useSettingsStore();

  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hovered, setHovered] = useState<"none" | "contact" | "resume" | "settings">("none");
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [roboPanicking, setRoboPanicking] = useState(false);
  const [showResetRobo, setShowResetRobo] = useState(false);
  const [resetRoboVisible, setResetRoboVisible] = useState(false);
  const [feedbackState, setFeedbackState] = useState<"default" | "success">("default");
  const [feedbackStatePDF, setFeedbackStatePDF] = useState<"default" | "success">("default");
  const pathname = usePathname();

  const [roboText, setRoboText] = useState("...");
  const [roboImage, setRoboImage] = useState("/images/robo/robo1.png");

  useEffect(() => {
    if (roboPanicking) {
      setRoboText(language === "Kor" ? "으아아악!!" : "NOOOOOOO!!");
      setRoboImage("/images/robo/robo5.png");
    } else if (!open) {
      if (pathname.startsWith("/projects")) {
        setRoboText(language === "Kor" ? "프로젝트 소개 페이지입니다." : "These are the projects that I'd worked on.");
        setRoboImage("/images/robo/robo3.png");
      } else if (pathname.startsWith("/about")) {
        setRoboText(language === "Kor" ? "자기소개 페이지입니다." : "Let me introduce myself.");
        setRoboImage("/images/robo/robo3.png");
      } else {
        setRoboText(language === "Kor" ? "안녕하세요!\n무엇을 도와드릴까요?" : "Howdy! How can I help you?");
        setRoboImage("/images/robo/robo1.png");
      }
    } else {
      if (feedbackState === "success") {
        setRoboText(language === "Kor" ? "메일이 전송되었습니다.\n감사합니다!" : "Your mail has been sent.\nThank you!");
        setRoboImage("/images/robo/robo4.png");
      } else if (feedbackStatePDF === "success") {
        setRoboText(language === "Kor" ? "파일이 다운로드되었습니다.\n감사합니다!" : "The file has been downloaded.\nThank you!");
        setRoboImage("/images/robo/robo4.png");
      } else {
        if (hovered === "contact") setRoboText(language === "Kor" ? "이메일을 보낼 수 있어요!" : "You can send a mail to me!");
        else if (hovered === "resume") setRoboText(language === "Kor" ? "이력서를 열람할 수 있어요!" : "You can read my resume!");
        else if (hovered === "settings") setRoboText(language === "Kor" ? "설정 메뉴를 열 수 있어요!" : "You can open the settings menu!");
        else setRoboText(language === "Kor" ? "원하는 기능을 선택하세요." : "Choose a button!");
        setRoboImage("/images/robo/robo2.png");
      }
    }
  }, [open, hovered, pathname, feedbackState, feedbackStatePDF, roboPanicking, language]);

  useEffect(() => {
    const imagesToPreload = [
      '/images/robo/robo1.png',
      '/images/robo/robo2.png',
      '/images/robo/robo3.png',
      '/images/robo/robo4.png',
      '/images/robo/robo5.png',
      '/images/robo/robo6.png',
    ];
  
    imagesToPreload.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <>
      <div className="fixed bottom-2 right-2 sm:bottom-8 sm:right-8 z-[150]">
        <div className="relative">
          {isImageVisible && (
            <div
              className={`relative w-fit z-[200] transition-all duration-500 ease-in-out ${
                isSlidingOut ? "translate-x-[500px] opacity-0" : "translate-x-0 opacity-100"
              }`}
              onTransitionEnd={() => {
                if (isSlidingOut) setIsImageVisible(false);
              }}
            >
              <div className="absolute w-full z-[200] bottom-full mb-2 left-1/2 -translate-x-1/2 text-white">
                <div className="whitespace-pre-line bg-black border-4 border-white px-3 py-2 font-mono text-sm leading-tight rounded-none">
                  {roboText}
                </div>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-t-4 border-r-4 border-white rotate-135"></div>
              </div>

              {open && (
                <button
                  onClick={() => {
                    setOpen(false);
                    setRoboPanicking(true);
                    setIsSlidingOut(true);
                    setTimeout(() => {
                      setShowResetRobo(true);
                      setTimeout(() => setResetRoboVisible(true), 10);
                    }, 1000);
                  }}
                  className="absolute top-2 right-2 z-[201] text-slate-600 w-6 h-6 flex items-center justify-center shadow hover:text-slate-300 cursor-pointer"
                >
                  ✕
                </button>
              )}

              <img
                src={roboImage}
                alt="Robo Button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] z-[200] relative transition cursor-pointer"
              />

              <motion.div
                className="absolute bottom-36 right-24 sm:right-36"
                initial="closed"
                animate={open ? "open" : "closed"}
                variants={buttonContainerVariants}
              >
                <motion.button
                  onClick={() => setContactOpen(true)}
                  onMouseEnter={() => setHovered("contact")}
                  onMouseLeave={() => setHovered("none")}
                  className="absolute w-12 h-12 z-[50] bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-300"
                  variants={buttonVariants}
                  custom={{ x: -160, y: 0 }}
                >
                  <FiMail size={20} />
                </motion.button>

                <motion.button
                  onClick={() => setResumeOpen(true)}
                  onMouseEnter={() => setHovered("resume")}
                  onMouseLeave={() => setHovered("none")}
                  className="absolute w-12 h-12 z-[50] bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-300"
                  variants={buttonVariants}
                  custom={{ x: -160, y: 80 }}
                >
                  <FiFileText size={20} />
                </motion.button>

                <motion.button
                  onClick={() => setSettingsOpen(true)}
                  onMouseEnter={() => setHovered("settings")}
                  onMouseLeave={() => setHovered("none")}
                  className="absolute w-12 h-12 z-[50] bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-300"
                  variants={buttonVariants}
                  custom={{ x: -160, y: -80 }}
                >
                  <FiSettings size={20} />
                </motion.button>
              </motion.div>
            </div>
          )}

          {showResetRobo && (
            <div
              className={`fixed bottom-8 right-[-100px] z-[200] transition-all duration-500 ease-out ${
                resetRoboVisible ? "translate-x-[-20px] opacity-100" : "translate-x-0 opacity-0"
              }`}
            >
              <img
                src="/images/robo/robo6.png"
                alt="Robo Reset Button"
                className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] cursor-pointer"
                onClick={() => {
                  setResetRoboVisible(false);
                  setIsImageVisible(true);
                  setTimeout(() => {
                    setOpen(false);
                    setHovered("none");
                    setRoboPanicking(false);
                    setFeedbackState("default");
                    setFeedbackStatePDF("default");
                    setIsSlidingOut(false);
                    setShowResetRobo(false);
                  }, 500);
                }}
              />
            </div>
          )}
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
      <Resume
        open={resumeOpen}
        setOpen={setResumeOpen}
        onSuccess={() => {
          setFeedbackStatePDF("success");
          setResumeOpen(false);
          setTimeout(() => setFeedbackStatePDF("default"), 5000);
        }}
      />
      <Settings
        open={settingsOpen}
        setOpen={setSettingsOpen}
      />
    </>
  );
}
