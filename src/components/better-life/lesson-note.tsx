"use client"

import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { betterLifeLabels as L } from "@/content/better-life"
import { setField } from "@/lib/better-life-storage"
import type { Bilingual } from "@/types/better-life"

import { Bi } from "./bi"
import { useBetterLifeLang } from "./use-better-life-lang"
import { useBetterLifeStore } from "./use-better-life-store"

export const NOTE_MAX_LENGTH = 2000

/**
 * A textarea saved to the section store as you type (one localStorage key).
 * Hydration: server and first client render are empty (store unknown), then the saved
 * text fills in. readOnly until then, so early keys can't be overwritten. Typing lives in
 * local state, so a failed write never loses what's on screen.
 * Name: aria-labelledby on the visible bilingual label (the hidden language isn't read).
 */
export function LessonNote({
  fieldKey,
  labelledBy,
  placeholder,
}: {
  fieldKey: string
  labelledBy: string
  placeholder: Bilingual
}) {
  const store = useBetterLifeStore()
  const { t } = useBetterLifeLang()
  const [draft, setDraft] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const value = draft ?? store?.fields[fieldKey] ?? ""

  return (
    <div>
      <Textarea
        aria-labelledby={labelledBy}
        placeholder={t(placeholder)}
        maxLength={NOTE_MAX_LENGTH}
        readOnly={store === null}
        value={value}
        onChange={(e) => {
          const next = e.target.value
          setDraft(next)
          setFailed(!setField(fieldKey, next))
        }}
        // Fixed height (not field-sizing-content): saved text filling in after hydration
        // must not grow the box and shift the page. Students can still drag it taller.
        className="h-40 min-h-32 field-sizing-fixed resize-y"
      />
      <p className="mt-2 type-small text-mute">
        <Bi text={L.saveNote} />
      </p>
      {/* Announced only when saving fails, never on each keystroke. */}
      <p role="status" aria-live="polite" className="type-small text-danger">
        {failed ? <Bi text={L.saveFailed} /> : null}
      </p>
    </div>
  )
}
