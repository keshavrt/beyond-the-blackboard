import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

/* DESIGN.md §3: Geist Sans for paragraphs, Geist Mono for the chrome. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beyond the Blackboard: Career Explorer",
    template: "%s · Beyond the Blackboard",
  },
  description:
    "Find out what you could become and how to get there. A career guide for students in Class 8 to 12.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", geistSans.variable, geistMono.variable)}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
