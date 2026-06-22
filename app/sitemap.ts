import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"
import { siteConfig } from "@/site.config"

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `https://${siteConfig.domain}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }))
}
