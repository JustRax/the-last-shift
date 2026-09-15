"use client";

import { useRouter } from "next/navigation";

import { ThemeToggle } from "@/components/menu/settings/ThemeToggle";
import { MenuButton } from "@/components/MenuButton";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <main className="main-menu min-h-screen">
      <div className="office-background fixed inset-0" />

      <div className="menu-vignette fixed inset-0" />

      <div className="crt-overlay pointer-events-none fixed inset-0" />

      <div className="scanlines pointer-events-none fixed inset-0" />

      <div className="relative z-10 min-h-screen px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto w-full max-w-2xl">
          {/* Header */}

          <header className="mb-12">
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">
              SYSTEM // SETTINGS
            </p>

            <h1 className="mt-3 font-mono text-3xl uppercase tracking-[0.15em] text-white sm:text-5xl">
              Settings
            </h1>

            <div className="mt-5 h-px w-16 bg-white/20" />
          </header>

          {/* Appearance */}

          <section className="border border-white/10 bg-black/30 p-5 sm:p-8">
            <ThemeToggle />
          </section>

          {/* Back */}

          <div className="mt-8">
            <MenuButton onClick={() => router.push("/")}>
              Back
            </MenuButton>
          </div>
        </div>
      </div>
    </main>
  );
}