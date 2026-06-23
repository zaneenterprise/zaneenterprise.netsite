import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://zaneenterprise.net/sitemap.xml",
    host: "https://zaneenterprise.net",
  }
}
