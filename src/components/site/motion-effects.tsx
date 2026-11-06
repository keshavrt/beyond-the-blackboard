"use client"

import * as React from "react"

const REDUCED = "(prefers-reduced-motion: reduce)"
/** Stagger for siblings that enter together (DESIGN.md §7: 60ms), capped. */
const STAGGER_MS = 60
const MAX_STAGGER = 4

const HIDDEN: Keyframe = { opacity: 0, transform: "translateY(40px)" }
const SHOWN: Keyframe = { opacity: 1, transform: "none" }

/**
 * Scroll reveals for [data-reveal] (section headers, cards). DESIGN.md §7:
 * opacity 0 to 1, translateY(40px) to 0, 0.6s --ease, 60ms sibling stagger, once.
 *
 * - Elements on screen when this first runs are left alone: no flash, no LCP
 *   delay, and the page is fully visible without JS or with reduced motion.
 * - Off-screen ones are held hidden and revealed when they scroll in.
 * - Nodes added later (route changes, filtered lists) are picked up too; if they
 *   land on screen they animate in straight away.
 *
 * Driven by the Web Animations API on the element itself, never by attributes
 * or classes: parts of the page (Suspense boundaries) can still be hydrating when
 * this runs, and changing their attributes would be a hydration mismatch.
 */
function useReveals() {
  React.useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return
    const ease = getComputedStyle(document.documentElement).getPropertyValue("--ease").trim() || "ease-out"
    const seen = new WeakSet<Element>()
    const holds = new WeakMap<Element, Animation>()

    const reveal = (el: Element, delay: number) => {
      holds.get(el)?.cancel()
      holds.delete(el)
      el.animate([HIDDEN, SHOWN], { duration: 600, delay, easing: ease, fill: "backwards" })
    }

    const io = new IntersectionObserver(
      (entries) => {
        let n = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.unobserve(entry.target)
          reveal(entry.target, Math.min(n++, MAX_STAGGER) * STAGGER_MS)
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    )

    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight && r.bottom > 0
    }
    const hold = (el: Element) => {
      holds.set(el, el.animate([HIDDEN], { duration: 1, fill: "forwards" }))
      io.observe(el)
    }
    const track = (el: Element, initial: boolean) => {
      if (seen.has(el)) return
      seen.add(el)
      if (!onScreen(el)) hold(el)
      else if (!initial) reveal(el, 0)
    }
    const scan = (node: Element, initial: boolean) => {
      if (node.matches("[data-reveal]")) track(node, initial)
      node.querySelectorAll("[data-reveal]").forEach((el) => track(el, initial))
    }

    scan(document.body, true)
    const mo = new MutationObserver((records) => {
      for (const rec of records) rec.addedNodes.forEach((n) => n instanceof Element && scan(n, false))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

/**
 * Lenis smooth scroll (DESIGN.md §7), loaded on demand. Off under reduced motion.
 * Touch keeps native scrolling (Lenis default, syncTouch: false).
 * Dialogs and the loader opt out with data-lenis-prevent / the prevent check.
 */
function useSmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return
    let cancelled = false
    let destroy: (() => void) | undefined
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return
      const lenis = new Lenis({
        autoRaf: true,
        prevent: (node) => node.closest?.('[role="dialog"]') != null,
      })
      destroy = () => lenis.destroy()
    })
    return () => {
      cancelled = true
      destroy?.()
    }
  }, [])
}

export function MotionEffects() {
  useReveals()
  useSmoothScroll()
  return null
}
