import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { categories, conditions, cities, type FurnitureCategory, type Condition } from "@/data/marketplaceData";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  condition: string;
  onConditionChange: (v: string) => void;
  city: string;
  onCityChange: (v: string) => void;
  priceRange: string;
  onPriceRangeChange: (v: string) => void;
}

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹10K", min: 0, max: 10000 },
  { label: "₹10K – ₹30K", min: 10000, max: 30000 },
  { label: "₹30K – ₹50K", min: 30000, max: 50000 },
  { label: "₹50K+", min: 50000, max: Infinity },
];

export { priceRanges };

const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-body font-medium border transition-all ${
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "border-border hover:border-primary/50"
    }`}
  >
    {label}
  </button>
);

const ListingFilters = ({
  search, onSearchChange,
  category, onCategoryChange,
  condition, onConditionChange,
  city, onCityChange,
  priceRange, onPriceRangeChange,
}: Props) => (
  <div className="md:w-64 shrink-0 space-y-4">
    {/* Search */}
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <Input
          placeholder="Search listings..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-0 p-0 h-auto focus-visible:ring-0"
        />
      </div>
    </div>

    {/* Category */}
    <div className="bg-card rounded-2xl border border-border p-4">
      <p className="text-sm font-semibold font-body mb-3 flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4" /> Category
      </p>
      <div className="flex flex-wrap gap-2">
        <Chip label="All" active={category === "All"} onClick={() => onCategoryChange("All")} />
        {categories.map((c) => (
          <Chip key={c} label={c} active={category === c} onClick={() => onCategoryChange(c)} />
        ))}
      </div>
    </div>

    {/* Condition */}
    <div className="bg-card rounded-2xl border border-border p-4">
      <p className="text-sm font-semibold font-body mb-3">Condition</p>
      <div className="flex flex-wrap gap-2">
        <Chip label="All" active={condition === "All"} onClick={() => onConditionChange("All")} />
        {conditions.map((c) => (
          <Chip key={c} label={c} active={condition === c} onClick={() => onConditionChange(c)} />
        ))}
      </div>
    </div>

    {/* Price Range */}
    <div className="bg-card rounded-2xl border border-border p-4">
      <p className="text-sm font-semibold font-body mb-3">Price Range</p>
      <div className="flex flex-wrap gap-2">
        {priceRanges.map((p) => (
          <Chip key={p.label} label={p.label} active={priceRange === p.label} onClick={() => onPriceRangeChange(p.label)} />
        ))}
      </div>
    </div>

    {/* Location */}
    <div className="bg-card rounded-2xl border border-border p-4">
      <p className="text-sm font-semibold font-body mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4" /> Location
      </p>
      <div className="flex flex-wrap gap-2">
        {cities.map((c) => (
          <Chip key={c} label={c} active={city === c} onClick={() => onCityChange(c)} />
        ))}
      </div>
    </div>
  </div>
);

export default ListingFilters;
