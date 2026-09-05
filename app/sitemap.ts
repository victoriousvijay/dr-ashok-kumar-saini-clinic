import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site";
import { services } from "@/lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/appointment", "/services"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
