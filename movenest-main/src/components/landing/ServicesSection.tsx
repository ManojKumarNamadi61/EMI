import { motion } from "framer-motion";
import {
  Layers, Paintbrush, Image, Frame, Armchair, Cloud,
  ChefHat, DoorOpen, Hammer, Zap, Droplets, Bath,
  Lightbulb, GlassWater, Blinds, Star, Tv,
} from "lucide-react";

const services = [
  { icon: Layers, name: "Flooring" },
  { icon: Paintbrush, name: "Painting" },
  { icon: Image, name: "Wallpapers" },
  { icon: Frame, name: "Wall Décor & Artworks" },
  { icon: Armchair, name: "Furniture" },
  { icon: Cloud, name: "False Ceiling" },
  { icon: ChefHat, name: "Modular Kitchens" },
  { icon: DoorOpen, name: "Wardrobes & Storage" },
  { icon: Hammer, name: "Wood Works" },
  { icon: Zap, name: "Electrical Works" },
  { icon: Droplets, name: "Plumbing Works" },
  { icon: Bath, name: "Bathroom & Sanitary" },
  { icon: Lightbulb, name: "Lighting Design" },
  { icon: GlassWater, name: "Glass & Aluminium" },
  { icon: Blinds, name: "Curtains & Blinds" },
  { icon: Star, name: "Pooja Units" },
  { icon: Tv, name: "TV Units" },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Interior Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Select a service to choose a design style and get an instant estimate.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <motion.button
              key={service.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-sage-light flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-center leading-tight font-body">{service.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
