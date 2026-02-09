import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BhoomiGo | Construction Materials Delivered in Odisha",
  description:
    "Stone chips, stone dust & aggregates delivered to your site across Odisha. Direct from crushers, transparent pricing. Call or WhatsApp to order.",
  openGraph: {
    title: "BhoomiGo | Construction Materials in Odisha",
    description:
      "Stone chips, stone dust & aggregates delivered in Odisha. Reliable delivery, no brokerage. WhatsApp or call to place your order.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
