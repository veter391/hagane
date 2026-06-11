import type { MetadataRoute } from "next";

const BASE = "https://hagane.shypot.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/works",
    "/way",
    "/works/the-ceramicist",
    "/works/the-wanderer",
    "/works/the-founder",
  ].map((path) => ({ url: `${BASE}${path === "/" ? "" : path}` }));
}
