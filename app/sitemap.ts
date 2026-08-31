import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://solai.website";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/sdk`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/doc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/doc/sdk`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/doc/wallet`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
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
