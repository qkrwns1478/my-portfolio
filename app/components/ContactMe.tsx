"use client";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettingsStore } from '../store/settingsStore';

export default function ContactMe({open, setOpen, onSuccess}: {open: boolean; setOpen: (val: boolean) => void; onSuccess?: () => void;}) {
  const { language } = useSettingsStore();
  const [loading, setLoading] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const schema = z.object({
    name: z
      .string()
      .min(2, language === "Kor" ? "이름은 2자 이상이어야 합니다." : "Name must be at least 2 characters.")
      .max(50, language === "Kor" ? "이름은 50자 이내여야 합니다." : "Name must be at most 50 characters.")
      .regex(/^[^<>]*$/, language === "Kor" ? "이름에 HTML 태그를 포함할 수 없습니다." : "Name cannot contain HTML tag."),
    email: z.string().email(language === "Kor" ? "유효한 이메일을 입력해주세요." : "Please enter a valid address."),
    message: z
      .string()
      .min(10, language === "Kor" ? "메시지는 최소 10자 이상이어야 합니다." : "Message must be at least 10 characters.")
      .max(1000, language === "Kor" ? "메시지는 1000자 이내여야 합니다." : "Message must be at most 1000 characters.")
      .refine((msg) => !/script|<|>|\bhttp/i.test(msg), {
        message: language === "Kor" ? "의심스러운 콘텐츠가 포함되어 있습니다." : "Suspicious content detected",
      }),
  });

  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    if (!token) {
      toast.error(language === "Kor" ? "reCAPTCHA 인증에 실패했습니다." : "reCAPTCHA authentication failed");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });
  
      if (!res.ok) throw new Error();
  
      toast.success(language === "Kor" ? "메일이 전송되었습니다!" : "Mail has been sent successfully.");
      reset();
      setOpen(false);
      onSuccess?.();
    } catch {
      toast.error(language === "Kor" ? "메일 전송에 실패했습니다." : "Failed to send mail.");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-xl font-bold">Contact Me</h2>
          <button onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white">✕</button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input {...register("name")} required placeholder={language === "Kor" ? "이름" : "Name"} className="w-full p-2 rounded bg-slate-700" />
            {errors.name && <p className="text-xs">{errors.name.message}</p>}
          </div>
          <div>
            <input {...register("email")} required type="email" placeholder={language === "Kor" ? "이메일" : "Email"} className="w-full p-2 rounded bg-slate-700" />
            {errors.email && <p className="text-xs">{errors.email.message}</p>}
          </div>
          <div>
            <textarea {...register("message")} required placeholder={language === "Kor" ? "메시지" : "Message"} className="w-full p-2 h-28 rounded bg-slate-700 resize-none" />
            {errors.message && <p className="text-xs">{errors.message.message}</p>}
          </div>
          <Button type="submit" loading={loading} className="w-full">{language === "Kor" ? "보내기" : "Send"}</Button>
          <ReCAPTCHA
            sitekey={siteKey}
            size="invisible"
            ref={recaptchaRef}
          />
        </form>
        <p className="text-xs text-gray-400">
          This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" className="underline">Terms of Service</a> apply.
        </p>
      </div>
    </>
  );
}
