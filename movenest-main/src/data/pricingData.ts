export interface PricingTier {
  label: string;
  price: number;
  description: string;
}

export interface ServicePricing {
  id: string;
  name: string;
  icon: string;
  unit: string;
  description: string;
  tiers?: PricingTier[];
  priceRange?: string;
  priceNote?: string;
  isLumpSum?: boolean;
}

export const servicePricingData: ServicePricing[] = [
  {
    id: "false-ceiling",
    name: "False Ceiling",
    icon: "🏗️",
    unit: "sq ft",
    description:
      "False ceiling designs improve lighting aesthetics and overall room appearance.",
    tiers: [
      { label: "Basic", price: 45, description: "Simple gypsum ceiling with basic finish" },
      { label: "Mid", price: 55, description: "Gypsum ceiling with design patterns and lighting cutouts" },
      { label: "High", price: 80, description: "Premium designer ceiling with layered design and integrated lighting" },
    ],
  },
  {
    id: "wood-work",
    name: "Wood Work Box",
    icon: "🪵",
    unit: "sq ft",
    description:
      "Used for storage units, cabinets, and structural wood frameworks.",
    tiers: [
      { label: "Basic", price: 900, description: "Standard plywood framework" },
      { label: "Mid", price: 1200, description: "High-quality plywood with laminate finish" },
      { label: "High", price: 1500, description: "Premium woodwork with advanced finishing" },
    ],
  },
  {
    id: "wall-panelling",
    name: "Wall Panelling",
    icon: "🧱",
    unit: "sq ft",
    description:
      "Wall panelling enhances interior design and provides decorative wall finishes.",
    tiers: [
      { label: "Basic", price: 180, description: "Simple laminate wall panels" },
      { label: "Mid", price: 300, description: "Decorative wood or textured panels" },
      { label: "High", price: 450, description: "Premium designer panels with lighting or textures" },
    ],
  },
  {
    id: "modular-box",
    name: "Modular Box",
    icon: "🗄️",
    unit: "sq ft",
    description:
      "Used for modular kitchen cabinets and wardrobe structures.",
    tiers: [
      { label: "Basic", price: 1300, description: "Standard modular cabinet structure" },
      { label: "Mid", price: 1500, description: "Modular cabinets with improved materials and finishes" },
      { label: "High", price: 1800, description: "Premium modular cabinets with soft-close fittings and luxury finishes" },
    ],
  },
  {
    id: "flush-doors",
    name: "Flush Doors",
    icon: "🚪",
    unit: "sq ft",
    description:
      "Flush doors are used for room entrances and interior partitions.",
    tiers: [
      { label: "Basic", price: 250, description: "Standard flush door" },
      { label: "Mid", price: 300, description: "Laminate finish door" },
      { label: "High", price: 450, description: "Premium finish with decorative design" },
    ],
  },
  {
    id: "upvc",
    name: "UPVC Doors & Windows",
    icon: "🪟",
    unit: "sq ft",
    description:
      "UPVC doors and windows provide durability, insulation, and weather resistance.",
    priceRange: "₹350 – ₹1,200 per sq ft",
    priceNote: "Price depends on frame thickness, glass type, and sliding or fixed design.",
    tiers: [
      { label: "Basic", price: 350, description: "Standard frame with plain glass" },
      { label: "Mid", price: 700, description: "Medium frame with toughened glass" },
      { label: "High", price: 1200, description: "Heavy-duty frame with double-glazed glass" },
    ],
  },
  {
    id: "flooring",
    name: "Flooring",
    icon: "🏠",
    unit: "sq ft",
    description:
      "Flooring options include tiles, laminate, vinyl, or stone flooring.",
    tiers: [
      { label: "Basic", price: 60, description: "Basic tiles (₹60 – ₹120)" },
      { label: "Mid", price: 180, description: "Vitrified tiles (₹120 – ₹250)" },
      { label: "High", price: 400, description: "Premium marble / wooden flooring (₹300 – ₹500)" },
    ],
  },
  {
    id: "painting",
    name: "Painting & Finishes",
    icon: "🎨",
    unit: "sq ft",
    description:
      "Painting improves wall aesthetics and protects surfaces.",
    tiers: [
      { label: "Basic", price: 20, description: "Basic paint (₹20 – ₹30)" },
      { label: "Mid", price: 35, description: "Premium paint (₹30 – ₹40)" },
      { label: "High", price: 45, description: "Designer finish / texture (₹40 – ₹50)" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical Works",
    icon: "⚡",
    unit: "lump sum",
    description:
      "Electrical installation includes wiring, switchboards, and lighting setup.",
    isLumpSum: true,
    priceNote: "Cost depends on room size, number of points, and lighting fixtures. Exact price calculated during site inspection.",
  },
  {
    id: "plumbing",
    name: "Plumbing Works",
    icon: "🔧",
    unit: "lump sum",
    description:
      "Plumbing includes water pipelines, fittings, and bathroom connections.",
    isLumpSum: true,
    priceNote: "Cost depends on bathroom size, kitchen connections, and pipe materials. Final estimate provided after inspection.",
  },
];
