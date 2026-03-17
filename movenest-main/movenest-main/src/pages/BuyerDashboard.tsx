import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Heart, ShoppingCart, IndianRupee, FileText, CreditCard, ArrowRight,
  Sofa, Bed, ChefHat,
} from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const savedFurniture = [
  { id: 1, title: "L-Shape Sofa Set", price: 18000, seller: "Rahul S.", icon: Sofa },
  { id: 2, title: "Queen Size Bed", price: 12000, seller: "Priya M.", icon: Bed },
  { id: 3, title: "Modular Kitchen Set", price: 35000, seller: "Amit K.", icon: ChefHat },
];

const projectEstimates = [
  { id: 1, room: "Living Room", services: ["Painting", "Flooring", "TV Unit"], total: 58000, date: "12 Mar 2026" },
  { id: 2, room: "Bedroom", services: ["False Ceiling", "Wardrobe", "Painting"], total: 72000, date: "10 Mar 2026" },
];

const emiPayments = [
  { id: 1, project: "Living Room Interior", total: 58000, paid: 24000, emiAmount: 4833, remaining: 7, nextDate: "1 Apr 2026" },
  { id: 2, project: "Bedroom Interior", total: 72000, paid: 12000, emiAmount: 5000, remaining: 12, nextDate: "1 Apr 2026" },
];

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState<"saved" | "estimates" | "emi">("saved");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display">Buyer Dashboard</h1>
            <p className="text-muted-foreground font-body">Manage your saved items, estimates, and payments</p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Saved Items", value: savedFurniture.length, icon: Heart },
              { label: "Estimates", value: projectEstimates.length, icon: FileText },
              { label: "Active EMIs", value: emiPayments.length, icon: CreditCard },
              { label: "Total Spent", value: fmt(36000), icon: IndianRupee },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-4 text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold font-display">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {([
              { key: "saved" as const, label: "Saved Furniture", icon: Heart },
              { key: "estimates" as const, label: "Project Estimates", icon: FileText },
              { key: "emi" as const, label: "EMI Payments", icon: CreditCard },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium border transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Saved Furniture */}
          {activeTab === "saved" && (
            <div className="space-y-3">
              {savedFurniture.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold font-display">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">Seller: {item.seller}</p>
                  </div>
                  <span className="font-bold font-display text-primary">{fmt(item.price)}</span>
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Buy
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Estimates */}
          {activeTab === "estimates" && (
            <div className="space-y-3">
              {projectEstimates.map((est, i) => (
                <motion.div
                  key={est.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl border border-border p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold font-display">{est.room}</h3>
                    <span className="text-lg font-bold font-display text-primary">{fmt(est.total)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {est.services.map((s) => (
                      <span key={s} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-body">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-body">Created on {est.date}</p>
                </motion.div>
              ))}
              <div className="text-center mt-4">
                <Button variant="hero" asChild>
                  <a href="/ai-room-measurement/tool">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Create New Estimate
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* EMI Payments */}
          {activeTab === "emi" && (
            <div className="space-y-4">
              {emiPayments.map((emi, i) => {
                const progress = (emi.paid / emi.total) * 100;
                return (
                  <motion.div
                    key={emi.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl border border-border p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold font-display">{emi.project}</h3>
                      <span className="text-sm font-body text-muted-foreground">
                        Next: {emi.nextDate}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm font-body">
                      <div>
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-bold font-display">{fmt(emi.total)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Paid</p>
                        <p className="font-bold font-display text-primary">{fmt(emi.paid)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Monthly EMI</p>
                        <p className="font-bold font-display">{fmt(emi.emiAmount)}/mo</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-body mt-2">
                      {emi.remaining} installments remaining
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuyerDashboard;
