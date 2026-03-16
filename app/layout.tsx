import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bhoomigo.co";
const GTM_ID = "GTM-5TNSW4FG";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BhoomiGo | Construction Materials Delivered in Odisha",
  description:
    "Stone chips, stone dust & aggregates delivered to your site across Odisha. Direct from crushers, transparent pricing. Call or WhatsApp to order.",
  keywords: [
    "construction materials Odisha",
    "stone chips Odisha",
    "aggregates delivery Odisha",
    "stone dust Bhubaneswar",
    "crusher Odisha",
    "crusher materials Cuttack",
    "building materials Keonjhar",
    "construction materials Baleswar",
    "building materials Bhadrak",
    "stone chips Chandikhole",
    "stone dust Chandikhole",
    "stone chips Aruha",
    "stone dust Aruha",
    "crusher Chandikhole",
    "BhoomiGo",
  ],
    openGraph: {
    url: SITE_URL,
    siteName: "BhoomiGo",
    title: "BhoomiGo | Stone Chips & Dust from Chandikhole",
    description:
      "High-quality stone chips, stone dust & aggregates sourced directly from Chandikhole & Aruha crushers. Delivered across Odisha. Call to order.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BhoomiGo - Build Better",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BhoomiGo | Construction Materials in Odisha",
    description:
      "Stone chips, stone dust & aggregates delivered in Odisha. WhatsApp or call to order.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  other: {
    "geo.region": "IN-OR",
    "geo.placename": "Dharmasala",
    "geo.position": "20.7706;86.1497",
    ICBM: "20.7706, 86.1497",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BhoomiGo",
  description:
    "Construction materials delivered in Odisha: stone chips, stone dust, aggregates. Direct from crushers, transparent pricing. WhatsApp or call to order.",
  url: SITE_URL,
  telephone: "+91-8984516025",
  address: {
    "@type": "PostalAddress",
    streetAddress: "At/Po - Aruha, Block - Dharmasala",
    addressLocality: "Jajpur",
    addressRegion: "Odisha",
    postalCode: "755024",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 20.7706,
    longitude: 86.1497,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Bhubaneswar",
    },
    {
      "@type": "City",
      name: "Cuttack",
    },
    {
      "@type": "City",
      name: "Jajpur",
    },
    {
      "@type": "City",
      name: "Keonjhar",
    },
    {
      "@type": "City",
      name: "Angul",
    },
    {
      "@type": "City",
      name: "Baleswar",
    },
    {
      "@type": "City",
      name: "Bhadrak",
    },
    {
      "@type": "City",
      name: "Chandikhole",
    },
  ],
  priceRange: "₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
