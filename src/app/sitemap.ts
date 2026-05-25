import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["", "/features", "/pricing", "/templates", "/jobs", "/contact", "/login", "/register"];
    return routes.map((r) => ({ url: `${SITE.url}${r}`, changeFrequency: "weekly", priority: r === "" ? 1 : 0.7 }));
}
