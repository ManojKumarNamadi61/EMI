import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Armchair, Clock, Sparkles, MapPin } from "lucide-react";

export type MarketplaceTab = "packages" | "individual" | "recent" | "deals" | "nearby";

const tabs: { value: MarketplaceTab; label: string; icon: React.ElementType }[] = [
  { value: "packages", label: "Packages", icon: Package },
  { value: "individual", label: "Individual", icon: Armchair },
  { value: "recent", label: "Recently Added", icon: Clock },
  { value: "deals", label: "Budget Deals", icon: Sparkles },
  { value: "nearby", label: "Nearby", icon: MapPin },
];

interface Props {
  active: MarketplaceTab;
  onChange: (tab: MarketplaceTab) => void;
}

const MarketplaceTabs = ({ active, onChange }: Props) => (
  <div className="bg-sage-light border-y border-border sticky top-16 z-40">
    <div className="container py-3 overflow-x-auto">
      <Tabs value={active} onValueChange={(v) => onChange(v as MarketplaceTab)}>
        <TabsList className="bg-card/80 h-auto p-1 gap-1 flex-wrap">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="text-xs sm:text-sm font-body gap-1.5 px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  </div>
);

export default MarketplaceTabs;
