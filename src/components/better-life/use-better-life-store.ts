"use client"

import { useSyncExternalStore } from "react"

import { readStore, subscribeStore, type BetterLifeStore } from "@/lib/better-life-storage"

/** Server and first client render: unknown (null). Same pattern as useBetterLifeLang. */
const serverSnapshot = () => null

/**
 * The My Better Life store, re-rendering on every change (this tab or another).
 * null until hydration: render a neutral state, never a guessed number.
 */
export function useBetterLifeStore(): BetterLifeStore | null {
  return useSyncExternalStore<BetterLifeStore | null>(subscribeStore, readStore, serverSnapshot)
}
