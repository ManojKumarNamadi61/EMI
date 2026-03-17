import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw, Info } from "lucide-react";

interface CameraScanStepProps {
  onCapture: (imageDataUrl: string) => void;
}

const CameraScanStep = ({ onCapture }: CameraScanStepProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsReady(true);
      }
    } catch {
      setCameraError("Camera access denied. Please allow camera permissions and try again.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    stream?.getTracks().forEach((t) => t.stop());
    onCapture(dataUrl);
  };

  const useDemoImage = () => {
    // Generate a simple placeholder for demo
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Draw a simple room representation
    ctx.fillStyle = "#f5f0eb";
    ctx.fillRect(0, 0, 800, 600);
    ctx.fillStyle = "#e8e0d8";
    ctx.fillRect(50, 50, 700, 500);
    ctx.strokeStyle = "#8b7355";
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 700, 500);
    // Floor line
    ctx.beginPath();
    ctx.moveTo(50, 400);
    ctx.lineTo(750, 400);
    ctx.stroke();
    // Door
    ctx.fillStyle = "#a0522d";
    ctx.fillRect(600, 250, 80, 150);
    // Window
    ctx.fillStyle = "#87ceeb";
    ctx.fillRect(200, 100, 150, 100);
    ctx.strokeRect(200, 100, 150, 100);
    ctx.beginPath();
    ctx.moveTo(275, 100);
    ctx.lineTo(275, 200);
    ctx.stroke();
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    onCapture(dataUrl);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Scan Your Room</h2>
        <p className="text-muted-foreground font-body">
          Point your camera at the room and capture a photo
        </p>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-sage-light rounded-2xl p-4 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm font-body text-foreground/80 space-y-1">
          <p>• Stand in a corner of the room for best results</p>
          <p>• Ensure the entire wall is visible</p>
          <p>• Keep your phone steady while capturing</p>
        </div>
      </motion.div>

      {/* Camera View */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative rounded-2xl overflow-hidden bg-foreground/5 aspect-video border-2 border-dashed border-border"
      >
        {cameraError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <Camera className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground font-body mb-4">{cameraError}</p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={startCamera}>
                <RotateCcw className="w-4 h-4 mr-1" /> Retry
              </Button>
              <Button variant="hero" size="sm" onClick={useDemoImage}>
                Use Demo Image
              </Button>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Scan guide overlay */}
            {isReady && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Corner guides */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/60 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/60 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />
                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-[2px] bg-primary/40" />
                  <div className="w-[2px] h-8 bg-primary/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!cameraError && (
          <Button
            variant="hero"
            size="lg"
            onClick={capturePhoto}
            disabled={!isReady}
            className="text-base px-8 py-6"
          >
            <Camera className="w-5 h-5 mr-2" />
            Capture Room
          </Button>
        )}
        <Button
          variant="heroOutline"
          size="lg"
          onClick={useDemoImage}
          className="text-base px-8 py-6"
        >
          Use Demo Instead
        </Button>
      </div>
    </div>
  );
};

export default CameraScanStep;
