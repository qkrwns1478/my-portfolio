"use client";
import RoboMenu from "./RoboMenu";
import FabMenu from "./FabMenu";
import { useSettingsStore } from "../store/settingsStore";

export default function Menu() {
  const { menuType }= useSettingsStore();
  return (
    <>
      {menuType === 'Robo' ? <RoboMenu /> : <FabMenu />}
    </>
  );
}