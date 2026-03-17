import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, IndianRupee, Info } from "lucide-react";
import type { ServicePricing } from "@/data/pricingData";

interface ServiceCardProps {
  service: ServicePricing;
  area: number;
}

const tierColors: Record<string, string> = {
  Basic: "border-primary/30 bg-primary/5",
  Mid: "border-accent/30 bg-accent/5",
  High: "border-purple-400/30 bg-purple-50",
};

const tierBadge: Record<string, string> = {
  Basic: "bg-primary/10 text-primary",
  Mid: "bg-accent/10 text-accent",
  High: "bg-purple-100 text-purple-700",
};

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const ServiceCard = ({ service, area }: ServiceCardProps) => {
  const [selectedTier, setSelectedTier] = useState<string>(
    service.tiers?.[1]?.label ?? ""
  );

  const activeTier = service.tiers?.find((t) => t.label === selectedTier);
  const total = activeTier ? activeTier.price * area : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{service.icon}</span>
          <h3 className="text-lg font-bold font-display">{service.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground font-body">
          {service.description}
        </p>
      </div>

      {/* Lump sum services */}
      {service.isLumpSum ? (
        <div className="p-5">
          <div className="flex items-start gap-2 bg-muted rounded-xl p-4">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground font-body">
              {service.priceNote}
            </p>
          </div>
          <p className="text-xs text-muted-foreground font-body mt-3 text-center">
            Pricing: <span className="font-semibold">Lump Sum</span> — quoted
            after site inspection
          </p>
        </div>
      ) : (
        <>
          {/* Tier selector */}
          {service.tiers && (
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {service.tiers.map((tier) => (
                  <button
                    key={tier.label}
                    onClick={() => setSelectedTier(tier.label)}
                    className={`rounded-xl p-3 border-2 transition-all text-center ${
                      selectedTier === tier.label
                        ? tierColors[tier.label]
                        : "border-border hover:border-primary/20"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mb-1 ${
                        tierBadge[tier.label]
                      }`}
                    >
                      {tier.label}
                    </span>
                    <p className="text-base font-bold font-display">
                      {fmt(tier.price)}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-body">
                      per {service.unit}
                    </p>
                  </button>
                ))}
              </div>

              {/* Description */}
              {activeTier && (
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground font-body">
                    {activeTier.description}
                  </span>
                </div>
              )}

              {/* Estimate */}
              <div className="bg-sage-light rounded-xl p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-body mb-1">
                  <span>
                    {area} {service.unit} × {fmt(activeTier?.price ?? 0)}
                  </span>
                  <span>{selectedTier} Package</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold font-display text-sm">
                    Estimated Cost
                  </span>
                  <span className="text-lg font-bold font-display text-primary flex items-center">
                    <IndianRupee className="w-4 h-4" />
                    {total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ServiceCard;
