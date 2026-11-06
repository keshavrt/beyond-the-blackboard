import type { MetadataRoute } from "next"

import { getAllCareers } from "@/lib/careers"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const careers = getAllCareers()
  // Content changes when facts are re-checked, so the newest check date is the site's date.
  const newest = careers.map((c) => c.lastVerified).sort().at(-1)

  return [
    { url: SITE_URL, lastModified: newest, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/careers`, lastModified: newest, changeFrequency: "monthly", priority: 0.9 },
    ...careers.map((c) => ({
      url: `${SITE_URL}/careers/${c.slug}`,
      lastModified: c.lastVerified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
