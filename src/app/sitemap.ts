import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://davezpizza.fr";
  return [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${base}/menu`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.8 },
    { url: `${base}/gallery`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];
}
