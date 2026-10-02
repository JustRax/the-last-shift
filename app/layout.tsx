import type { Metadata } from "next";

import { ThemeProvider } from "@/components/ui/ThemeProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "The Last Shift",
  description: "A psychological mystery horror game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}