import { motion } from "framer-motion";
import { ClipboardList, Camera, Calculator, Palette, CreditCard } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Select your interior service", step: "01" },
  { icon: Camera, title: "Measure your room using AI", step: "02" },
  { icon: Calculator, title: "Get an instant price estimate", step: "03" },
  { icon: Palette, title: "Choose furniture and design style", step: "04" },
  { icon: CreditCard, title: "Start your project with EMI payment", step: "05" },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple 5-Step Process</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            From planning to execution, we make it effortless.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-1 relative"
            >
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border hover:shadow-md transition-all">
                <span className="text-xs font-bold text-primary mb-3 font-body">STEP {step.step}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium font-body leading-snug">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
