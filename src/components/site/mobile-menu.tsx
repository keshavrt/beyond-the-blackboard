"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { isCurrent, navItems, pad, siteName } from "./nav"
import { Wordmark } from "./wordmark"

/**
 * Two 2px bars that morph into an × (DESIGN.md §5.1). Transform only: both bars
 * sit on the centre line, 3px apart when closed, rotated when open.
 * The × inside the sheet starts as bars and morphs as the sheet wipes in and out.
 */
function BurgerBars({ open }: { open: boolean }) {
  const bar =
    "absolute top-1/2 left-1/2 -mt-px h-0.5 w-5 -translate-x-1/2 bg-current transition-[translate,rotate] duration-(--dur) ease-out-expo"
  return (
    <span aria-hidden="true" className="relative block size-5">
      <span
        className={cn(
          bar,
          open
            ? "rotate-45 delay-150 group-data-starting-style/sheet:-translate-y-[3px] group-data-starting-style/sheet:rotate-0 group-data-ending-style/sheet:-translate-y-[3px] group-data-ending-style/sheet:rotate-0 group-data-ending-style/sheet:delay-0"
            : "-translate-y-[3px]"
        )}
      />
      <span
        className={cn(
          bar,
          open
            ? "-rotate-45 delay-150 group-data-starting-style/sheet:translate-y-[3px] group-data-starting-style/sheet:rotate-0 group-data-ending-style/sheet:translate-y-[3px] group-data-ending-style/sheet:rotate-0 group-data-ending-style/sheet:delay-0"
            : "translate-y-[3px]"
        )}
      />
    </span>
  )
}

/**
 * Below 820px: full-screen Sage sheet with huge uppercase items, bottom-aligned,
 * each with a mono index in ink. Base UI Dialog gives focus trap, Escape and scroll lock.
 * The sheet wipes in and out (see SheetContent side="full").
 */
export function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="-mr-2.5 inline-flex size-11 cursor-pointer items-center justify-center text-fg transition-colors duration-(--dur-fast) hover:text-accent active:text-accent-2"
      >
        <BurgerBars open={false} />
      </SheetTrigger>
      <SheetContent
        side="full"
        className="bg-accent text-ink [&_*]:outline-ink"
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
                    <span className="mt-[0.5em] type-code text-[13px]">
                      {pad(i + 1)}
                    </span>
                    <span className="text-[clamp(44px,14vw,88px)] leading-[0.95] font-bold tracking-[-0.05em]">
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
          <p className="mt-8 type-label">
            {siteName} · IIT Roorkee
          </p>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
