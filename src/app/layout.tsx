import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { BootLoader, bootScript } from "@/components/site/boot-loader";
import { MotionEffects } from "@/components/site/motion-effects";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Beyond the Blackboard: Career Explorer",
    template: "%s · Beyond the Blackboard",
  },
  description:
    "Find out what you could become and how to get there. A career guide for students in Class 8 to 12.",
  // Share images come from the opengraph-image files; show them large on X too.
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", geistSans.variable, geistMono.variable)}
      // The boot script sets data-boot on <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <BootLoader />
        <a
          href="#main"
          className="sr-only type-label focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <MotionEffects />
      </body>
    </html>
  );
}
