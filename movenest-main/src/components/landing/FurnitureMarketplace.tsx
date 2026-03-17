import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sofa, UtensilsCrossed, DoorOpen, Tv, BedDouble, Briefcase } from "lucide-react";

const categories = [
  { icon: Sofa, name: "Sofas" },
  { icon: UtensilsCrossed, name: "Dining Tables" },
  { icon: DoorOpen, name: "Wardrobes" },
  { icon: Tv, name: "TV Units" },
  { icon: BedDouble, name: "Beds" },
  { icon: Briefcase, name: "Office Furniture" },
];

const features = [
  "Buy affordable furniture",
  "Perfect for middle-class budgets",
  "Compatible with your interior design plans",
  "Verified quality products",
];

const FurnitureMarketplace = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-accent/10 text-accent text-sm font-medium">
              Marketplace
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Affordable Furniture for Every Home</h2>
            <p className="text-muted-foreground text-lg mb-8 font-body">
              Explore our curated marketplace for budget-friendly and stylish furniture designed for modern homes.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-foreground font-body">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="warm" size="lg" className="px-8">
              Explore Furniture Marketplace
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-warm-light flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <cat.icon className="w-7 h-7 text-accent" />
                </div>
                <span className="text-sm font-medium font-body">{cat.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureMarketplace;
