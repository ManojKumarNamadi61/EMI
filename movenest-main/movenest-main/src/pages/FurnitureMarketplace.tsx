import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import MarketplaceTabs, { type MarketplaceTab } from "@/components/marketplace/MarketplaceTabs";
import ListingFilters, { priceRanges } from "@/components/marketplace/ListingFilters";
import ListingCard from "@/components/marketplace/ListingCard";
import ListingDetailModal from "@/components/marketplace/ListingDetailModal";
import SellFurnitureModal from "@/components/marketplace/SellFurnitureModal";
import { allListings, furniturePackages, individualItems, type FurnitureListing } from "@/data/marketplaceData";
import { ShoppingCart, PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const FurnitureMarketplace = () => {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>("packages");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");
  const [city, setCity] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const [detailId, setDetailId] = useState<number | null>(null);
  const [sellOpen, setSellOpen] = useState(false);

  const filtered = useMemo(() => {
    let base: FurnitureListing[];

    switch (activeTab) {
      case "packages":
        base = furniturePackages;
        break;
      case "individual":
        base = individualItems;
        break;
      case "recent":
        base = [...allListings].sort((a, b) => a.daysAgo - b.daysAgo);
        break;
      case "deals":
        base = allListings.filter((l) => l.price <= 15000);
        break;
      case "nearby":
        base = allListings.filter((l) => l.location === "Mumbai");
        break;
      default:
        base = allListings;
    }

    const pr = priceRanges.find((p) => p.label === priceRange)!;

    return base.filter((l) => {
      if (category !== "All" && l.category !== category) return false;
      if (condition !== "All" && l.condition !== condition) return false;
      if (city !== "All" && l.location !== city) return false;
      if (l.price < pr.min || l.price > pr.max) return false;
      if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [activeTab, search, category, condition, city, priceRange]);

  const detailListing = detailId ? allListings.find((l) => l.id === detailId) ?? null : null;

  const handleContact = (id: number) => {
    toast({ title: "Message Sent", description: "Your inquiry has been sent to the seller." });
  };

  const scrollToBrowse = () => {
    document.getElementById("browse-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <MarketplaceHero onBrowse={scrollToBrowse} onSell={() => setSellOpen(true)} />

      <div id="browse-section">
        <MarketplaceTabs active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Filters + Listings */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6">
            <ListingFilters
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              condition={condition}
              onConditionChange={setCondition}
              city={city}
              onCityChange={setCity}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />

            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-body mb-4">
                {filtered.length} listing{filtered.length !== 1 && "s"} found
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((listing, i) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    index={i}
                    onViewDetails={setDetailId}
                    onContact={handleContact}
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground font-body">
                  No listings match your filters. Try adjusting your selection.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-sage-light">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Find Affordable Furniture or{" "}
            <span className="text-primary">Sell Yours Easily</span>
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            Whether you're moving in or moving out, our marketplace connects buyers and sellers for the best furniture deals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-8 py-6" onClick={scrollToBrowse}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Browse Furniture
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" onClick={() => setSellOpen(true)}>
              <PlusCircle className="w-5 h-5 mr-2" />
              Sell Furniture
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <ListingDetailModal listing={detailListing} open={!!detailId} onClose={() => setDetailId(null)} />
      <SellFurnitureModal open={sellOpen} onClose={() => setSellOpen(false)} />
    </div>
  );
};

export default FurnitureMarketplace;
