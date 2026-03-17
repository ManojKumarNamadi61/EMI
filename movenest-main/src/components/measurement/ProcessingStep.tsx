import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, Layers, Ruler, CheckCircle } from "lucide-react";

interface ProcessingStepProps {
  image: string;
  onComplete: (measurements: RoomMeasurements) => void;
}

export interface RoomMeasurements {
  width: number;
  length: number;
  height: number;
  area: number;
  wallArea: number;
  doors: number;
  windows: number;
}

const processingStages = [
  { icon: ScanLine, label: "Analyzing image...", duration: 1200 },
  { icon: Layers, label: "Detecting walls & edges...", duration: 1400 },
  { icon: Ruler, label: "Calculating dimensions...", duration: 1000 },
  { icon: CheckCircle, label: "Measurement complete!", duration: 800 },
];

const ProcessingStep = ({ image, onComplete }: ProcessingStepProps) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const runStages = (stage: number) => {
      if (stage >= processingStages.length) {
        // Generate simulated measurements
        const width = +(8 + Math.random() * 6).toFixed(1);
        const length = +(10 + Math.random() * 6).toFixed(1);
        const height = +(8.5 + Math.random() * 1.5).toFixed(1);
        const area = +(width * length).toFixed(0);
        const wallArea = +(2 * (width + length) * height).toFixed(0);
        const doors = Math.random() > 0.5 ? 2 : 1;
        const windows = 1 + Math.floor(Math.random() * 2);

        onComplete({ width, length, height, area: +area, wallArea: +wallArea, doors, windows });
        return;
      }
      setCurrentStage(stage);
      timeout = setTimeout(() => runStages(stage + 1), processingStages[stage].duration);
    };

    runStages(0);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  const progress = ((currentStage + 1) / processingStages.length) * 100;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">AI Processing</h2>
        <p className="text-muted-foreground font-body">Analyzing your room dimensions...</p>
      </motion.div>

      {/* Image with scan overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-2xl overflow-hidden border border-border max-w-lg mx-auto"
      >
        <img src={image} alt="Room scan" className="w-full h-auto" />
        {/* Scanning line animation */}
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Overlay grid */}
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      </motion.div>

      {/* Progress */}
      <div className="max-w-sm mx-auto space-y-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {processingStages.map(
            (stage, i) =>
              i === currentStage && (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2 text-sm font-body text-muted-foreground"
                >
                  <stage.icon className="w-4 h-4 text-primary animate-pulse" />
                  {stage.label}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProcessingStep;
