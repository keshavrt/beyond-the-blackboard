"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { betterLifeLabels as L } from "@/content/better-life"
import { BL_STORE_EVENT, clearAll } from "@/lib/better-life-storage"

import { Bi } from "./bi"
import { useBetterLifeLang } from "./use-better-life-lang"

/**
 * "Clear my saved work". Confirms in the current language, then clearAll():
 * notebook fields, lesson notes and explored progress (the language choice stays).
 * Every open SavedField drops its draft (subscribeCleared), so nothing old stays on screen.
 * The result is announced once, politely; the message clears on the next edit.
 */
export function ResetNotebook() {
  const { t } = useBetterLifeLang()
  const [status, setStatus] = useState<"idle" | "cleared" | "failed">("idle")

  useEffect(() => {
    if (status === "idle") return
    // Any later write (typing again) clears the message.
    const onWrite = () => setStatus("idle")
    const id = window.setTimeout(() => window.addEventListener(BL_STORE_EVENT, onWrite), 0)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener(BL_STORE_EVENT, onWrite)
    }
  }, [status])

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <Button
        variant="ghost"
        onClick={() => {
          // Clicks only run after hydration, when the language is known; English as a fallback.
          if (!window.confirm(t(L.confirmReset) || L.confirmReset.en)) return
          setStatus(clearAll() ? "cleared" : "failed")
        }}
      >
        <Bi text={L.reset} />
      </Button>
      <p role="status" aria-live="polite" className="type-small text-mute">
        {status === "cleared" ? <Bi text={L.cleared} /> : null}
        {status === "failed" ? (
          <span className="text-danger">
            <Bi text={L.saveFailed} />
          </span>
        ) : null}
      </p>
    </div>
  )
}
