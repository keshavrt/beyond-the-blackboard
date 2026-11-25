"use client"

import { useCallback, useSyncExternalStore } from "react"

import type { Bilingual, Lang } from "@/types/better-life"

import { BL_LANG_ATTR, BL_LANG_EVENT, BL_LANG_KEY } from "./lang-script"

function read(): Lang {
  return document.documentElement.getAttribute(BL_LANG_ATTR) === "hi" ? "hi" : "en"
}

function subscribe(onChange: () => void) {
  // Another tab changed the language: mirror it onto this page's <html> first.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== BL_LANG_KEY) return
    document.documentElement.setAttribute(BL_LANG_ATTR, e.newValue === "hi" ? "hi" : "en")
    onChange()
  }
  window.addEventListener(BL_LANG_EVENT, onChange)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(BL_LANG_EVENT, onChange)
    window.removeEventListener("storage", onStorage)
  }
}

/** Server and first client render: unknown. Avoids a hydration mismatch and an English flash. */
const serverSnapshot = () => null

/** Switch the section language: <html> attribute, localStorage, then notify subscribers. No reload. */
export function setBetterLifeLang(lang: Lang) {
  document.documentElement.setAttribute(BL_LANG_ATTR, lang)
  try {
    localStorage.setItem(BL_LANG_KEY, lang)
  } catch {
    // Storage blocked (private mode): the switch still works for this page view.
  }
  window.dispatchEvent(new Event(BL_LANG_EVENT))
}

/**
 * For text CSS can't switch: placeholder, aria-label, alt, confirm(), aria-live.
 * `lang` is null until hydration; `t()` returns "" until then.
 * Visible text should use <Bi> instead (CSS-switched, correct before JS runs).
 */
export function useBetterLifeLang() {
  const lang = useSyncExternalStore<Lang | null>(subscribe, read, serverSnapshot)
  const t = useCallback((text: Bilingual) => (lang ? text[lang] : ""), [lang])
  return { lang, t, setLang: setBetterLifeLang }
}
