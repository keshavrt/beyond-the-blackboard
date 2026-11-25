"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { useBetterLifeLang } from "./use-better-life-lang"

/**
 * The .better-life wrapper: scopes the font tokens, the [data-bl] switch and the
 * Hindi type rules (better-life.css). Its `lang` follows the toggle after hydration;
 * before that it says "en", which changes nothing visible because every Hindi span
 * carries its own lang="hi".
 */
export function BetterLifeScope({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { lang } = useBetterLifeLang()
  return (
    <div lang={lang ?? "en"} className={cn("better-life flex flex-1 flex-col", className)}>
      {children}
    </div>
  )
}
