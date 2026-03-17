import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Wallet, IndianRupee, ArrowRight, Home, ChefHat, Bed, Sofa, Bath,
} from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const roomAllocations = [
  { key: "living", label: "Living Room", icon: Sofa, percent: 25 },
  { key: "bedroom", label: "Bedroom", icon: Bed, percent: 20 },
  { key: "kitchen", label: "Kitchen", icon: ChefHat, percent: 30 },
  { key: "bathroom", label: "Bathroom", icon: Bath, percent: 15 },
  { key: "other", label: "Other Areas", icon: Home, percent: 10 },
];

const BudgetPlanner = () => {
  const [budget, setBudget] = useState(200000);
  const [allocations, setAllocations] = useState(
    roomAllocations.map((r) => ({ ...r }))
  );

  const updatePercent = (key: string, val: number) => {
    setAllocations((prev) =>
      prev.map((a) => (a.key === key ? { ...a, percent: val } : a))
    );
  };

  const totalPercent = allocations.reduce((s, a) => s + a.percent, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="container text-center max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium font-body mb-6"
          >
            <Wallet className="w-4 h-4 inline mr-1.5" />
            Smart Budget Planning
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-display mb-4"
          >
            Plan Your Interior <span className="text-primary">Within Budget</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-body"
          >
            Set your total budget and get smart room-wise allocation suggestions.
          </motion.p>
        </div>
      </section>

      {/* Budget Input */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="bg-card rounded-2xl border border-border p-6 mb-8">
            <label className="text-sm font-medium font-body text-muted-foreground mb-2 block">
              Your Total Interior Budget
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={50000}
                max={2000000}
                step={10000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="flex-1 accent-[hsl(var(--primary))]"
              />
              <span className="font-bold font-display text-primary min-w-[140px] text-right text-xl">
                {fmt(budget)}
              </span>
            </div>
          </div>

          {/* Room-wise allocation */}
          <h2 className="text-2xl font-bold font-display mb-6 text-center">
            Room-wise Budget Allocation
          </h2>

          {totalPercent !== 100 && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-3 mb-4 text-center text-sm font-body text-accent">
              Total allocation is {totalPercent}% — adjust to reach 100%
            </div>
          )}

          <div className="space-y-4">
            {allocations.map((room, i) => {
              const amount = Math.round((room.percent / 100) * budget);
              const Icon = room.icon;
              return (
                <motion.div
                  key={room.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-2xl border border-border p-5"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold font-display">{room.label}</h3>
                        <span className="text-lg font-bold font-display text-primary">
                          {fmt(amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={60}
                      value={room.percent}
                      onChange={(e) => updatePercent(room.key, Number(e.target.value))}
                      className="flex-1 accent-[hsl(var(--primary))]"
                    />
                    <span className="text-sm font-bold font-body text-muted-foreground min-w-[40px] text-right">
                      {room.percent}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(room.percent / 60) * 100}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-sage-light rounded-2xl border border-border p-6 mt-8"
          >
            <h3 className="text-lg font-bold font-display mb-4 text-center">Budget Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allocations.map((room) => {
                const amount = Math.round((room.percent / 100) * budget);
                return (
                  <div key={room.key} className="bg-card rounded-xl p-3 text-center border border-border">
                    <p className="text-xs text-muted-foreground font-body">{room.label}</p>
                    <p className="font-bold font-display text-primary">{fmt(amount)}</p>
                  </div>
                );
              })}
              <div className="bg-primary rounded-xl p-3 text-center">
                <p className="text-xs text-primary-foreground/80 font-body">Total Budget</p>
                <p className="font-bold font-display text-primary-foreground">{fmt(budget)}</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
              <a href="/pricing">
                <IndianRupee className="w-5 h-5 mr-2" />
                Get Detailed Pricing
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" asChild>
              <a href="/ai-room-measurement/tool">
                <ArrowRight className="w-5 h-5 mr-2" />
                Measure Your Room
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BudgetPlanner;
