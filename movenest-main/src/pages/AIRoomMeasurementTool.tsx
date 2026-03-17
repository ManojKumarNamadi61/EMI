import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CameraScanStep from "@/components/measurement/CameraScanStep";
import ManualInputStep from "@/components/measurement/ManualInputStep";
import ProcessingStep, { type RoomMeasurements } from "@/components/measurement/ProcessingStep";
import MeasurementResultStep from "@/components/measurement/MeasurementResultStep";
import EstimateStep from "@/components/measurement/EstimateStep";
import { Camera, Pencil } from "lucide-react";

type Step = "choose" | "scan" | "manual" | "processing" | "results" | "estimate";

const stepLabels: { key: Step; label: string }[] = [
  { key: "choose", label: "Input" },
  { key: "processing", label: "Analyze" },
  { key: "results", label: "Review" },
  { key: "estimate", label: "Estimate" },
];

const AIRoomMeasurementTool = () => {
  const [step, setStep] = useState<Step>("choose");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<RoomMeasurements | null>(null);

  const handleCapture = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
    setStep("processing");
  };

  const handleProcessingComplete = useCallback((m: RoomMeasurements) => {
    setMeasurements(m);
    setStep("results");
  }, []);

  const handleManualSubmit = (m: RoomMeasurements) => {
    setMeasurements(m);
    setStep("estimate");
  };

  const handleConfirm = (m: RoomMeasurements) => {
    setMeasurements(m);
    setStep("estimate");
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setMeasurements(null);
    setStep("choose");
  };

  const handleBackToResults = () => {
    setStep("results");
  };

  const getStepIndex = () => {
    if (step === "choose" || step === "scan" || step === "manual") return 0;
    if (step === "processing") return 1;
    if (step === "results") return 2;
    return 3;
  };

  const currentStepIndex = getStepIndex();

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-24 pb-20">
        <div className="container max-w-4xl">
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-10"
          >
            {stepLabels.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body transition-colors ${
                    i <= currentStepIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`mx-2 text-xs font-body hidden sm:inline ${
                    i <= currentStepIndex ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {i < stepLabels.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mx-1 transition-colors ${
                      i < currentStepIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Choose input method */}
          {step === "choose" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">How would you like to measure?</h2>
                <p className="text-muted-foreground font-body">Choose AI camera scan or enter dimensions manually</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => setStep("scan")}
                  className="bg-card rounded-2xl border-2 border-border p-8 text-center hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Camera className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold font-display mb-2">AI Camera Scan</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Point your phone camera at the room for automatic measurement
                  </p>
                </button>
                <button
                  onClick={() => setStep("manual")}
                  className="bg-card rounded-2xl border-2 border-border p-8 text-center hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Pencil className="w-8 h-8 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-bold font-display mb-2">Manual Input</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Enter room dimensions manually if you already know them
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step content */}
          {step === "scan" && <CameraScanStep onCapture={handleCapture} />}
          {step === "manual" && <ManualInputStep onSubmit={handleManualSubmit} />}
          {step === "processing" && capturedImage && (
            <ProcessingStep image={capturedImage} onComplete={handleProcessingComplete} />
          )}
          {step === "results" && capturedImage && measurements && (
            <MeasurementResultStep
              image={capturedImage}
              measurements={measurements}
              onConfirm={handleConfirm}
              onRetake={handleRetake}
            />
          )}
          {step === "estimate" && measurements && (
            <EstimateStep
              measurements={measurements}
              onBack={handleBackToResults}
              onStartOver={handleRetake}
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIRoomMeasurementTool;
