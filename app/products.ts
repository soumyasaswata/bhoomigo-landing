// Product rate cards shown on the landing page.
// To change a price, edit `pricePerTon` (material only, in ₹). Use null to show "Ask for price".
// Transport is never included: it depends on distance and vehicle, and is quoted on WhatsApp.

export type Product = {
  id: string;
  popular?: boolean;
  pricePerTon: number | null;
  en: { name: string; use: string };
  odia: { name: string; use: string };
};

export const products: Product[] = [
  {
    id: "chips_20mm",
    popular: true,
    pricePerTon: 950,
    en: { name: "5/8 Chips (20 mm)", use: "Roof slab casting (dhalai), beams, columns" },
    odia: { name: "୫/୮ ଚିପ୍ସ୍ (୨୦ ମିମି)", use: "ଛାତ ଢଳେଇ, ବିମ୍, ପିଲର୍ ପାଇଁ" },
  },
  {
    id: "chips_10mm",
    pricePerTon: null,
    en: { name: "3/8 Chips (10–12 mm)", use: "Lintels, sunshades, thin concrete work" },
    odia: { name: "୩/୮ ଚିପ୍ସ୍ (୧୦–୧୨ ମିମି)", use: "ଲିଣ୍ଟେଲ୍, ସନସେଡ୍ ଓ ପତଳା କଂକ୍ରିଟ୍ କାମ ପାଇଁ" },
  },
  {
    id: "chips_40mm",
    pricePerTon: null,
    en: { name: "1\" / 1½\" Chips (25–40 mm)", use: "Foundation, PCC, floor base" },
    odia: { name: "୧\" / ୧½\" ଚିପ୍ସ୍ (୨୫–୪୦ ମିମି)", use: "ମୂଳଦୁଆ, PCC ଓ ଚଟାଣ ତଳ ପାଇଁ" },
  },
  {
    id: "stone_dust",
    pricePerTon: null,
    en: { name: "Stone Dust", use: "Block making, filling, levelling" },
    odia: { name: "ଷ୍ଟୋନ୍ ଡଷ୍ଟ", use: "ବ୍ଲକ୍ ତିଆରି, ଭରାଟ୍ ଓ ସମତଳ କରିବା ପାଇଁ" },
  },
];
