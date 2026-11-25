/**
 * My Better Life language state (EN/HI), shared by the head script, the hook and the CSS.
 * No React here, so the root layout (a server component) can import it.
 */

/** localStorage key: "en" | "hi". Missing or anything else means "en". */
export const BL_LANG_KEY = "btb:better-life:lang"

/** Attribute on <html> that better-life.css reads to show one language. */
export const BL_LANG_ATTR = "data-bl-lang"

/** Fired on window after the language changes in this tab. */
export const BL_LANG_EVENT = "bl-lang"

/**
 * Runs in <head> before first paint (next to bootScript, in its own tag and try/catch).
 * Only sets an attribute on <html>; nothing outside .better-life reads it, so it is
 * harmless on every other page. If storage is blocked it falls back to "en".
 */
export const betterLifeLangScript = `(function(){var v;try{v=localStorage.getItem("${BL_LANG_KEY}")}catch(e){}try{document.documentElement.setAttribute("${BL_LANG_ATTR}",v==="hi"?"hi":"en")}catch(e){}})()`
