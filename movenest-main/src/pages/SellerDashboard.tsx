import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Package, Edit, Trash2, CheckCircle, Eye, MessageSquare, IndianRupee,
  PlusCircle, Tag,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MockListing {
  id: number;
  title: string;
  price: number;
  status: "active" | "sold" | "draft";
  views: number;
  messages: number;
  daysAgo: number;
}

const initialListings: MockListing[] = [
  { id: 1, title: "2BHK Home Furniture Package", price: 55000, status: "active", views: 142, messages: 8, daysAgo: 3 },
  { id: 2, title: "L-Shape Sofa Set", price: 18000, status: "active", views: 89, messages: 5, daysAgo: 7 },
  { id: 3, title: "Double Bed with Storage", price: 12000, status: "sold", views: 210, messages: 12, daysAgo: 14 },
  { id: 4, title: "Samsung Refrigerator 260L", price: 9500, status: "active", views: 65, messages: 3, daysAgo: 2 },
  { id: 5, title: "Modular Kitchen Cabinet Set", price: 35000, status: "draft", views: 0, messages: 0, daysAgo: 1 },
];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const statusColors: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  sold: "bg-accent/10 text-accent",
  draft: "bg-muted text-muted-foreground",
};

const SellerDashboard = () => {
  const [listings, setListings] = useState(initialListings);
  const [filter, setFilter] = useState<"all" | "active" | "sold" | "draft">("all");

  const filtered = filter === "all" ? listings : listings.filter((l) => l.status === filter);
  const totalRevenue = listings.filter((l) => l.status === "sold").reduce((s, l) => s + l.price, 0);
  const activeCount = listings.filter((l) => l.status === "active").length;
  const soldCount = listings.filter((l) => l.status === "sold").length;

  const markAsSold = (id: number) => {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status: "sold" as const } : l)));
    toast({ title: "Marked as Sold", description: "Listing has been marked as sold." });
  };

  const deleteListing = (id: number) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    toast({ title: "Deleted", description: "Listing has been removed." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display">Seller Dashboard</h1>
              <p className="text-muted-foreground font-body">Manage your furniture listings</p>
            </div>
            <Button variant="hero" asChild>
              <a href="/furniture">
                <PlusCircle className="w-5 h-5 mr-2" />
                New Listing
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Active Listings", value: activeCount, icon: Package },
              { label: "Sold Items", value: soldCount, icon: CheckCircle },
              { label: "Total Revenue", value: fmt(totalRevenue), icon: IndianRupee },
              { label: "Total Messages", value: listings.reduce((s, l) => s + l.messages, 0), icon: MessageSquare },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-4 text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold font-display">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6">
            {(["all", "active", "sold", "draft"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium border capitalize transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Listings */}
          <div className="space-y-3">
            {filtered.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold font-display">{listing.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-body capitalize ${statusColors[listing.status]}`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
                    <span className="font-bold text-foreground">{fmt(listing.price)}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{listing.views} views</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{listing.messages} msgs</span>
                    <span>{listing.daysAgo}d ago</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {listing.status === "active" && (
                    <Button variant="outline" size="sm" onClick={() => markAsSold(listing.id)}>
                      <Tag className="w-4 h-4 mr-1" />
                      Mark Sold
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteListing(listing.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground font-body">
              No listings found for this filter.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
