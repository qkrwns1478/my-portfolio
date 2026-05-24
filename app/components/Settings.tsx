"use client";
import { useState } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiCheck } from 'react-icons/fi';

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
    resetSettings,
  } = useSettingsStore();

  const [isResetting, setIsResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleReset = async () => {
    if (isResetting) return;
    setIsResetting(true);

    // 1. Zustand 스토어 상태를 기본값으로 초기화 (localStorage도 자동 업데이트)
    resetSettings();

    // 2. Service Worker 캐시 전체 삭제
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
      } catch (e) {
        console.warn('[Settings] Cache clear failed:', e);
      }
    }

    // 3. 완료 표시 후 페이지 새로고침 — 이미지 포함 모든 캐시를 확실하게 갱신
    setIsResetting(false);
    setResetDone(true);
    setTimeout(() => window.location.reload(), 1200);
  };

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
        <div className="p-6 space-y-2 overflow-y-auto flex-1">
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

        {/* 전체 초기화 버튼 */}
        <div className="p-6 border-t border-white/8">
          <button
            onClick={handleReset}
            disabled={isResetting}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
              resetDone
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40"
            }`}
          >
            {isResetting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                style={{ display: "flex" }}
              >
                <FiRefreshCw size={14} />
              </motion.span>
            ) : resetDone ? (
              <FiCheck size={14} />
            ) : (
              <FiRefreshCw size={14} />
            )}
            {isResetting
              ? (language === "Kor" ? "초기화 중..." : "Resetting...")
              : resetDone
              ? (language === "Kor" ? "초기화 완료!" : "Reset Complete!")
              : (language === "Kor" ? "전체 초기화" : "Reset All")}
          </button>
          <p className="text-xs text-slate-500 text-center mt-2">
            {language === "Kor"
              ? "설정값/캐시/이미지를 초기 상태로 되돌립니다"
              : "Restore settings, clear cache & reload images"}
          </p>
        </div>
      </div>
    </>
  );
}