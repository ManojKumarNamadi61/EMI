import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Upload, Image, Wand2, ArrowRight, Sparkles, Tv, PanelTop, Frame, Lightbulb,
} from "lucide-react";

const categories = [
  { id: "tv-unit", label: "TV Unit", icon: Tv },
  { id: "wall-panel", label: "Wall Panel", icon: PanelTop },
  { id: "wall-decor", label: "Wall Decor", icon: Frame },
  { id: "lighting", label: "Lighting Design", icon: Lightbulb },
];

const mockSuggestions: Record<string, { title: string; description: string }[]> = {
  "tv-unit": [
    { title: "Modern Floating TV Unit", description: "Clean wall-mounted unit with hidden cable management and LED backlighting." },
    { title: "Wooden Panel TV Wall", description: "Full wall wooden panelling with integrated shelving and ambient lighting." },
    { title: "Minimal Open Shelf Unit", description: "Simple floating shelves with a minimalist TV mount and storage below." },
    { title: "LED Backlit Entertainment Center", description: "Contemporary entertainment wall with RGB lighting and glass accents." },
  ],
  "wall-panel": [
    { title: "3D Geometric Wall Panel", description: "Modern geometric patterns that add depth and visual interest." },
    { title: "Wooden Slat Panel", description: "Vertical wooden slats creating a warm, textured accent wall." },
    { title: "PVC Charcoal Panel", description: "Dark charcoal panels for a bold, industrial aesthetic." },
    { title: "Fabric Upholstered Panel", description: "Soft padded panels ideal for bedroom headboard walls." },
  ],
  "wall-decor": [
    { title: "Gallery Wall Layout", description: "Curated arrangement of frames and artwork for a personalized display." },
    { title: "Floating Shelf Display", description: "Wooden floating shelves with curated decor objects and plants." },
    { title: "Mirror Wall Feature", description: "Decorative mirror arrangement that enhances light and space." },
    { title: "Macramé & Textile Art", description: "Bohemian-inspired textile wall hangings for warmth and texture." },
  ],
  "lighting": [
    { title: "Cove Lighting Design", description: "Hidden LED strips in ceiling coves for ambient illumination." },
    { title: "Statement Pendant Cluster", description: "Group of pendant lights at varying heights for visual drama." },
    { title: "Wall Sconce Arrangement", description: "Symmetrical sconces flanking a mirror or artwork." },
    { title: "Track Lighting System", description: "Adjustable track lights to highlight art and architectural features." },
  ],
};

const AIWallDesign = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("tv-unit");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
      setShowResults(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const suggestions = mockSuggestions[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container text-center max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium font-body mb-6"
          >
            <Wand2 className="w-4 h-4 inline mr-1.5" />
            AI-Powered Design
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-display mb-4"
          >
            AI Wall Design <span className="text-accent">Suggestions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-body"
          >
            Upload a photo of your wall and get personalized interior design suggestions.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          {/* Upload area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            {!uploadedImage ? (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 transition-colors bg-card"
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-semibold font-display text-lg mb-2">Upload Wall Photo</p>
                <p className="text-sm text-muted-foreground font-body">
                  Click to upload or drag and drop a photo of your wall
                </p>
              </button>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-border">
                <img src={uploadedImage} alt="Uploaded wall" className="w-full h-64 object-cover" />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-body border border-border hover:bg-card"
                >
                  <Image className="w-4 h-4 inline mr-1" />
                  Change Photo
                </button>
              </div>
            )}
          </motion.div>

          {/* Category selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h3 className="font-semibold font-display mb-3 text-center">Select Design Category</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowResults(false);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-body font-medium border transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Analyze button */}
          {uploadedImage && (
            <div className="text-center mb-10">
              <Button
                variant="warm"
                size="lg"
                className="text-base px-8 py-6"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Wall...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Get Design Suggestions
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold font-display text-center mb-6">
                  <Sparkles className="w-6 h-6 inline text-accent mr-2" />
                  Suggested Designs for Your Wall
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {suggestions.map((s, i) => (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-primary/5 transition-all"
                    >
                      <div className="w-full h-32 bg-muted rounded-xl mb-4 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <h4 className="font-bold font-display mb-2">{s.title}</h4>
                      <p className="text-sm text-muted-foreground font-body mb-4">
                        {s.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href="/pricing">
                          Get Estimate <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!uploadedImage && (
            <div className="text-center text-muted-foreground font-body mt-8">
              <p>Upload a wall photo to get started with AI-powered design suggestions.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIWallDesign;
