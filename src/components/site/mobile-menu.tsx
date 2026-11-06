"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { isCurrent, navItems, pad, siteName } from "./nav"
import { Wordmark } from "./wordmark"

/** Two 2px bars; `open` turns them into an ×. DESIGN.md §5.1. */
function BurgerBars({ open }: { open: boolean }) {
  const bar = "absolute left-1/2 h-0.5 w-5 -translate-x-1/2 bg-current"
  return (
    <span aria-hidden="true" className="relative block size-5">
      <span className={cn(bar, open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[6px]")} />
      <span className={cn(bar, open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-[6px]")} />
    </span>
  )
}

/**
 * Below 820px: full-screen Sage sheet with huge uppercase items, bottom-aligned,
 * each with a mono index in ink. Base UI Dialog gives focus trap, Escape and scroll lock.
 * Opens instantly for now; the clip-path wipe comes with the motion pass.
 */
export function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="-mr-2.5 inline-flex size-11 cursor-pointer items-center justify-center text-fg hover:text-accent active:text-accent-2"
      >
        <BurgerBars open={false} />
      </SheetTrigger>
      <SheetContent
        side="full"
        className="bg-accent text-ink [&_:focus-visible]:outline-ink"
      >
        <div className="flex items-center justify-between border-b border-ink/20 px-gx py-[18px]">
          <SheetTitle render={<p />} className="sr-only">
            Menu
          </SheetTitle>
          <Wordmark tone="ink" onNavigate={() => setOpen(false)} />
          <SheetClose
            aria-label="Close menu"
            className="-mr-2.5 inline-flex size-11 cursor-pointer items-center justify-center text-ink hover:bg-ink/10 active:bg-ink/20"
          >
            <BurgerBars open />
          </SheetClose>
        </div>
        <nav aria-label="Main" className="flex flex-1 flex-col justify-end px-gx pb-12">
          <ul className="border-t border-ink/20">
            {navItems.map((item, i) => {
              const current = isCurrent(pathname, item.href)
              return (
                <li key={item.href} className="border-b border-ink/20">
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-start gap-4 py-4 hover:bg-ink/10 active:bg-ink/20"
                  >
                    <span className="mt-[0.4em] font-mono text-[13px] font-bold tracking-[0.1em]">
                      {pad(i + 1)}
                    </span>
                    <span className="font-mono text-[clamp(44px,14vw,88px)] leading-[0.9] font-extrabold tracking-[-0.05em] uppercase">
                      {item.label}
                      {current ? (
                        <span aria-hidden="true" className="ml-2 text-[0.5em] align-middle">
                          ▮
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="mt-8 font-mono text-xs font-bold tracking-[0.12em] uppercase">
            {siteName} · IIT Roorkee
          </p>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
