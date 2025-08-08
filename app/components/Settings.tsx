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
    <div className="flex items-center justify-between py-4 border-b border-slate-700 last:border-b-0">
      <span className="text-gray-200 font-medium">{label}</span>
      <div className="relative flex w-32 items-center rounded-full bg-slate-700 p-1">
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-cyan-500"
          animate={{ x: `${selectedIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`relative z-10 w-1/2 py-1.5 text-sm font-semibold transition-colors duration-300 ${
              value === option ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {option}
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
    theme, setTheme,
    animation, setAnimation,
    cursorEffect, setCursorEffect,
  } = useSettingsStore();

  return (
    <>
      {/* Slide-in Settings Panel */}
      <div
        className={`fixed bottom-0 right-0 z-[200] w-full max-w-md h-full sm:h-auto sm:max-h-[90vh] sm:bottom-6 sm:right-6 sm:rounded-xl bg-slate-800 text-white shadow-2xl transition-all duration-300 flex flex-col ${
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "sm:right-[-100%] translate-x-full sm:translate-x-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* 설정 콘텐츠 */}
        <div className="p-6 space-y-2 overflow-y-auto">
          {/* 언어 설정 */}
          <ToggleSwitch
            label="언어 설정"
            options={["Kor", "Eng"]}
            value={language}
            onChange={setLanguage}
          />

          {/* 메뉴 설정 */}
          <ToggleSwitch
            label="메인 메뉴 타입"
            options={["Robo", "Dew"]}
            value={menuType}
            onChange={setMenuType}
          />
          
          {/* 테마 설정 */}
          <ToggleSwitch
            label="테마"
            options={["Dark", "Light"]}
            value={theme}
            onChange={setTheme}
          />

          {/* 애니메이션 효과 설정 */}
          <ToggleSwitch
            label="애니메이션 효과"
            options={["On", "Off"]}
            value={animation}
            onChange={setAnimation}
          />

          {/* 커스텀 커서 효과 설정 */}
          <ToggleSwitch
            label="커스텀 커서"
            options={["On", "Off"]}
            value={cursorEffect}
            onChange={setCursorEffect}
          />
        </div>
      </div>
    </>
  );
}