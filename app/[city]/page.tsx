import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingContent from "../LandingContent";
import { getLocation, locations } from "../locations/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bhoomigo.co";

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const location = getLocation(params.city);
  if (!location) return {};

  const pageUrl = `${SITE_URL}/${location.slug}`;
  const title = `Stone Chips & Stone Dust Delivery in ${location.city}, Odisha | BhoomiGo`;
  const description = `Stone chips, stone dust & aggregates delivered to your site in ${location.city}. Direct from Chandikhole & Aruha crushers, transparent pricing, verified weight slips. Call or WhatsApp to order.`;

  return {
    title,
    description,
    keywords: [
      `stone chips ${location.city}`,
      `stone dust ${location.city}`,
      `construction materials ${location.city}`,
      `aggregates delivery ${location.city}`,
      `crusher materials ${location.city}`,
      "BhoomiGo",
    ],
    openGraph: {
      url: pageUrl,
      siteName: "BhoomiGo",
      title,
      description,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `BhoomiGo - Construction materials in ${location.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical: pageUrl },
    other: {
      "geo.region": "IN-OR",
      "geo.placename": location.city,
      "geo.position": `${location.lat};${location.lng}`,
      ICBM: `${location.lat}, ${location.lng}`,
    },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const location = getLocation(params.city);
  if (!location) notFound();

  const pageUrl = `${SITE_URL}/${location.slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Construction materials delivery",
    provider: {
      "@type": "LocalBusiness",
      name: "BhoomiGo",
      telephone: "+91-8984516025",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    url: pageUrl,
    description: `Stone chips, stone dust and bulk construction material delivery in ${location.city}, Odisha, sourced directly from Chandikhole & Aruha crushers.`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: location.city, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LandingContent location={{ city: location.city, odiaCity: location.odiaCity }} />
    </>
  );
}
