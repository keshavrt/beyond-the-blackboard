import type { Career } from "@/types/career"

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

/** ₹1,00,000 (Indian digit grouping). */
export function formatINR(n: number): string {
  return inr.format(n)
}

/** Short form for tight spaces: 50000 → "50k", 56100 → "56k", 100000 → "1L", 150000 → "1.5L". */
function compact(n: number): string {
  if (n >= 100000) return `${+(n / 100000).toFixed(1)}L`
  return `${Math.round(n / 1000)}k`
}

/** "₹50k to 1L" (ranges use "to", DESIGN.md §8). */
export function formatINRRangeShort(min: number, max: number): string {
  return min === max ? `₹${compact(min)}` : `₹${compact(min)} to ${compact(max)}`
}

/** "5.5 years" or "2 to 3 years". Written out: students should not decode "yrs". */
export function formatYears({ min, max }: Career["durationYears"]): string {
  return min === max ? `${min} years` : `${min} to ${max} years`
}

/**
 * Duration is counted from Class 10 when Class 12 is optional on the path
 * (ITI / diploma routes), otherwise from Class 12.
 */
export function durationCountedFrom(career: Pick<Career, "path">): "10th" | "12th" {
  return career.path.after12th.optional ? "10th" : "12th"
}

/** "2026-11-06" → "6 Nov 2026". Parsed as UTC so the day never shifts. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`))
}

/** "https://www.nmc.org.in/x" → "nmc.org.in". */
export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}
