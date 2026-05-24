import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Language = 'Kor' | 'Eng';
export type MenuType = 'Robo' | 'Dew';
export type Theme = 'Dark' | 'Light';
export type Animation = 'On' | 'Off';
export type CursorEffect = 'On' | 'Off';

const DEFAULT_SETTINGS = {
  language: 'Kor' as Language,
  menuType: 'Robo' as MenuType,
  theme: 'Dark' as Theme,
  animation: 'On' as Animation,
  cursorEffect: 'Off' as CursorEffect,
};

interface SettingsState {
  language: Language;
  menuType: MenuType;
  theme: Theme;
  animation: Animation;
  cursorEffect: CursorEffect;
  setLanguage: (language: Language) => void;
  setMenuType: (menuType: MenuType) => void;
  setTheme: (theme: Theme) => void;
  setAnimation: (animation: Animation) => void;
  setCursorEffect: (cursorEffect: CursorEffect) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setLanguage: (language) => set({ language }),
      setMenuType: (menuType) => set({ menuType }),
      setTheme: (theme) => set({ theme }),
      setAnimation: (animation) => set({ animation }),
      setCursorEffect: (cursorEffect) => set({ cursorEffect }),
      resetSettings: () => set({ ...DEFAULT_SETTINGS }),
    }),
    {
      name: 'portfolio-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);