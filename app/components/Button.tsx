import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  className?: string;
  loading?: boolean;
}

export default function Button({
  children,
  href,
  className = "",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseClass = twMerge(`
    relative overflow-hidden group
    w-auto px-4 py-2
    border border-white/20 rounded
    transition-all duration-200
    cursor-pointer
    ${loading
      ? "bg-white/15 text-white"
      : "text-slate-200 hover:shadow-[0_0_12px_2px_rgba(200,220,255,0.12)]"
    }
    ${isDisabled ? "bg-white/10 cursor-not-allowed opacity-50" : ""}
    ${className}
  `);

  const backgroundSpan = !loading && (
    <span
      className={`
        absolute inset-0 z-0
        bg-gradient-to-r from-white/10 to-white/5
        transform scale-x-0 origin-left
        transition-transform duration-300 ease-out
        group-hover:scale-x-100
      `}
    />
  );

  const content = loading ? (
    <span className="animate-spin inline-block w-5 h-5 border-[3px] border-white/60 border-t-transparent rounded-full" />
  ) : (
    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
      {children}
    </span>
  );

  const button = (
    <button className={baseClass} disabled={isDisabled} {...props}>
      {backgroundSpan}
      {content}
    </button>
  );

  return href ? <Link href={href}>{button}</Link> : button;
}
