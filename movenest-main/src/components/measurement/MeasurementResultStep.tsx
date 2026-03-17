import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Check, Pencil, Ruler, DoorOpen, SquareIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { RoomMeasurements } from "./ProcessingStep";

interface MeasurementResultStepProps {
  image: string;
  measurements: RoomMeasurements;
  onConfirm: (measurements: RoomMeasurements) => void;
  onRetake: () => void;
}

const MeasurementResultStep = ({ image, measurements, onConfirm, onRetake }: MeasurementResultStepProps) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<RoomMeasurements>({ ...measurements });

  const updateValue = (key: keyof RoomMeasurements, val: string) => {
    const num = parseFloat(val) || 0;
    const updated = { ...values, [key]: num };
    if (key === "width" || key === "length") {
      updated.area = +(updated.width * updated.length).toFixed(0);
      updated.wallArea = +(2 * (updated.width + updated.length) * updated.height).toFixed(0);
    }
    if (key === "height") {
      updated.wallArea = +(2 * (updated.width + updated.length) * updated.height).toFixed(0);
    }
    setValues(updated);
  };

  const stats = [
    { label: "Room Width", value: values.width, unit: "ft", key: "width" as const, icon: Ruler },
    { label: "Room Length", value: values.length, unit: "ft", key: "length" as const, icon: Ruler },
    { label: "Ceiling Height", value: values.height, unit: "ft", key: "height" as const, icon: Ruler },
    { label: "Floor Area", value: values.area, unit: "sq ft", key: "area" as const, icon: SquareIcon },
    { label: "Wall Area", value: values.wallArea, unit: "sq ft", key: "wallArea" as const, icon: SquareIcon },
    { label: "Doors", value: values.doors, unit: "", key: "doors" as const, icon: DoorOpen },
    { label: "Windows", value: values.windows, unit: "", key: "windows" as const, icon: SquareIcon },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Measurement Results</h2>
        <p className="text-muted-foreground font-body">Review and confirm your room dimensions</p>
      </motion.div>

      <Alert className="bg-warm-light border-accent/30">
        <AlertTriangle className="h-4 w-4 text-accent" />
        <AlertDescription className="text-sm font-body">
          AI measurements provide an approximate estimate with 85–90% accuracy. Final measurements will be verified during site inspection.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image with overlay */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-2xl overflow-hidden border border-border"
        >
          <img src={image} alt="Room" className="w-full h-auto" />
          {/* Measurement overlay lines */}
          <div className="absolute inset-0 pointer-events-none p-4">
            {/* Width line */}
            <div className="absolute bottom-8 left-8 right-8 flex items-center">
              <div className="h-[2px] flex-1 bg-primary" />
              <span className="px-2 text-xs font-bold bg-primary text-primary-foreground rounded-full py-0.5">
                {values.width} ft
              </span>
              <div className="h-[2px] flex-1 bg-primary" />
            </div>
            {/* Height line */}
            <div className="absolute top-8 bottom-8 left-8 flex flex-col items-center">
              <div className="w-[2px] flex-1 bg-accent" />
              <span className="py-1 px-2 text-xs font-bold bg-accent text-accent-foreground rounded-full my-1 [writing-mode:vertical-lr]">
                {values.height} ft
              </span>
              <div className="w-[2px] flex-1 bg-accent" />
            </div>
            {/* Area badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border">
              <p className="text-lg font-bold text-primary font-display">{values.area} sq ft</p>
              <p className="text-xs text-muted-foreground font-body">Room Area</p>
            </div>
          </div>
        </motion.div>

        {/* Measurements */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold font-display">Detected Dimensions</h3>
            <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
              <Pencil className="w-4 h-4 mr-1" />
              {editing ? "Done" : "Edit"}
            </Button>
          </div>

          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="flex-1 text-sm font-body font-medium">{stat.label}</span>
              {editing && stat.key !== "area" && stat.key !== "wallArea" ? (
                <Input
                  type="number"
                  value={stat.value}
                  onChange={(e) => updateValue(stat.key, e.target.value)}
                  className="w-20 h-8 text-sm text-right"
                  step="0.1"
                />
              ) : (
                <span className="font-bold text-sm font-display">
                  {stat.value} {stat.unit}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button variant="hero" size="lg" className="text-base px-8 py-6" onClick={() => onConfirm(values)}>
          <Check className="w-5 h-5 mr-2" />
          Confirm Measurements
        </Button>
        <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" onClick={onRetake}>
          Retake Photo
        </Button>
      </div>
    </div>
  );
};

export default MeasurementResultStep;
