import {PropertyType} from "./types";

export const SITE_TITLE = "Interasian Realty Services Inc.";
export const SITE_DESCRIPTION =
  "Find your dream property with Interasian Realty";

export const PRICE_RANGE = {
  min: 0,
  max: 5000000,
  step: 100000,
};

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, "6+"];
export const BATHROOM_OPTIONS = [1, 2, 3, 4, "5+"];

export const FEATURED_CITIES = [
  "New York",
  "Los Angeles",
  "Miami",
  "Chicago",
  "San Francisco",
  "Seattle",
];

export const TYPE_ICONS: Record<PropertyType | "all", string> = {
  all: "home",
  house: "home",
  condo: "building-2",
  apartment: "building",
  townhouse: "home",
  land: "map",
  commercial: "store",
  "house-and-lot": "trees",
};

export const MOCK_PROPERTIES = [
  {
    id: "prop-001",
    title: "Modern Luxury Condo with Ocean View",
    description:
      "Stunning modern condo featuring floor-to-ceiling windows with breathtaking ocean views. This luxury unit includes high-end finishes, an open floor plan, and access to premium building amenities including a pool, gym, and 24-hour concierge service.",
    price: 1250000,
    address: "123 Oceanfront Drive",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    type: "condo" as PropertyType,
    bedrooms: 2,
    bathrooms: 2,
    area: 1450,
    images: [
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg",
    ],
    features: ["Ocean View", "Pool", "Gym", "Concierge", "Security", "Parking"],
    createdAt: "2025-04-01",
    agent: {
      id: "agent-001",
      name: "Sarah Johnson",
      email: "sarah@primeestate.com",
      phone: "305-555-7890",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
  },
  {
    id: "prop-002",
    title: "Spacious Family Home with Large Backyard",
    description:
      "Beautiful 4-bedroom family home in a quiet, tree-lined neighborhood. Features include an updated kitchen with stainless steel appliances, hardwood floors throughout, a finished basement, and a large fenced backyard perfect for entertaining.",
    price: 850000,
    address: "456 Maple Avenue",
    city: "Chicago",
    state: "IL",
    zipCode: "60614",
    type: "house" as PropertyType,
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    ],
    features: [
      "Hardwood Floors",
      "Finished Basement",
      "Fenced Yard",
      "Garage",
      "Fireplace",
    ],
    createdAt: "2025-03-28",
    agent: {
      id: "agent-002",
      name: "Michael Chen",
      email: "michael@primeestate.com",
      phone: "312-555-1234",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
  },
  {
    id: "prop-003",
    title: "Downtown Penthouse Loft",
    description:
      "Spectacular penthouse loft in the heart of downtown. Industrial-chic design with exposed brick, 14-foot ceilings, and panoramic city views. This unique space offers the ultimate urban lifestyle with high-end restaurants, shopping, and entertainment just steps away.",
    price: 1750000,
    address: "789 Urban Center",
    city: "New York",
    state: "NY",
    zipCode: "10012",
    type: "apartment" as PropertyType,
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    images: [
      "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg",
      "https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg",
      "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg",
    ],
    features: [
      "City Views",
      "Exposed Brick",
      "High Ceilings",
      "Rooftop Access",
      "Elevator",
    ],
    createdAt: "2025-04-02",
    agent: {
      id: "agent-003",
      name: "Emma Rodriguez",
      email: "emma@primeestate.com",
      phone: "212-555-6789",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
  },
  {
    id: "prop-004",
    title: "Waterfront Commercial Building",
    description:
      "Prime commercial property with waterfront location. This versatile building offers multiple office suites, meeting spaces, and ample parking. Perfect for a business looking to make a statement with a prestigious address and stunning views.",
    price: 2900000,
    address: "101 Harbor Drive",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    type: "commercial" as PropertyType,
    bedrooms: 0,
    bathrooms: 4,
    area: 5000,
    images: [
      "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
      "https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg",
      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg",
    ],
    features: [
      "Waterfront",
      "Parking",
      "Elevator",
      "Security System",
      "Conference Rooms",
    ],
    createdAt: "2025-03-25",
    agent: {
      id: "agent-004",
      name: "David Wilson",
      email: "david@primeestate.com",
      phone: "415-555-4321",
      avatar:
        "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg",
    },
  },
  {
    id: "prop-005",
    title: "Scenic Mountain Land for Development",
    description:
      "Rare opportunity to own 5 acres of pristine land with mountain views. This lot is fully permitted for residential development and offers the perfect canvas to build your dream home. Utilities at the lot line and easy road access.",
    price: 350000,
    address: "Mountain View Road",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    type: "land" as PropertyType,
    bedrooms: 0,
    bathrooms: 0,
    area: 217800, // 5 acres in sq ft
    images: [
      "https://images.pexels.com/photos/147411/pexels-photo-147411.jpeg",
      "https://images.pexels.com/photos/2437298/pexels-photo-2437298.jpeg",
      "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg",
    ],
    features: [
      "Mountain Views",
      "5 Acres",
      "Utilities Available",
      "Road Access",
      "Buildable",
    ],
    createdAt: "2025-03-15",
    agent: {
      id: "agent-005",
      name: "Olivia Taylor",
      email: "olivia@primeestate.com",
      phone: "206-555-8765",
      avatar:
        "https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg",
    },
  },
  {
    id: "prop-006",
    title: "Elegant Townhouse with Rooftop Terrace",
    description:
      "Sophisticated townhouse in a gated community featuring modern design and premium finishes. The highlight is a private rooftop terrace with outdoor kitchen and stunning sunset views. Includes a two-car garage and smart home technology throughout.",
    price: 975000,
    address: "222 Parkside Lane",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    type: "townhouse" as PropertyType,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2100,
    images: [
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    ],
    features: [
      "Rooftop Terrace",
      "Smart Home",
      "Gated Community",
      "Garage",
      "Outdoor Kitchen",
    ],
    createdAt: "2025-04-05",
    agent: {
      id: "agent-006",
      name: "Jolo Tangpuz",
      email: "jolo@yahoo.com",
      phone: "0967 243 9625",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    },
  },
];
