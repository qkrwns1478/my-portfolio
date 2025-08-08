import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  language: 'Kor' | 'Eng';
  menuType: 'Robo' | 'Dew';
  theme: 'Dark' | 'Light';
  animation: 'On' | 'Off';
  cursorEffect: 'On' | 'Off';
  setLanguage: (language: 'Kor' | 'Eng') => void;
  setMenuType: (menuType: 'Robo' | 'Dew') => void;
  setTheme: (theme: 'Dark' | 'Light') => void;
  setAnimation: (animation: 'On' | 'Off') => void;
  setCursorEffect: (cursorEffect: 'On' | 'Off') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'Kor',
      menuType: 'Robo',
      theme: 'Dark',
      animation: 'On',
      cursorEffect: 'On',
      
      setLanguage: (language) => set({ language }),
      setMenuType: (menuType) => set({ menuType }),
      setTheme: (theme) => set({ theme }),
      setAnimation: (animation) => set({ animation }),
      setCursorEffect: (cursorEffect) => set({ cursorEffect }),
    }),
    {
      name: 'portfolio-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);