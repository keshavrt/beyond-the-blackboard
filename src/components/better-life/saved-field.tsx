"use client"

import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { betterLifeLabels as L } from "@/content/better-life"
import { setField, subscribeCleared } from "@/lib/better-life-storage"
import type { Bilingual } from "@/types/better-life"

import { Bi } from "./bi"
import { useBetterLifeLang } from "./use-better-life-lang"
import { useBetterLifeStore } from "./use-better-life-store"

export const TEXT_MAX_LENGTH = 2000
export const LINE_MAX_LENGTH = 200

/**
 * One field saved to the section store as you type (lesson notes and notebook pages).
 * - Hydration: server and first client render are empty (store unknown), then the saved
 *   text fills in. readOnly until then, so early keys can't be overwritten.
 * - Typing lives in a local draft, so a failed write never loses what's on screen.
 * - After clearAll() (this tab or another), the draft is dropped: no old text stays.
 * - Fixed height (no field-sizing-content): filling in after hydration never shifts layout.
 * - Name from the visible bilingual label (aria-labelledby); the hidden language isn't read.
 * - A polite live region speaks only when saving fails, never on each keystroke.
 */
export function SavedField({
  fieldKey,
  labelledBy,
  describedBy,
  placeholder,
  multiline,
}: {
  fieldKey: string
  labelledBy: string
  describedBy?: string
  placeholder: Bilingual
  multiline: boolean
}) {
  const store = useBetterLifeStore()
  const { t } = useBetterLifeLang()
  const [draft, setDraft] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(
    () =>
      subscribeCleared(() => {
        setDraft(null)
        setFailed(false)
      }),
    []
  )

  const common = {
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
    placeholder: t(placeholder),
    readOnly: store === null,
    value: draft ?? store?.fields[fieldKey] ?? "",
  }
  const save = (next: string) => {
    setDraft(next)
    setFailed(!setField(fieldKey, next))
  }

  return (
    <>
      {multiline ? (
        <Textarea
          {...common}
          maxLength={TEXT_MAX_LENGTH}
          onChange={(e) => save(e.target.value)}
          className="h-40 min-h-32 field-sizing-fixed resize-y"
        />
      ) : (
        <Input {...common} maxLength={LINE_MAX_LENGTH} onChange={(e) => save(e.target.value)} />
      )}
      <p role="status" aria-live="polite" className="type-small text-danger">
        {failed ? <Bi text={L.saveFailed} /> : null}
      </p>
    </>
  )
}
