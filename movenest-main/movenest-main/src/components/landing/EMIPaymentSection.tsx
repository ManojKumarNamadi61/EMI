import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";

const benefits = [
  "Low upfront cost",
  "Flexible payment options",
  "Budget-friendly solutions",
];

const EMIPaymentSection = () => {
  return (
    <section className="py-20 bg-sage-light">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Flexible Payments
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interior Projects Made Affordable</h2>
            <p className="text-muted-foreground text-lg mb-8 font-body">
              With our flexible EMI plans, you can design your dream home without paying the full cost upfront.
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 font-body">
                  <Check className="w-5 h-5 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <Button variant="hero" size="lg" className="px-8">
              Check EMI Plans
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-3xl p-8 border border-border shadow-xl shadow-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">Interior Project Cost</p>
                  <p className="text-2xl font-bold font-display">₹3,00,000</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground font-body">12 months</p>
                      <p className="text-xl font-bold font-display">₹25,000<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Popular</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground font-body">24 months</p>
                      <p className="text-xl font-bold font-display">₹12,500<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">Budget Friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EMIPaymentSection;
