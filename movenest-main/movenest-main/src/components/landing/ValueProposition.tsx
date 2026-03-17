import { motion } from "framer-motion";
import { Ruler, DollarSign, CreditCard, ShoppingBag } from "lucide-react";

const features = [
  {
    icon: Ruler,
    title: "AI Room Measurement Tool",
    description: "Measure your room instantly using AI technology.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Get instant and accurate cost estimates.",
  },
  {
    icon: CreditCard,
    title: "Flexible EMI Payments",
    description: "Pay monthly instead of paying the full amount upfront.",
  },
  {
    icon: ShoppingBag,
    title: "Furniture Marketplace",
    description: "Buy affordable furniture directly from the platform.",
  },
];

const ValueProposition = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EMI?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Everything you need to transform your space, made simple and affordable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-[#E6FF4D]/2 border border-border hover:shadow-lg hover:shadow-primary/2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-black/5 backdrop-blur-md flex items-center justify-center mx-auto mb-5 group-hover:bg-[#E6FF4D] group-hover:text-black-foreground transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-black group-hover:text-black" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display">{feature.title}</h3>
              <p className="text-muted-foreground text-sm font-body">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
