"use client";
import { useState } from "react";
import { FiPlus, FiMail, FiFileText, FiSettings } from "react-icons/fi";
import ContactMe from "./ContactMe";
import Resume from "./Resume";

const menuItems = [
  {
    icon: <FiMail size={20} />,
    label: "Contact Me",
    action: "contact",
    offsetY: "-140px",
    delay: "delay-100",
  },
  {
    icon: <FiFileText size={20} />,
    label: "Resume",
    action: "resume",
    offsetY: "-75px",
    delay: "delay-0",
  },
];

export default function FabMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleMenuClick = (action: string) => {
    if (action === "contact") {
      setContactOpen(true);
    } else if (action === "resume") {
      setResumeOpen(true);
    }
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
                  ? `opacity-100 scale-100 pointer-events-auto`
                  : "opacity-0 scale-75 pointer-events-none"
              }`}
              style={{
                transform: `
                  translateY(${isOpen ? item.offsetY : 0}px)
                `,
              }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 right-full mr-4 w-max px-3 py-1.5 
                  bg-gray-800 text-white text-xs rounded-md 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              >
                {item.label}
              </div>
              
              {/* 아이콘 버튼 */}
              <button
                onClick={() => handleMenuClick(item.action)}
                className="w-12 h-12 bg-white text-gray-700 rounded-full shadow-lg 
                  flex items-center justify-center
                  hover:bg-gray-200 transition-all duration-300"
                aria-label={item.label}
              >
                {item.icon}
              </button>
            </div>
          ))}

          {/* 메인 FAB 버튼 */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-14 h-14 z-[200] bg-cyan-500 text-white rounded-full shadow-lg 
              flex items-center justify-center 
              hover:bg-cyan-400 transition-transform duration-300 transform hover:scale-110"
            aria-label="메뉴 열기/닫기"
          >
            <FiPlus
              size={24}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 패널 컴포넌트 */}
      <ContactMe open={contactOpen} setOpen={setContactOpen} />
      <Resume open={resumeOpen} setOpen={setResumeOpen} />
    </>
  );
}