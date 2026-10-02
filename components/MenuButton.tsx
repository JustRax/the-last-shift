"use client";

import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface MenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
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
        "border",
        "px-6 py-4",
        "text-left",
        "font-mono text-sm uppercase tracking-[0.28em]",
        "transition-all duration-200",
        "focus:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--ui-border-strong)]",
        "active:scale-[0.99]",

        "border-[var(--ui-border)]",
        "bg-[var(--ui-panel)]",
        "text-[var(--ui-text-muted)]",

        "hover:border-[var(--ui-border-strong)]",
        "hover:bg-[var(--ui-panel-hover)]",
        "hover:text-[var(--ui-text)]",

        danger ? "menu-button-danger" : "",

        className,
      ].join(" ")}
      {...props}
    >
      <span
        aria-hidden="true"
        className="
          absolute inset-y-0 left-0 w-0
          bg-[var(--ui-accent-soft)]
          transition-all duration-200
          group-hover:w-full
        "
      />

      <span className="relative flex items-center gap-3">
        <span
          aria-hidden="true"
          className="
            text-[var(--ui-text-faint)]
            transition-colors
            group-hover:text-[var(--ui-text-muted)]
          "
        >
          &gt;
        </span>

        <span>{children}</span>
      </span>
    </button>
  );
}