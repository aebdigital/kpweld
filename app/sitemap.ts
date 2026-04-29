import type { MetadataRoute } from "next";
import { services, siteUrl } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/o-nas", "/produkty-sluzby", "/referencie", "/kontakt"];
  const serviceRoutes = services.map((service) => `/produkty-sluzby/${service.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
