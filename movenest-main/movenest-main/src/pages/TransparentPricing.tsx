import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import HowPricingWorks from "@/components/pricing/HowPricingWorks";
import PricingNote from "@/components/pricing/PricingNote";
import ServiceCard from "@/components/pricing/ServiceCard";
import { servicePricingData } from "@/data/pricingData";
import { ArrowRight } from "lucide-react";

const TransparentPricing = () => {
  const [area, setArea] = useState(120);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PricingHero />
      <HowPricingWorks />

      {/* Interactive Calculator */}
      <section id="calculator" className="py-16">
        <div className="container max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
            Service-wise Pricing Guide
          </h2>
          <p className="text-center text-muted-foreground font-body mb-10 max-w-2xl mx-auto">
            Select a finish tier for each service and adjust your room area to
            get instant cost estimates.
          </p>

          {/* Area slider */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-8 max-w-lg mx-auto">
            <label className="text-sm font-medium font-body text-muted-foreground mb-2 block">
              Room / Surface Area
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={20}
                max={500}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="flex-1 accent-[hsl(var(--primary))]"
              />
              <span className="font-bold font-display text-primary min-w-[90px] text-right">
                {area} sq ft
              </span>
            </div>
          </div>

          {/* Service cards grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {servicePricingData.map((service) => (
              <ServiceCard key={service.id} service={service} area={area} />
            ))}
          </div>
        </div>
      </section>

      <PricingNote />

      {/* Final CTA */}
      <section className="py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Plan Your Interior Budget{" "}
            <span className="text-primary">with Confidence</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
              <a href="#calculator">Get Instant Estimate</a>
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" asChild>
              <a href="/ai-room-measurement/tool">
                <ArrowRight className="w-5 h-5 mr-2" />
                Start Room Measurement
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TransparentPricing;
