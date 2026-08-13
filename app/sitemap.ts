import type { MetadataRoute } from "next";
import { locations } from "./locations/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bhoomigo.co";

export default function sitemap(): MetadataRoute.Sitemap {
  // W3C datetime without milliseconds for maximum validator compatibility
  const lastMod = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  return [
    {
      url: SITE_URL,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...locations.map((location) => ({
      url: `${SITE_URL}/${location.slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
