import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://solai.gamandeep.xyz";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/term-condition`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
