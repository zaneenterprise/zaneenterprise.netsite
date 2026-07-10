import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  if (process.env.DEPLOYMENT_ENV === "test") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://zaneenterprise.net/sitemap.xml",
    host: "https://zaneenterprise.net",
  }
}
