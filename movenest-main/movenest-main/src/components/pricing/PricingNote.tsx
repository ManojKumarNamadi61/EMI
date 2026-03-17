import { motion } from "framer-motion";
import { Shield, Info } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const PricingNote = () => (
  <section className="py-16 bg-sage-light">
    <div className="container max-w-3xl text-center">
      <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Pricing Transparency Note
        </h2>
        <p className="text-muted-foreground font-body mb-6 max-w-xl mx-auto">
          All prices shown are approximate estimates based on standard materials
          and installation costs. Final pricing may vary depending on:
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {["Design complexity", "Material upgrades", "Site conditions"].map(
            (item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full text-sm font-body border border-border"
              >
                <Info className="w-4 h-4 text-primary" />
                {item}
              </span>
            )
          )}
        </div>
      </motion.div>
    </div>
  </section>
);

export default PricingNote;
