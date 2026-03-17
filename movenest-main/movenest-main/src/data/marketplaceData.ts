import sofaImg from "@/assets/furniture/sofa.jpg";
import bedImg from "@/assets/furniture/bed.jpg";
import diningImg from "@/assets/furniture/dining.jpg";
import wardrobeImg from "@/assets/furniture/wardrobe.jpg";
import tvunitImg from "@/assets/furniture/tvunit.jpg";
import fridgeImg from "@/assets/furniture/fridge.jpg";
import chairImg from "@/assets/furniture/chair.jpg";
import bookshelfImg from "@/assets/furniture/bookshelf.jpg";
import package2bhkImg from "@/assets/furniture/package-2bhk.jpg";
import package3bhkImg from "@/assets/furniture/package-3bhk.jpg";

export type Condition = "New" | "Like New" | "Used" | "Good";
export type ListingType = "package" | "individual";
export type FurnitureCategory = "Sofa" | "Bed" | "Dining Table" | "Wardrobe" | "TV Unit" | "Appliances" | "Office Furniture";

export interface FurnitureListing {
  id: number;
  title: string;
  type: ListingType;
  category: FurnitureCategory;
  items?: string[];
  condition: Condition;
  price: number;
  location: string;
  image: string;
  images: string[];
  description: string;
  dimensions?: string;
  material?: string;
  verified: boolean;
  daysAgo: number;
  seller: { name: string; rating: number };
}

export const furniturePackages: FurnitureListing[] = [
  {
    id: 1,
    title: "2BHK Home Furniture Package",
    type: "package",
    category: "Sofa",
    items: ["Sofa Set", "Double Bed", "Dining Table", "Refrigerator", "Washing Machine"],
    condition: "Like New",
    price: 55000,
    location: "Mumbai",
    image: package2bhkImg,
    images: [package2bhkImg, sofaImg, bedImg, diningImg],
    description: "Complete 2BHK furniture, used for 1 year. Selling because relocating to another city.",
    verified: true,
    daysAgo: 2,
    seller: { name: "Rahul S.", rating: 4.8 },
  },
  {
    id: 2,
    title: "3BHK Premium Furniture Set",
    type: "package",
    category: "Sofa",
    items: ["L-Shape Sofa", "King Bed", "Queen Bed", "6-Seater Dining", "Wardrobe", "TV Unit", "AC"],
    condition: "Good",
    price: 95000,
    location: "Delhi",
    image: package3bhkImg,
    images: [package3bhkImg, sofaImg, bedImg, tvunitImg],
    description: "Premium furniture set from a 3BHK flat. Well maintained, minor scratches on dining table.",
    verified: true,
    daysAgo: 5,
    seller: { name: "Priya M.", rating: 4.5 },
  },
  {
    id: 3,
    title: "1BHK Starter Furniture Bundle",
    type: "package",
    category: "Bed",
    items: ["Single Bed", "Study Table", "Wardrobe", "Dining Table (2-seater)"],
    condition: "Used",
    price: 22000,
    location: "Bangalore",
    image: bedImg,
    images: [bedImg, bookshelfImg, wardrobeImg, diningImg],
    description: "Basic furniture for a 1BHK. Ideal for students or bachelors. Used for 2 years.",
    verified: false,
    daysAgo: 1,
    seller: { name: "Amit K.", rating: 4.2 },
  },
  {
    id: 4,
    title: "Living Room Essentials",
    type: "package",
    category: "Sofa",
    items: ["3-Seater Sofa", "Coffee Table", "TV Unit", "Bookshelf"],
    condition: "Like New",
    price: 38000,
    location: "Pune",
    image: sofaImg,
    images: [sofaImg, tvunitImg, bookshelfImg],
    description: "Modern living room set, barely used for 6 months. Moving abroad.",
    verified: true,
    daysAgo: 3,
    seller: { name: "Sneha R.", rating: 4.9 },
  },
];

export const individualItems: FurnitureListing[] = [
  {
    id: 101,
    title: "Modern Fabric Sofa",
    type: "individual",
    category: "Sofa",
    condition: "Like New",
    price: 12000,
    location: "Mumbai",
    image: sofaImg,
    images: [sofaImg],
    description: "3-seater fabric sofa in excellent condition. No stains or tears.",
    dimensions: "7 ft × 3 ft × 2.5 ft",
    material: "Premium Fabric + Wooden Frame",
    verified: true,
    daysAgo: 1,
    seller: { name: "Vikram P.", rating: 4.6 },
  },
  {
    id: 102,
    title: "King Size Bed with Storage",
    type: "individual",
    category: "Bed",
    condition: "Good",
    price: 9000,
    location: "Delhi",
    image: bedImg,
    images: [bedImg],
    description: "Solid wood king bed with hydraulic storage. Minor scratches on headboard.",
    dimensions: "6.5 ft × 6 ft",
    material: "Sheesham Wood",
    verified: true,
    daysAgo: 4,
    seller: { name: "Neha T.", rating: 4.3 },
  },
  {
    id: 103,
    title: "6-Seater Dining Table",
    type: "individual",
    category: "Dining Table",
    condition: "Used",
    price: 8500,
    location: "Bangalore",
    image: diningImg,
    images: [diningImg],
    description: "Wooden dining table with 6 chairs. Surface has some wear marks.",
    dimensions: "5 ft × 3 ft",
    material: "Engineered Wood",
    verified: false,
    daysAgo: 6,
    seller: { name: "Rajan G.", rating: 4.0 },
  },
  {
    id: 104,
    title: "3-Door Sliding Wardrobe",
    type: "individual",
    category: "Wardrobe",
    condition: "Like New",
    price: 7500,
    location: "Pune",
    image: wardrobeImg,
    images: [wardrobeImg],
    description: "Compact wardrobe with mirror. Purchased 8 months ago.",
    dimensions: "6 ft × 4 ft × 2 ft",
    material: "PLPB + Laminate",
    verified: true,
    daysAgo: 2,
    seller: { name: "Deepa S.", rating: 4.7 },
  },
  {
    id: 105,
    title: "Wall-Mounted TV Unit",
    type: "individual",
    category: "TV Unit",
    condition: "New",
    price: 6500,
    location: "Hyderabad",
    image: tvunitImg,
    images: [tvunitImg],
    description: "Brand new TV unit, unopened. Ordered wrong size.",
    dimensions: "5 ft × 1.5 ft",
    material: "MDF + Lacquer Finish",
    verified: true,
    daysAgo: 0,
    seller: { name: "Karthik N.", rating: 5.0 },
  },
  {
    id: 106,
    title: "Samsung Refrigerator 260L",
    type: "individual",
    category: "Appliances",
    condition: "Good",
    price: 11000,
    location: "Chennai",
    image: fridgeImg,
    images: [fridgeImg],
    description: "Double door fridge, working perfectly. 3 years old.",
    dimensions: "5.5 ft × 2 ft",
    material: "Stainless Steel",
    verified: false,
    daysAgo: 7,
    seller: { name: "Suresh B.", rating: 3.9 },
  },
  {
    id: 107,
    title: "Ergonomic Office Chair",
    type: "individual",
    category: "Office Furniture",
    condition: "Like New",
    price: 5500,
    location: "Mumbai",
    image: chairImg,
    images: [chairImg],
    description: "Adjustable office chair with lumbar support. WFH upgrade.",
    dimensions: "2 ft × 2 ft × 4 ft",
    material: "Mesh + Metal Frame",
    verified: true,
    daysAgo: 3,
    seller: { name: "Anita J.", rating: 4.4 },
  },
  {
    id: 108,
    title: "Wooden Bookshelf",
    type: "individual",
    category: "Office Furniture",
    condition: "Used",
    price: 3500,
    location: "Kolkata",
    image: bookshelfImg,
    images: [bookshelfImg],
    description: "5-tier bookshelf. Holds heavy books. Some color fading.",
    dimensions: "6 ft × 3 ft × 1 ft",
    material: "Solid Pine Wood",
    verified: false,
    daysAgo: 10,
    seller: { name: "Partha D.", rating: 4.1 },
  },
];

export const allListings = [...furniturePackages, ...individualItems];

export const categories: FurnitureCategory[] = [
  "Sofa", "Bed", "Dining Table", "Wardrobe", "TV Unit", "Appliances", "Office Furniture",
];

export const conditions: Condition[] = ["New", "Like New", "Used", "Good"];

export const cities = ["All", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"];

export const packageItems = [
  "Sofa", "Bed", "Dining Table", "Wardrobe", "TV", "AC", "Refrigerator", "Washing Machine",
];

export const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
