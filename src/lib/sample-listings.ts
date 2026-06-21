import type { CategoryKey } from "@/lib/constants";

/**
 * Seeded sample listings. Used to render Browse + detail in Phase 0 (demo mode) and
 * mirrored in supabase/seed.sql. Photos are royalty-free Unsplash images (placeholder).
 */
export interface SampleListing {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  vin: string;
  zip: string;
  category: CategoryKey;
  price: number;
  sellerFirstName: string;
  description: string;
  photos: string[];
  featured?: boolean;
}

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const SAMPLE_LISTINGS: SampleListing[] = [
  {
    id: "frontier-2011-sv",
    year: 2011,
    make: "Nissan",
    model: "Frontier",
    trim: "SV",
    mileage: 19700,
    vin: "1N6AD0EV5BC400001",
    zip: "55403",
    category: "truck_large",
    price: 14250,
    sellerFirstName: "Marcus",
    description:
      "One-owner Frontier SV, garage-kept, all service records. Tow package, bed liner, brand new tires. A genuinely low-mileage truck.",
    photos: [U("photo-1605559424843-9e4c228bf1c2"), U("photo-1561361513-2d000a50f0dc")],
    featured: true,
  },
  {
    id: "civic-2018-ex",
    year: 2018,
    make: "Honda",
    model: "Civic",
    trim: "EX",
    mileage: 51200,
    vin: "2HGFC2F77JH500002",
    zip: "55408",
    category: "standard",
    price: 16900,
    sellerFirstName: "Priya",
    description:
      "Reliable commuter, sunroof, Apple CarPlay, new brakes. Clean title, non-smoker.",
    photos: [U("photo-1568605117036-5fe5e7bab0b7")],
  },
  {
    id: "f150-2016-xlt",
    year: 2016,
    make: "Ford",
    model: "F-150",
    trim: "XLT 4x4",
    mileage: 88400,
    vin: "1FTEW1EF0GF600003",
    zip: "55104",
    category: "truck_large",
    price: 22500,
    sellerFirstName: "Dale",
    description:
      "5.0L V8, crew cab, trailer brake controller, spray-in liner. Maintained on schedule.",
    photos: [U("photo-1605893477799-b99e3b8b93fe")],
    featured: true,
  },
  {
    id: "crv-2019-lx",
    year: 2019,
    make: "Honda",
    model: "CR-V",
    trim: "LX AWD",
    mileage: 43800,
    vin: "5J6RW6H37KL700004",
    zip: "55416",
    category: "standard",
    price: 21300,
    sellerFirstName: "Sofia",
    description: "AWD, very clean interior, recent oil change and cabin filter. Great winter SUV.",
    photos: [U("photo-1519641471654-76ce0107ad1b")],
  },
  {
    id: "corvette-2015-z51",
    year: 2015,
    make: "Chevrolet",
    model: "Corvette",
    trim: "Stingray Z51",
    mileage: 28100,
    vin: "1G1YK2D70F5800005",
    zip: "55405",
    category: "premium",
    price: 44900,
    sellerFirstName: "Renee",
    description:
      "Z51 package, 7-speed manual, two sets of wheels included. Adult-owned, never tracked.",
    photos: [U("photo-1552519507-da3b142c6e3d")],
    featured: true,
  },
  {
    id: "tahoe-2017-lt",
    year: 2017,
    make: "Chevrolet",
    model: "Tahoe",
    trim: "LT",
    mileage: 96200,
    vin: "1GNSKBKC5HR900006",
    zip: "55102",
    category: "truck_large",
    price: 27800,
    sellerFirstName: "Tom",
    description: "3-row family hauler, rear entertainment, tow package, fresh brakes all around.",
    photos: [U("photo-1519641471654-76ce0107ad1b")],
  },
  {
    id: "camry-2020-se",
    year: 2020,
    make: "Toyota",
    model: "Camry",
    trim: "SE",
    mileage: 38600,
    vin: "4T1G11AK0LU100007",
    zip: "55407",
    category: "standard",
    price: 23400,
    sellerFirstName: "Aisha",
    description: "One owner, factory warranty remaining, blind-spot monitoring, spotless.",
    photos: [U("photo-1621007947382-bb3c3994e3fb")],
  },
  {
    id: "wrangler-2014-sport",
    year: 2014,
    make: "Jeep",
    model: "Wrangler",
    trim: "Sport 4x4",
    mileage: 79900,
    vin: "1C4AJWAG0EL200008",
    zip: "55411",
    category: "truck_large",
    price: 19900,
    sellerFirstName: "Cody",
    description: "Hardtop + soft top, lift kit, 33s, well cared for. Summer fun, winter ready.",
    photos: [U("photo-1533473359331-0135ef1b58bf")],
  },
  {
    id: "model3-2021-lr",
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range",
    mileage: 31200,
    vin: "5YJ3E1EB0MF300009",
    zip: "55401",
    category: "premium",
    price: 32900,
    sellerFirstName: "Hannah",
    description: "Dual motor AWD, premium interior, recent tires, clean Carfax. Charges included.",
    photos: [U("photo-1560958089-b8a1929cea89")],
  },
  {
    id: "outback-2017-premium",
    year: 2017,
    make: "Subaru",
    model: "Outback",
    trim: "2.5i Premium",
    mileage: 102400,
    vin: "4S4BSACC8H3401010",
    zip: "55109",
    category: "standard",
    price: 15800,
    sellerFirstName: "Greg",
    description: "Minnesota's official car. AWD, heated seats, new battery, timing serviced.",
    photos: [U("photo-1605559424843-9e4c228bf1c2")],
  },
];

export function getSampleListing(id: string): SampleListing | undefined {
  return SAMPLE_LISTINGS.find((l) => l.id === id);
}
