"use client";
import { useSettingsStore } from '../store/settingsStore';
import { motion } from 'framer-motion';

const ToggleSwitch = <T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly [T, T];
  value: T;
  onChange: (value: T) => void;
}) => {
  const selectedIndex = options.indexOf(value);

  return (
    <div className="flex items-center justify-between py-4 border-b border-white/8 last:border-b-0">
      <span className="text-slate-200 font-medium">{label}</span>
      <div className="relative flex w-32 items-center rounded-full bg-white/8 p-1">
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white/20 border border-white/15"
          animate={{ x: `${selectedIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`relative z-10 w-1/2 py-1.5 text-sm font-semibold transition-colors duration-300 ${
              value === option ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="cursor-pointer">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Settings({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const {
    language, setLanguage,
    menuType, setMenuType,
    cursorEffect, setCursorEffect,
  } = useSettingsStore();

  return (
    <>
      {/* Slide-in Settings Panel */}
      <div
        className={`fixed bottom-0 right-0 z-[200] w-full max-w-md h-full sm:h-auto sm:max-h-[90vh] sm:bottom-6 sm:right-6 sm:rounded-xl bg-[rgba(6,11,24,0.96)] backdrop-blur-xl border border-white/10 text-white shadow-2xl transition-all duration-300 flex flex-col ${
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "sm:right-[-100%] translate-x-full sm:translate-x-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/8">
          <h2 className="text-xl font-bold text-slate-100">Settings</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 설정 콘텐츠 */}
        <div className="p-6 space-y-2 overflow-y-auto">
          {/* 언어 설정 */}
          <ToggleSwitch
            label={language === "Kor" ? "언어 설정" : "Language"}
            options={["Kor", "Eng"]}
            value={language}
            onChange={setLanguage}
          />

          {/* 메뉴 설정 */}
          <ToggleSwitch
            label={language === "Kor" ? "메뉴 타입" : "Menu Type"}
            options={["Robo", "Dew"]}
            value={menuType}
            onChange={setMenuType}
          />
          
          {/* 테마 설정 */}
          {/* <ToggleSwitch
            label={language == "Kor" ? "테마" : "Theme"}
            options={["Dark", "Light"]}
            value={theme}
            onChange={setTheme}
          /> */}

          {/* 애니메이션 효과 설정 */}
          {/* <ToggleSwitch
            label="애니메이션 효과"
            options={["On", "Off"]}
            value={animation}
            onChange={setAnimation}
          /> */}

          {/* 커스텀 커서 효과 설정 */}
          <ToggleSwitch
            label={language === "Kor" ? "커서 이펙트" : "Cursor Effect"}
            options={["On", "Off"]}
            value={cursorEffect}
            onChange={setCursorEffect}
          />
        </div>
      </div>
    </>
  );
}