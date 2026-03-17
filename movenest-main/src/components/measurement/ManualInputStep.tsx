import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler, ArrowRight, Info } from "lucide-react";
import type { RoomMeasurements } from "./ProcessingStep";

interface ManualInputStepProps {
  onSubmit: (measurements: RoomMeasurements) => void;
}

const ManualInputStep = ({ onSubmit }: ManualInputStepProps) => {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("9");
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("1");

  const w = parseFloat(width) || 0;
  const l = parseFloat(length) || 0;
  const h = parseFloat(height) || 9;
  const area = +(w * l).toFixed(0);
  const wallArea = +(2 * (w + l) * h).toFixed(0);

  const isValid = w > 0 && l > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      width: w,
      length: l,
      height: h,
      area,
      wallArea,
      doors: parseInt(doors) || 1,
      windows: parseInt(windows) || 1,
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Enter Room Dimensions</h2>
        <p className="text-muted-foreground font-body">
          If you already know your room size, enter it manually below
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-sage-light rounded-2xl p-4 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm font-body text-foreground/80">
          Enter dimensions in feet. Height is optional and defaults to 9 ft.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border p-6 space-y-5 max-w-lg mx-auto"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="font-body text-sm">Room Length (ft) *</Label>
            <Input
              type="number"
              placeholder="e.g. 12"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="mt-1.5"
              min={1}
              step={0.5}
            />
          </div>
          <div>
            <Label className="font-body text-sm">Room Width (ft) *</Label>
            <Input
              type="number"
              placeholder="e.g. 10"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="mt-1.5"
              min={1}
              step={0.5}
            />
          </div>
        </div>

        <div>
          <Label className="font-body text-sm">Ceiling Height (ft)</Label>
          <Input
            type="number"
            placeholder="9"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1.5"
            min={7}
            max={20}
            step={0.5}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="font-body text-sm">Number of Doors</Label>
            <Input
              type="number"
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
              className="mt-1.5"
              min={0}
              max={5}
            />
          </div>
          <div>
            <Label className="font-body text-sm">Number of Windows</Label>
            <Input
              type="number"
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
              className="mt-1.5"
              min={0}
              max={10}
            />
          </div>
        </div>

        {/* Live preview */}
        {isValid && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-sage-light rounded-xl p-4 space-y-2"
          >
            <p className="text-sm font-semibold font-display text-primary">Calculated Dimensions</p>
            <div className="grid grid-cols-2 gap-2 text-sm font-body">
              <div>
                <span className="text-muted-foreground">Floor Area:</span>{" "}
                <span className="font-bold">{area} sq ft</span>
              </div>
              <div>
                <span className="text-muted-foreground">Wall Area:</span>{" "}
                <span className="font-bold">{wallArea} sq ft</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="flex justify-center">
        <Button
          variant="hero"
          size="lg"
          className="text-base px-8 py-6"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          <Ruler className="w-5 h-5 mr-2" />
          Generate Estimate
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ManualInputStep;
