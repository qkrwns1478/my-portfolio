"use client";
import { useState } from "react";

export default function ContactMe() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-black px-4 py-2 rounded-full shadow-lg hover:bg-cyan-400 transition"
      >
        Contact Me
      </button>

      {/* Slide-in Panel */}
      <div
          className={`fixed bottom-0 right-0 w-full max-w-md h-full sm:h-auto sm:bottom-6 sm:right-6 sm:rounded-xl bg-slate-800 text-white p-6 shadow-2xl z-50 transition-all duration-300
            ${open ? "translate-x-0 opacity-100" : "translate-x-full sm:translate-x-0 sm:right-[-100%] opacity-0 pointer-events-none"}
          `}
        >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contact Me</h2>
          <button onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input name="name" required placeholder="이름" className="w-full p-2 rounded bg-slate-700" />
          <input name="email" required type="email" placeholder="이메일" className="w-full p-2 rounded bg-slate-700" />
          <textarea name="message" required placeholder="메시지" className="w-full p-2 h-28 rounded bg-slate-700" />
          <button type="submit" className="w-full bg-cyan-400 text-black py-2 rounded hover:bg-cyan-300 transition">
            보내기
          </button>
        </form>
      </div>
    </>
  );
}
