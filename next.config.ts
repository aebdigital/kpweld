import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/pages/kontakt.html",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/pages/o-nas.html",
        destination: "/o-nas",
        permanent: true,
      },
      {
        source: "/pages/produkty-sluzby.html",
        destination: "/produkty-sluzby",
        permanent: true,
      },
      {
        source: "/pages/referencie.html",
        destination: "/referencie",
        permanent: true,
      },
      {
        source: "/pages/service-page/:slug.html",
        destination: "/produkty-sluzby/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
