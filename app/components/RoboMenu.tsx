"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiMail, FiFileText } from "react-icons/fi";
import ContactMe from "./ContactMe";
import Resume from "./Resume";

export default function RoboMenu() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [hovered, setHovered] = useState<"none" | "contact" | "resume">("none");
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [roboPanicking, setRoboPanicking] = useState(false);
  const [showResetRobo, setShowResetRobo] = useState(false);
  const [resetRoboVisible, setResetRoboVisible] = useState(false);
  const [feedbackState, setFeedbackState] = useState<"default" | "success">("default");
  const [feedbackStatePDF, setFeedbackStatePDF] = useState<"default" | "success">("default");
  const pathname = usePathname();

  const [roboText, setRoboText] = useState("안녕하세요!\n무엇을 도와드릴까요?");
  const [roboImage, setRoboImage] = useState("/robo1.png");

  useEffect(() => {
    if (roboPanicking) {
      setRoboText("으아아악!!");
      setRoboImage("/robo5.png");
    } else if (!open) {
      if (pathname.startsWith("/projects")) {
        setRoboText("프로젝트 소개 페이지입니다.");
        setRoboImage("/robo3.png");
      } else if (pathname.startsWith("/about")) {
        setRoboText("자기소개 페이지입니다.");
        setRoboImage("/robo3.png");
      } else {
        setRoboText("안녕하세요!\n무엇을 도와드릴까요?");
        setRoboImage("/robo1.png");
      }
    } else {
      if (feedbackState === "success") {
        setRoboText("메일이 전송되었습니다.\n감사합니다!");
        setRoboImage("/robo4.png");
      } else if (feedbackStatePDF === "success") {
        setRoboText("파일이 다운로드되었습니다.\n감사합니다!");
        setRoboImage("/robo4.png");
      } else {
        if (hovered === "contact") setRoboText("이메일을 보낼 수 있어요!");
        else if (hovered === "resume") setRoboText("이력서를 열람할 수 있어요!");
        else setRoboText("원하는 기능을 선택하세요.");
        setRoboImage("/robo2.png");
      }
    }
  }, [open, hovered, pathname, feedbackState, feedbackStatePDF, roboPanicking]);

  return (
    <>
      <div className="fixed bottom-12 right-12 z-[150]">
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
                width={240}
                height={240}
                onClick={() => setOpen((prev) => !prev)}
                className="z-[200] relative transition cursor-pointer"
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
          )}

          {showResetRobo && (
            <div
              className={`fixed bottom-12 right-[-100px] z-[200] transition-all duration-500 ease-out ${
                resetRoboVisible ? "translate-x-[-20px] opacity-100" : "translate-x-0 opacity-0"
              }`}
            >
              <img
                src="/robo6.png"
                alt="Robo Reset Button"
                width={240}
                height={240}
                className="cursor-pointer"
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
    </>
  );
}
