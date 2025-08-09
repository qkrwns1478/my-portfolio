"use client";
import RoboMenu from "./RoboMenu";
import DewMenu from "./DewMenu";
import { useSettingsStore } from "../store/settingsStore";

export default function MenuSelector() {
  const { menuType }= useSettingsStore();
  return (
    <>
      {menuType === 'Robo' ? <RoboMenu /> : <DewMenu />}
    </>
  );
}