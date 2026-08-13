export type LocationData = {
  slug: string;
  city: string;
  odiaCity: string;
  lat: number;
  lng: number;
};

// Service-area cities already referenced in copy.ts / LocalBusiness schema.
export const locations: LocationData[] = [
  { slug: "bhubaneswar", city: "Bhubaneswar", odiaCity: "ଭୁବନେଶ୍ୱର", lat: 20.2961, lng: 85.8245 },
  { slug: "cuttack", city: "Cuttack", odiaCity: "କଟକ", lat: 20.4625, lng: 85.8828 },
  { slug: "jajpur", city: "Jajpur", odiaCity: "ଯାଜପୁର", lat: 20.8514, lng: 86.3346 },
  { slug: "keonjhar", city: "Keonjhar", odiaCity: "କେଉଁଝର", lat: 21.6297, lng: 85.5817 },
  { slug: "angul", city: "Angul", odiaCity: "ଅନୁଗୋଳ", lat: 20.8400, lng: 85.1013 },
  { slug: "baleswar", city: "Baleswar", odiaCity: "ବାଲେଶ୍ୱର", lat: 21.4942, lng: 86.9317 },
  { slug: "bhadrak", city: "Bhadrak", odiaCity: "ଭଦ୍ରକ", lat: 21.0574, lng: 86.5150 },
  { slug: "chandikhole", city: "Chandikhole", odiaCity: "ଚଣ୍ଡିଖୋଲ", lat: 20.8272, lng: 86.0339 },
];

export function getLocation(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug);
}
