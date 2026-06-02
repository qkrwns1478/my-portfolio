"use client";
import NextImage from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { FiMail, FiFileText, FiSettings } from "react-icons/fi";
import ContactMe from "./ContactMe";
import Resume from "./Resume";
import Settings from "./Settings";
import { useSettingsStore, Language } from '../store/settingsStore';

type IdleState = "active" | "drowsing" | "sleeping" | "surprised";

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

// ─── 홈 페이지 섹션별 Robo 코멘트 ────────────────────────────────────────────
const sectionMessages: Record<string, { Kor: string; Eng: string }> = {
  "features-section": {
    Kor: "자랑스러운 프로젝트들이\n여기 있어요! 👀",
    Eng: "Here are my\nproudest projects! 👀",
  },
  "tech-section": {
    Kor: "이 기술들을 실제로\n다뤄봤어요! 💪",
    Eng: "I've actually used\nall of these! 💪",
  },
  "links-section": {
    Kor: "GitHub이나 블로그도\n한번 들러보세요!",
    Eng: "Feel free to check\nout my GitHub!",
  },
  // ── Snake game events ──────────────────────────────────────────────────────
  "snake-idle": {
    Kor: "스네이크 게임을 즐겨보세요! 🐍",
    Eng: "Enjoy the Snake game! 🐍",
  },
  "snake-running": {
    Kor: "열심히 해봐요!",
    Eng: "Go for it!",
  },
  "snake-paused": {
    Kor: "잠깐 쉬어가는 건가요? 😏",
    Eng: "Taking a breather? 😏",
  },
  "snake-over": {
    Kor: "괜찮아요,\n다시 해봐요! 💪",
    Eng: "Don't give up!\nTry again! 💪",
  },
  "snake-levelup": {
    Kor: "레벨 업!\n빠르게 달려요! 🔥",
    Eng: "Level up!\nGo faster! 🔥",
  },
  "snake-highscore": {
    Kor: "🎉 최고 기록을 경신했어요!!",
    Eng: "🎉 New high score!!",
  },
};

// ─── 시간대별 기본 인사말 ─────────────────────────────────────────────────────
function getTimeGreeting(lang: Language): string {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 6) {
    return lang === "Kor"
      ? "밤새 코딩하셨나요?\n저도 늦게까지 일해봤어요!"
      : "Burning the midnight oil?\nSo have I!";
  }
  if (hour >= 6 && hour < 12) {
    return lang === "Kor"
      ? "좋은 아침이에요!\n오늘도 좋은 하루 되세요!"
      : "Good morning!\nHave a great day!";
  }
  if (hour >= 12 && hour < 18) {
    return lang === "Kor"
      ? "안녕하세요!\n무엇을 도와드릴까요?"
      : "Howdy!\nHow can I help you?";
  }
  return lang === "Kor"
    ? "저녁 시간에 오셨군요!\n편하게 둘러보세요."
    : "Evening visit!\nTake your time.";
}

export default function RoboMenu() {
  const { language } = useSettingsStore();

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
  const [roboImage, setRoboImage] = useState("/images/robo/robo1.webp");
  const [activeSectionId, setActiveSectionId] = useState("");

  // ── 아이들 상태 ──────────────────────────────────────────────────────────────
  const [idleState, setIdleState] = useState<IdleState>("active");
  const idleStateRef = useRef<IdleState>("active");
  // eslint-disable-next-line react-hooks/purity
  const lastActivityRef = useRef<number>(Date.now());

  // ── Robo 클릭 핸들러 (아이들 상태 고려) ──────────────────────────────────────
  const handleRoboClick = useCallback(() => {
    const current = idleStateRef.current;
    if (current === "drowsing" || current === "sleeping") {
      idleStateRef.current = "surprised";
      setIdleState("surprised");
      lastActivityRef.current = Date.now();
      setTimeout(() => {
        idleStateRef.current = "active";
        setIdleState("active");
      }, 2000);
      return;
    }
    setOpen((prev) => !prev);
  }, []);

  // ── 말풍선 텍스트 & 이미지 결정 ──────────────────────────────────────────────
  useEffect(() => {
    if (roboPanicking) {
      setRoboText(language === "Kor" ? "으아아악!!" : "NOOOOOOO!!");
      setRoboImage("/images/robo/robo5.webp");
      return;
    }

    if (!open) {
      // 아이들 상태 우선 처리
      if (idleState === "sleeping") {
        setRoboText("ZZZ...");
        setRoboImage("/images/robo/robo8.webp");
        return;
      }
      if (idleState === "surprised") {
        setRoboText(language === "Kor" ? "으앗! 깜짝이야!" : "Oh! You startled me!");
        setRoboImage("/images/robo/robo9.webp");
        return;
      }

      // 페이지별 이미지 (drowsing일 땐 robo7로 교체)
      const isDrowsing = idleState === "drowsing";

      if (pathname === "/error") {
        setRoboText(language === "Kor" ? "이런! 페이지를\n찾지 못했어요..." : "Oops! I couldn't\nfind that page...");
        setRoboImage(isDrowsing ? "/images/robo/robo7.webp" : "/images/robo/robo404.webp");
      } else if (pathname.startsWith("/projects")) {
        setRoboText(language === "Kor" ? "프로젝트 소개 페이지입니다." : "These are the projects that I'd worked on.");
        setRoboImage(isDrowsing ? "/images/robo/robo7.webp" : "/images/robo/robo3.webp");
      } else if (pathname.startsWith("/about")) {
        setRoboText(language === "Kor" ? "자기소개 페이지입니다." : "Let me introduce myself.");
        setRoboImage(isDrowsing ? "/images/robo/robo7.webp" : "/images/robo/robo3.webp");
      } else if (pathname.startsWith("/snake")) {
        // Snake page: 섹션 이벤트(snake-*)가 오면 sectionMessages에서 처리,
        // 이벤트 없을 땐 기본 안내 문구
        const sectionMsg = activeSectionId ? sectionMessages[activeSectionId] : null;
        setRoboText(
          sectionMsg
            ? language === "Kor" ? sectionMsg.Kor : sectionMsg.Eng
            : language === "Kor" ? "스네이크 게임을\n즐겨보세요! 🐍" : "Enjoy the\nSnake game! 🐍"
        );
        // 레벨업·최고점 경신 이벤트에선 robo4(응원) 이미지 사용
        const isExcitedEvent =
          activeSectionId === "snake-levelup" || activeSectionId === "snake-highscore";
        setRoboImage(
          isDrowsing
            ? "/images/robo/robo7.webp"
            : isExcitedEvent
            ? "/images/robo/robo4.webp"
            : "/images/robo/robo3.webp"
        );
      } else if (pathname === "/") {
        // 홈: 스크롤 섹션 코멘트 우선, 없으면 시간대별 인사말
        const sectionMsg = activeSectionId ? sectionMessages[activeSectionId] : null;
        setRoboText(
          sectionMsg
            ? language === "Kor" ? sectionMsg.Kor : sectionMsg.Eng
            : getTimeGreeting(language)
        );
        setRoboImage(isDrowsing ? "/images/robo/robo7.webp" : "/images/robo/robo1.webp");
      } else {
        setRoboText(getTimeGreeting(language));
        setRoboImage(isDrowsing ? "/images/robo/robo7.webp" : "/images/robo/robo1.webp");
      }
    } else {
      if (feedbackState === "success") {
        setRoboText(language === "Kor" ? "메일이 전송되었습니다.\n감사합니다!" : "Your mail has been sent.\nThank you!");
        setRoboImage("/images/robo/robo4.webp");
      } else if (feedbackStatePDF === "success") {
        setRoboText(language === "Kor" ? "파일이 다운로드되었습니다.\n감사합니다!" : "The file has been downloaded.\nThank you!");
        setRoboImage("/images/robo/robo4.webp");
      } else {
        if (hovered === "contact") setRoboText(language === "Kor" ? "이메일을 보낼 수 있어요!" : "You can send a mail to me!");
        else if (hovered === "resume") setRoboText(language === "Kor" ? "이력서를 열람할 수 있어요!" : "You can read my resume!");
        else if (hovered === "settings") setRoboText(language === "Kor" ? "설정 메뉴를 열 수 있어요!" : "You can open the settings menu!");
        else setRoboText(language === "Kor" ? "원하는 기능을 선택하세요." : "Choose a button!");
        setRoboImage("/images/robo/robo2.webp");
      }
    }
  }, [open, hovered, pathname, feedbackState, feedbackStatePDF, roboPanicking, language, activeSectionId, idleState]);

  useEffect(() => {
    const imagesToPreload = [
      '/images/robo/robo1.webp',
      '/images/robo/robo2.webp',
      '/images/robo/robo3.webp',
      '/images/robo/robo4.webp',
      '/images/robo/robo5.webp',
      '/images/robo/robo6.webp',
      '/images/robo/robo7.webp',
      '/images/robo/robo8.webp',
      '/images/robo/robo9.webp',
      '/images/robo/robo404.webp',
    ];

    imagesToPreload.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  // ── 홈 페이지 섹션 진입 이벤트 수신 ──────────────────────────────────────────
  useEffect(() => {
    const handleSection = (e: Event) => {
      const { sectionId } = (e as CustomEvent<{ sectionId: string }>).detail;
      setActiveSectionId(sectionId);
    };
    window.addEventListener("robo-section", handleSection);
    return () => window.removeEventListener("robo-section", handleSection);
  }, []);

  // 페이지 이동 시 섹션 상태 초기화 (잔상 방지)
  useEffect(() => {
    setActiveSectionId("");
  }, [pathname]);

  // ── 아이들 타이머 ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // 마우스 이동: 타이머만 리셋 (drowsing은 해제되지만 sleeping은 해제 안 됨)
    const onMouseMove = () => {
      lastActivityRef.current = Date.now();
    };

    // 키보드/터치: sleeping 포함 모든 아이들 상태에서 강제 active 복귀
    const onExplicitActivity = () => {
      lastActivityRef.current = Date.now();
      if (idleStateRef.current === "drowsing" || idleStateRef.current === "sleeping") {
        idleStateRef.current = "active";
        setIdleState("active");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onExplicitActivity);
    window.addEventListener("touchstart", onExplicitActivity);

    const drowseTime = 30_000;
    const sleepTime = 60_000;

    const interval = setInterval(() => {
      const current = idleStateRef.current;
      if (current === "surprised") return;
      // sleeping은 타이머로 자동 복귀하지 않음 — 클릭(surprised) 또는 키/터치만 해제 가능
      if (current === "sleeping") return;

      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= sleepTime) {
        idleStateRef.current = "sleeping";
        setIdleState("sleeping");
      } else if (elapsed >= drowseTime && current !== "drowsing") {
        idleStateRef.current = "drowsing";
        setIdleState("drowsing");
      } else if (elapsed < drowseTime && current !== "active") {
        idleStateRef.current = "active";
        setIdleState("active");
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onExplicitActivity);
      window.removeEventListener("touchstart", onExplicitActivity);
      clearInterval(interval);
    };
  }, []);

  // 메뉴 열릴 때 아이들 타이머 초기화
  useEffect(() => {
    if (open) {
      lastActivityRef.current = Date.now();
      if (idleStateRef.current !== "active") {
        idleStateRef.current = "active";
        setIdleState("active");
      }
    }
  }, [open]);

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

              <motion.div
                animate={
                  idleState === "drowsing"
                    ? { rotate: [-3, 3, -3] }
                    : idleState === "surprised"
                    ? { y: [0, -30, 10, 0], scale: [1, 1.1, 1.05, 1] }
                    : { rotate: 0, y: 0, scale: 1 }
                }
                transition={
                  idleState === "drowsing"
                    ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    : idleState === "surprised"
                    ? { duration: 0.5, ease: "easeOut" }
                    : { duration: 0.3 }
                }
              >
                <NextImage
                  src={roboImage}
                  alt="Robo Button"
                  onClick={handleRoboClick}
                  width={240}
                  height={240}
                  unoptimized
                  loading="eager"
                  className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] z-[200] relative transition cursor-pointer"
                />
              </motion.div>

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
              <NextImage
                src="/images/robo/robo6.webp"
                alt="Robo Reset Button"
                width={240}
                height={240}
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
