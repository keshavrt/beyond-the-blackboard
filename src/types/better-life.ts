/**
 * Types for the "My Better Life" section (/my-better-life).
 *
 * This section has its own EN/HI toggle, so its text is always bilingual.
 * It does NOT use `LocalizedText` from ./career: the rest of the site stays English.
 */

/** One piece of text in both languages. */
export type Bilingual = { en: string; hi: string }

export type Lang = keyof Bilingual

/** Lesson URL slugs (English, kebab-case, from the English title). */
export type BetterLifeSlug =
  | "choose-what-you-learn"
  | "give-your-attention"
  | "turn-understanding-into-habit"
  | "let-feedback-shape-you"
  | "recognise-your-strengths"
  | "work-on-what-holds-you-back"
  | "give-today-a-direction"

/** Notebook pages: 0 is the cover, 1 to 7 are the workshop pages. */
export type NotebookPageNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface Lesson {
  slug: BetterLifeSlug
  title: Bilingual
  subtitle: Bilingual
  /** The question the lesson asks the student. */
  question: Bilingual
  intro: Bilingual
  /** Key points, shown as a list. */
  points: Bilingual[]
  /** An everyday example. */
  example: Bilingual
  /**
   * A line from the workshop. `hi` is the Hindi original, `en` its English translation.
   * Rendering rule: the Hindi original always shows; in English mode the translation
   * shows under it.
   */
  quote: Bilingual
  /** A small action to try today. */
  practice: Bilingual
  /** A reflection question to carry with you. */
  prompt: Bilingual
  /** The notebook page this lesson links to. */
  notePage: Exclude<NotebookPageNumber, 0>
}

export interface NotebookField {
  /** Storage key for this field (kept from the prototype). */
  key: string
  label: Bilingual
  hint?: Bilingual
  /** true: a textarea; false: a one-line input. */
  multiline: boolean
}

/**
 * What to write with, as the workshop teaches: virtues in pen (to keep),
 * shortcomings in pencil (so they can be erased), the goal in pencil first, then pen.
 */
export type NotebookInstrument = "pen" | "pencil" | "pencil-then-pen"

export interface NotebookPage {
  page: NotebookPageNumber
  title: Bilingual
  description: Bilingual
  instrument: { kind: NotebookInstrument; label: Bilingual }
  fields: NotebookField[]
}

/** Page metadata. Static, so English only (the rest of the site's language). */
export interface PageMeta {
  title: string
  description: string
}
