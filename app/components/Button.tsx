import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const baseClass = twMerge(`
    relative overflow-hidden
    group
    w-auto px-4 py-2
    border border-cyan-300 text-cyan-300 rounded
    transition-all duration-200
    hover:shadow-[0_0_10px_2px_rgba(34,211,238,0.75)]
    cursor-pointer
    ${className}
  `);

  const button = (
    <button className={baseClass} {...props}>
      {/* 채워지는 배경 */}
      <span
        className={`
          absolute inset-0 z-0
          bg-gradient-to-r from-cyan-300 to-cyan-400
          transform origin-left scale-x-0
          group-hover:scale-x-100
          transition-transform duration-300 ease-in-out
        `}
      />
      {/* 텍스트 */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </button>
  );

  return href ? <Link href={href}>{button}</Link> : button;
}
