"use client";
import Button from "./Button";
import { useSettingsStore } from '../store/settingsStore';

export default function Resume({ open, setOpen, onSuccess, }: { open: boolean, setOpen: (val: boolean) => void, onSuccess?: () => void; }) {
  const { language } = useSettingsStore();

  return (
    <>
      {/* Slide-in Panel */}
      <div
        className={`fixed bottom-0 right-0 z-[200] w-full max-w-md h-full sm:h-auto sm:bottom-6 sm:right-6 sm:rounded-xl bg-slate-800 text-white p-6 shadow-2xl transition-all duration-300 ${
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "sm:right-[-100%] translate-x-full sm:translate-x-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Resume</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-gray-500 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="w-full h-[70vh] border rounded overflow-hidden">
          <iframe
            src="/resume.pdf"
            title="Resume PDF"
            className="w-full h-full"
          />
        </div>

        <a
          href="/resume.pdf"
          download
          className="mt-4 inline-block text-center w-full"
        >
          <Button
            className="w-full"
            onClick={() => {
              setOpen(false);
              onSuccess?.();
            }}>
            {language === "Kor" ? "PDF 다운로드" : "PDF Download"}
          </Button>
        </a>
      </div>
    </>
  );
}
