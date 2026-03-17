import { motion } from "framer-motion";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const steps = [
  { step: "1", title: "Measure Room", desc: "Use AI Room Measurement Tool" },
  { step: "2", title: "System Calculates Area", desc: "Room area computed automatically" },
  { step: "3", title: "Select Services", desc: "Pick services & finish level" },
  { step: "4", title: "See Estimate", desc: "Area × rate = instant cost" },
];

const HowPricingWorks = () => (
  <section className="py-16 bg-sage-light">
    <div className="container max-w-5xl">
      <motion.h2
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold font-display text-center mb-4"
      >
        How the Estimate System Works
      </motion.h2>
      <p className="text-center text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
        AI-powered measurement and smart pricing algorithms generate instant
        cost estimates.
      </p>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 text-center border border-border"
          >
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold font-display">
              {s.step}
            </div>
            <h3 className="font-semibold font-display mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowPricingWorks;
