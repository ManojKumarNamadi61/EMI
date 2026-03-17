import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Calculator } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const PricingHero = () => (
  <section className="pt-28 pb-16 md:pt-36 md:pb-24">
    <div className="container text-center max-w-3xl">
      <motion.span
        variants={fade}
        initial="hidden"
        animate="visible"
        className="inline-block px-4 py-1.5 rounded-full bg-sage-light text-primary text-sm font-medium font-body mb-6"
      >
        <Eye className="w-4 h-4 inline mr-1.5" />
        100% Transparent Pricing
      </motion.span>
      <motion.h1
        variants={fade}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6"
      >
        Interior Services{" "}
        <span className="text-primary">Pricing Guide</span>
      </motion.h1>
      <motion.p
        variants={fade}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto"
      >
        Approximate starting costs per square foot depending on material quality
        and finish level. No hidden charges. No surprises.
      </motion.p>
      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
          <a href="#calculator">
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Your Estimate
          </a>
        </Button>
        <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" asChild>
          <a href="/ai-room-measurement/tool">Measure Your Room with AI</a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default PricingHero;
