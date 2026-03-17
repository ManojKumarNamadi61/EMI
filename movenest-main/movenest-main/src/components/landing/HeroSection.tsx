import { motion } from "framer-motion";
import heroImage from "@/assets/hero-interior.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern living room with AI measurement overlay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm border border-primary-foreground/20">
            AI-Powered Interior Design
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-6">
            Design Your Dream Home Without Financial Stress
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 font-body leading-relaxed max-w-xl">
            Easy Move-in Interiors (EMI) helps you plan, design, and execute interior projects with AI-powered tools, instant cost estimates, flexible EMI payments, and affordable furniture options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
  {/* Yellow Button */}
  <Button
    variant="warm"
    size="lg"
    className="text-base px-8 py-6 rounded-full bg-[#E6FF4D] text-black hover:bg-[#d8ef3f] shadow-lg"
  >
    Get Instant Estimate
  </Button>

  {/* Dark Button */}
  <Button
  variant="heroOutline"
  size="lg"
  className="text-base px-8 py-6 rounded-full bg-black/10 backdrop-blur-md text-white hover:bg-black/60 border border-white/20 shadow-lg"
>
  Explore Furniture Marketplace
</Button>
</div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
