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
    w-auto px-4 py-2
    border border-cyan-300 text-cyan-300 rounded
    hover:bg-cyan-300 hover:text-black 
    active:bg-cyan-300 active:text-black 
    transition-colors duration-200
    ${className}
  `);

  const button = (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );

  return href ? <Link href={href}>{button}</Link> : button;
}
