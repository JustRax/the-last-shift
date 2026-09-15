"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  danger?: boolean;
}

export function MenuButton({
  children,
  danger = false,
  className = "",
  ...props
}: MenuButtonProps) {
  return (
    <button
      type="button"
      className={[
        "group relative w-full overflow-hidden",
        "border border-white/10",
        "bg-black/40",
        "px-6 py-4",
        "text-left",
        "font-mono text-sm uppercase tracking-[0.28em]",
        "text-white/70",
        "transition-all duration-200",
        "hover:border-white/30",
        "hover:bg-white/[0.06]",
        "hover:text-white",
        "focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-white/50",
        "active:scale-[0.99]",
        danger ? "menu-button-danger" : "",
        className,
      ].join(" ")}
      {...props}
    >
      <span
        className="
          absolute inset-y-0 left-0 w-0
          bg-white/[0.04]
          transition-all duration-200
          group-hover:w-full
        "
      />

      <span className="relative flex items-center gap-3">
        <span
          className="
            text-white/20
            transition-colors
            group-hover:text-white/70
          "
        >
          &gt;
        </span>

        {children}
      </span>
    </button>
  );
}