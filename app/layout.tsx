import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bhoomigo.com";

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
    "crusher materials Cuttack",
    "building materials Keonjhar",
    "BhoomiGo",
  ],
  openGraph: {
    url: SITE_URL,
    siteName: "BhoomiGo",
    title: "BhoomiGo | Construction Materials in Odisha",
    description:
      "Stone chips, stone dust & aggregates delivered in Odisha. Reliable delivery, no brokerage. WhatsApp or call to place your order.",
    type: "website",
    locale: "en_IN",
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
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BhoomiGo",
  description:
    "Construction materials delivered in Odisha: stone chips, stone dust, aggregates. Direct from crushers, transparent pricing. WhatsApp or call to order.",
  url: SITE_URL,
  telephone: "+91-8984516025",
  areaServed: {
    "@type": "State",
    name: "Odisha",
  },
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
      <body className="antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
