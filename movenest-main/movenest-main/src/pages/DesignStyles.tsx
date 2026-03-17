import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Paintbrush, CheckCircle, ArrowRight } from "lucide-react";

const designStyles = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean lines, neutral tones, and sleek finishes with functional furniture.",
    colors: ["hsl(0 0% 95%)", "hsl(0 0% 20%)", "hsl(142 25% 40%)", "hsl(30 20% 88%)"],
    features: ["Minimalist furniture", "Neutral palette", "Sleek hardware", "Open layouts"],
    priceMultiplier: 1.0,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Less is more. Focused on essentials with maximum negative space and light.",
    colors: ["hsl(0 0% 100%)", "hsl(0 0% 85%)", "hsl(0 0% 40%)", "hsl(40 33% 97%)"],
    features: ["Essential furniture only", "White & light tones", "Hidden storage", "Natural light focus"],
    priceMultiplier: 0.85,
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Rich wood tones, ornate details, and classic Indian design elements.",
    colors: ["hsl(25 60% 55%)", "hsl(30 50% 30%)", "hsl(40 60% 70%)", "hsl(18 50% 50%)"],
    features: ["Carved woodwork", "Rich fabrics", "Classic patterns", "Warm tones"],
    priceMultiplier: 1.15,
  },
  {
    id: "contemporary",
    name: "Contemporary",
    description: "Bold accents, mixed materials, and trendy design elements for a fresh look.",
    colors: ["hsl(210 30% 50%)", "hsl(0 0% 30%)", "hsl(45 80% 60%)", "hsl(0 0% 90%)"],
    features: ["Bold accent walls", "Mixed materials", "Statement lighting", "Artistic elements"],
    priceMultiplier: 1.1,
  },
];

const DesignStyles = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container text-center max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium font-body mb-6"
          >
            <Paintbrush className="w-4 h-4 inline mr-1.5" />
            Design Inspiration
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-display mb-4"
          >
            Choose Your <span className="text-primary">Design Style</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-body"
          >
            Select a style that matches your taste. This will customize your cost estimates and design suggestions.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {designStyles.map((style, i) => (
              <motion.button
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(style.id)}
                className={`text-left rounded-2xl border-2 p-6 transition-all ${
                  selected === style.id
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-display">{style.name}</h3>
                  {selected === style.id && (
                    <CheckCircle className="w-6 h-6 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  {style.description}
                </p>

                {/* Color palette */}
                <div className="flex gap-2 mb-4">
                  {style.colors.map((color, ci) => (
                    <div
                      key={ci}
                      className="w-8 h-8 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {style.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-body"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-body text-muted-foreground">
                  Price factor:{" "}
                  <span className="font-bold text-foreground">
                    {style.priceMultiplier < 1
                      ? `${Math.round((1 - style.priceMultiplier) * 100)}% below standard`
                      : style.priceMultiplier === 1
                      ? "Standard pricing"
                      : `${Math.round((style.priceMultiplier - 1) * 100)}% above standard`}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-4 justify-center mt-10"
            >
              <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
                <a href="/pricing">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get {designStyles.find((s) => s.id === selected)?.name} Estimate
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" asChild>
                <a href="/ai-wall-design">
                  <Paintbrush className="w-5 h-5 mr-2" />
                  Try AI Wall Design
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DesignStyles;
