import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Download, IndianRupee } from "lucide-react";
import type { RoomMeasurements } from "./ProcessingStep";

interface EstimateStepProps {
  measurements: RoomMeasurements;
  onBack: () => void;
  onStartOver: () => void;
}

interface ServiceEstimate {
  name: string;
  pricePerUnit: number;
  unit: string;
  quantity: number;
  total: number;
}

const serviceOptions = [
  { name: "Painting", pricePerSqft: 18, usesWallArea: true },
  { name: "Wallpaper", pricePerSqft: 35, usesWallArea: true },
  { name: "Flooring", pricePerSqft: 65, usesWallArea: false },
  { name: "False Ceiling", pricePerSqft: 85, usesWallArea: false },
  { name: "TV Unit", flat: 22000 },
  { name: "Modular Kitchen", flat: 85000 },
  { name: "Wardrobe", flat: 45000 },
  { name: "Lighting Design", flat: 15000 },
  { name: "Curtains & Blinds", flat: 8000 },
] as const;

const EstimateStep = ({ measurements, onBack, onStartOver }: EstimateStepProps) => {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set(["Painting", "Flooring"]));

  const toggleService = (name: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const estimates: ServiceEstimate[] = serviceOptions
    .filter((s) => selectedServices.has(s.name))
    .map((s) => {
      if ("flat" in s) {
        return { name: s.name, pricePerUnit: s.flat, unit: "unit", quantity: 1, total: s.flat };
      }
      const qty = s.usesWallArea ? measurements.wallArea : measurements.area;
      return {
        name: s.name,
        pricePerUnit: s.pricePerSqft,
        unit: "sq ft",
        quantity: qty,
        total: qty * s.pricePerSqft,
      };
    });

  const grandTotal = estimates.reduce((sum, e) => sum + e.total, 0);
  const emi12 = Math.round(grandTotal / 12);
  const emi24 = Math.round(grandTotal / 24);

  const formatCurrency = (n: number) =>
    "₹" + n.toLocaleString("en-IN");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Interior Cost Estimate</h2>
        <p className="text-muted-foreground font-body">
          Based on your room ({measurements.width} × {measurements.length} ft = {measurements.area} sq ft)
        </p>
      </motion.div>

      {/* Room summary card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: "Width", val: `${measurements.width} ft` },
          { label: "Length", val: `${measurements.length} ft` },
          { label: "Height", val: `${measurements.height} ft` },
          { label: "Area", val: `${measurements.area} sq ft` },
        ].map((item) => (
          <div key={item.label} className="bg-sage-light rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground font-body">{item.label}</p>
            <p className="font-bold font-display text-primary">{item.val}</p>
          </div>
        ))}
      </motion.div>

      {/* Service selection */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h3 className="font-semibold font-display mb-3">Select Interior Services</h3>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((s) => (
            <button
              key={s.name}
              onClick={() => toggleService(s.name)}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium border transition-all ${
                selectedServices.has(s.name)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {selectedServices.has(s.name) && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
              {s.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Estimate breakdown */}
      {estimates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold font-display">Cost Breakdown</h3>
          </div>
          <div className="divide-y divide-border">
            {estimates.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium text-sm font-body">{e.name}</p>
                  <p className="text-xs text-muted-foreground font-body">
                    {"flat" in serviceOptions.find((s) => s.name === e.name)!
                      ? "Fixed price"
                      : `${e.quantity} ${e.unit} × ${formatCurrency(e.pricePerUnit)}/${e.unit}`}
                  </p>
                </div>
                <span className="font-bold font-display">{formatCurrency(e.total)}</span>
              </motion.div>
            ))}
          </div>
          <div className="p-4 bg-sage-light border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold font-display">Total Estimate</span>
              <span className="text-2xl font-bold font-display text-primary flex items-center">
                <IndianRupee className="w-5 h-5" />
                {grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* EMI breakdown */}
      {grandTotal > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid sm:grid-cols-2 gap-3"
        >
          <div className="bg-card rounded-2xl p-4 border border-border text-center">
            <p className="text-xs text-muted-foreground font-body mb-1">12-Month EMI</p>
            <p className="text-xl font-bold font-display text-accent">{formatCurrency(emi12)}<span className="text-sm font-normal">/mo</span></p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border text-center">
            <p className="text-xs text-muted-foreground font-body mb-1">24-Month EMI</p>
            <p className="text-xl font-bold font-display text-accent">{formatCurrency(emi24)}<span className="text-sm font-normal">/mo</span></p>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button variant="hero" size="lg" className="text-base px-8 py-6">
          <Download className="w-5 h-5 mr-2" />
          Download Estimate
        </Button>
        <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" onClick={onBack}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Edit Measurements
        </Button>
        <Button variant="outline" size="lg" className="text-base px-8 py-6" onClick={onStartOver}>
          Measure Another Room
        </Button>
      </div>
    </div>
  );
};

export default EstimateStep;
