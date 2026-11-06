"use client"

import * as React from "react"

/** Ignore jitter below this many px per frame. */
const DELTA = 6

/**
 * DESIGN.md §5.1: hides on scroll down, returns on scroll up.
 * Writes data-hidden straight to the DOM (no re-render); CSS does the motion.
 * It also returns whenever it holds keyboard focus (.site-header:focus-within).
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let last = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = Math.max(0, window.scrollY)
      const d = y - last
      let next: string
      if (y <= el.offsetHeight) next = "false"
      else if (Math.abs(d) >= DELTA) next = d > 0 ? "true" : "false"
      else return
      last = y
      // Only touch the DOM when the state flips.
      if (el.dataset.hidden !== next) el.dataset.hidden = next
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header ref={ref} data-hidden="false" className="site-header sticky top-0 z-40 border-b border-line bg-bg">
      {children}
    </header>
  )
}
