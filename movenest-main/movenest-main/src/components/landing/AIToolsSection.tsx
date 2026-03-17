import { motion } from "framer-motion";
import { Camera, Calculator, Wallet, Maximize } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: Camera,
    title: "AI Room Measurement",
    description: "Measure room dimensions quickly using your mobile camera.",
    link: "/ai-room-measurement",
  },
  {
    icon: Calculator,
    title: "Instant Interior Cost Estimator",
    description: "Get pricing for your selected services instantly.",
  },
  {
    icon: Wallet,
    title: "Budget-Based Interior Planner",
    description: "Plan interiors based on your budget and priorities.",
  },
  {
    icon: Maximize,
    title: "AI Furniture Fit Checker",
    description: "Check if furniture fits perfectly in your room.",
  },
];

const AIToolsSection = () => {
  return (
    <section className="py-20 bg-sage-light">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
              <span className="inline-flex w-2 h-2 rounded-full bg-primary" />
              <span className="font-body">Powered by AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Smart Technology for Smarter Interiors
            </h2>
            <p className="text-muted-foreground text-lg font-body leading-relaxed">
              Our platform uses advanced AI tools to simplify interior planning.
            </p>
          </motion.div>

          <div className="space-y-5">
            {tools.map((tool, index) => {
              const number = String(index + 1).padStart(3, "0");
              const CardInner = (
                <div className="flex items-start gap-5 p-7 rounded-2xl bg-card border border-border hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <tool.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold mb-1 font-display">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70 shrink-0 pt-1">
                    [{number}]
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  {tool.link ? (
                    <Link to={tool.link} className="block">
                      {CardInner}
                    </Link>
                  ) : (
                    CardInner
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
