import { homePageCopy as copy } from "@/content/home-page"
import { getHomeStats } from "@/lib/home-stats"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = copy.og.alt
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  const stats = getHomeStats()
  return renderOgImage({
    token: copy.og.token,
    index: "[00]",
    title: copy.hero.title,
    highlight: copy.hero.titleHighlight,
    description: copy.hero.purpose,
    facts: [
      { label: copy.og.facts.careers, value: String(stats.careers) },
      { label: copy.og.facts.streams, value: String(stats.streams) },
      { label: copy.og.facts.for, value: copy.og.facts.forValue },
    ],
  })
}
