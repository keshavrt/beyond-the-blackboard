import type { BetterLifeSlug } from "@/types/better-life"

/**
 * The My Better Life store: ONE localStorage key for the whole section (one student),
 * so nothing clashes with the careers page's sessionStorage. No React here; the hook
 * lives in src/components/better-life/use-better-life-store.ts.
 * Progress is stored by lesson slug, never by index.
 */

export const BL_STORE_KEY = "btb:better-life:v1"

/** Fired on window after this tab writes the store. Other tabs get the "storage" event. */
export const BL_STORE_EVENT = "bl-store"

/** Fired on window after clearAll() in this tab, so open fields drop their local drafts. */
export const BL_STORE_CLEARED_EVENT = "bl-store-cleared"

export interface BetterLifeStore {
  version: 1
  explored: BetterLifeSlug[]
  /** Notebook and lesson fields, by field key. */
  fields: Record<string, string>
}

export const EMPTY_STORE: BetterLifeStore = Object.freeze({
  version: 1,
  explored: Object.freeze([]) as unknown as BetterLifeSlug[],
  fields: Object.freeze({}) as Record<string, string>,
}) as BetterLifeStore

/* Slug list without importing the lesson text (keeps this client module small).
   Record<BetterLifeSlug, true>: the compiler errors if a slug is added to the type but not here. */
const SLUGS: Record<BetterLifeSlug, true> = {
  "choose-what-you-learn": true,
  "give-your-attention": true,
  "turn-understanding-into-habit": true,
  "let-feedback-shape-you": true,
  "recognise-your-strengths": true,
  "work-on-what-holds-you-back": true,
  "give-today-a-direction": true,
}
const KNOWN_SLUGS = new Set<string>(Object.keys(SLUGS))

/** Keeps only what we recognise. Anything malformed becomes empty, never a crash. */
function sanitize(value: unknown): BetterLifeStore {
  if (!value || typeof value !== "object") return EMPTY_STORE
  const v = value as Record<string, unknown>
  if (v.version !== 1) return EMPTY_STORE
  const explored = Array.isArray(v.explored)
    ? [...new Set(v.explored.filter((s): s is BetterLifeSlug => typeof s === "string" && KNOWN_SLUGS.has(s)))]
    : []
  const fields: Record<string, string> = {}
  if (v.fields && typeof v.fields === "object" && !Array.isArray(v.fields)) {
    for (const [k, val] of Object.entries(v.fields)) if (typeof val === "string") fields[k] = val
  }
  return { version: 1, explored, fields }
}

/* Cache by raw string: useSyncExternalStore needs the SAME object while nothing changed. */
let cacheRaw: string | null | undefined
let cacheStore: BetterLifeStore = EMPTY_STORE

/** Safe read: missing, bad JSON, wrong version or blocked storage all return the empty store. */
export function readStore(): BetterLifeStore {
  let raw: string | null
  try {
    raw = window.localStorage.getItem(BL_STORE_KEY)
  } catch {
    return EMPTY_STORE
  }
  if (raw === cacheRaw) return cacheStore
  cacheRaw = raw
  try {
    cacheStore = raw ? sanitize(JSON.parse(raw)) : EMPTY_STORE
  } catch {
    cacheStore = EMPTY_STORE
  }
  return cacheStore
}

/** Returns false if storage is full or blocked (callers can show `saveFailed`). */
function write(next: BetterLifeStore): boolean {
  try {
    window.localStorage.setItem(BL_STORE_KEY, JSON.stringify(next))
    return true
  } catch {
    return false
  } finally {
    window.dispatchEvent(new Event(BL_STORE_EVENT))
  }
}

export function isExplored(slug: BetterLifeSlug): boolean {
  return readStore().explored.includes(slug)
}

export function toggleExplored(slug: BetterLifeSlug): boolean {
  const s = readStore()
  const explored = s.explored.includes(slug)
    ? s.explored.filter((x) => x !== slug)
    : [...s.explored, slug]
  return write({ ...s, explored })
}

export function getField(key: string): string {
  return readStore().fields[key] ?? ""
}

export function setField(key: string, value: string): boolean {
  const s = readStore()
  return write({ ...s, fields: { ...s.fields, [key]: value } })
}

/** Clears notebook, reflections and progress. The language choice is a separate key and stays. */
export function clearAll(): boolean {
  try {
    window.localStorage.removeItem(BL_STORE_KEY)
    return true
  } catch {
    return false
  } finally {
    window.dispatchEvent(new Event(BL_STORE_EVENT))
    window.dispatchEvent(new Event(BL_STORE_CLEARED_EVENT))
  }
}

/**
 * Calls `onCleared` when the store is cleared: by clearAll() in this tab, or in another
 * tab (storage event with our key removed, or localStorage.clear()).
 * Fields use it to drop local drafts so no old text stays on screen.
 */
export function subscribeCleared(onCleared: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || (e.key === BL_STORE_KEY && e.newValue === null)) onCleared()
  }
  window.addEventListener(BL_STORE_CLEARED_EVENT, onCleared)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(BL_STORE_CLEARED_EVENT, onCleared)
    window.removeEventListener("storage", onStorage)
  }
}

/** For useSyncExternalStore: this tab's writes and other tabs' changes. */
export function subscribeStore(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === BL_STORE_KEY || e.key === null) onChange()
  }
  window.addEventListener(BL_STORE_EVENT, onChange)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(BL_STORE_EVENT, onChange)
    window.removeEventListener("storage", onStorage)
  }
}
