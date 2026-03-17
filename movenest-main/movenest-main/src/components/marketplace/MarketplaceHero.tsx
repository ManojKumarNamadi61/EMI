import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, PlusCircle, Sofa, BedDouble, UtensilsCrossed, Refrigerator } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

interface Props {
  onBrowse: () => void;
  onSell: () => void;
}

const MarketplaceHero = ({ onBrowse, onSell }: Props) => (
  <section className="pt-28 pb-16 md:pt-36 md:pb-24">
    <div className="container">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.span
            variants={fade}
            initial="hidden"
            animate="visible"
            className="inline-block px-4 py-1.5 rounded-full bg-sage-light text-primary text-sm font-medium font-body mb-6"
          >
            <ShoppingCart className="w-4 h-4 inline mr-1.5" />
            Buy & Sell Marketplace
          </motion.span>
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6"
          >
            Buy or Sell Furniture Easily{" "}
            <span className="text-primary">When Moving Homes</span>
          </motion.h1>
          <motion.p
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-body mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Moving to a new home? Instead of selling your furniture outside or leaving it behind, list it on our platform. Buyers can explore affordable furniture packages or individual items.
          </motion.p>
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button variant="hero" size="lg" className="text-base px-8 py-6" onClick={onBrowse}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Browse Furniture
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" onClick={onSell}>
              <PlusCircle className="w-5 h-5 mr-2" />
              Sell Your Furniture
            </Button>
          </motion.div>
        </div>

        {/* Visual package preview */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="flex-1 max-w-md w-full"
        >
          <div className="bg-card rounded-3xl border border-border p-6 shadow-lg">
            <p className="text-xs font-body text-muted-foreground mb-2">Example Package</p>
            <h3 className="font-display font-bold text-lg mb-4">2BHK Furniture Package</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { icon: Sofa, label: "Sofa Set" },
                { icon: BedDouble, label: "Double Bed" },
                { icon: UtensilsCrossed, label: "Dining Table" },
                { icon: Refrigerator, label: "Refrigerator" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 bg-sage-light rounded-xl px-3 py-2.5">
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-body font-medium">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-2xl font-bold font-display text-primary">₹55,000</span>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-body font-medium">Like New</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MarketplaceHero;
