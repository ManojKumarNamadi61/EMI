import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ValueProposition from "@/components/landing/ValueProposition";
import AIToolsSection from "@/components/landing/AIToolsSection";
import ServicesSection from "@/components/landing/ServicesSection";
import FurnitureMarketplace from "@/components/landing/FurnitureMarketplace";
import EMIPaymentSection from "@/components/landing/EMIPaymentSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <AIToolsSection />
      <ServicesSection />
      <FurnitureMarketplace />
      <EMIPaymentSection />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
