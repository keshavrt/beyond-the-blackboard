import { betterLifeLabels as L } from "@/content/better-life"
import type { Bilingual } from "@/types/better-life"

import { Bi } from "./bi"
import { SavedField } from "./saved-field"

/** A lesson page textarea (practice / reflection): a SavedField plus the save hint. */
export function LessonNote({
  fieldKey,
  labelledBy,
  placeholder,
}: {
  fieldKey: string
  labelledBy: string
  placeholder: Bilingual
}) {
  return (
    <div>
      <SavedField fieldKey={fieldKey} labelledBy={labelledBy} placeholder={placeholder} multiline />
      <p className="mt-2 type-small text-mute">
        <Bi text={L.saveNote} />
      </p>
    </div>
  )
}
