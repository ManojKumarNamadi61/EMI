import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  IndianRupee,
  Calculator,
  CheckCircle,
  ArrowRight,
  Home,
  Wallet,
  CreditCard,
  Clock,
  BadgeCheck,
} from "lucide-react";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const emiPlans = [
  { months: 6, interest: 0 },
  { months: 12, interest: 5 },
  { months: 24, interest: 8 },
];

const roomEMIs = [
  { room: "Kitchen Interior", emi: 5000 },
  { room: "Bedroom Wardrobe", emi: 3000 },
  { room: "Living Room TV Unit", emi: 2500 },
  { room: "Bathroom Renovation", emi: 2000 },
];

const FlexibleEMI = () => {
  const [projectCost, setProjectCost] = useState(300000);
  const [selectedPlan, setSelectedPlan] = useState(12);

  // Eligibility
  const [income, setIncome] = useState("");
  const [empType, setEmpType] = useState("salaried");
  const [showEligibility, setShowEligibility] = useState(false);

  const plan = emiPlans.find((p) => p.months === selectedPlan)!;
  const totalPayable = Math.round(projectCost * (1 + plan.interest / 100));
  const monthlyEMI = Math.round(totalPayable / plan.months);
  const processingFee = Math.round(projectCost * 0.02);

  const eligibleBudget = income ? Math.round(Number(income) * 0.4 * 24) : 0;
  const suggestedEMI = income ? Math.round(Number(income) * 0.4) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container text-center max-w-3xl">
          <motion.span
            variants={fade}
            initial="hidden"
            animate="visible"
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium font-body mb-6"
          >
            <Wallet className="w-4 h-4 inline mr-1.5" />
            0% Interest Available
          </motion.span>
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6"
          >
            Design Your Dream Home with{" "}
            <span className="text-accent">Easy Monthly Payments</span>
          </motion.h1>
          <motion.p
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto"
          >
            Complete your interior project today and pay in convenient monthly
            installments. Flexible plans from 6 to 24 months.
          </motion.p>
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button variant="warm" size="lg" className="text-base px-8 py-6">
              <Calculator className="w-5 h-5 mr-2" />
              Calculate My EMI
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
              Check EMI Plans
            </Button>
          </motion.div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-16 bg-sage-light" id="calculator">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
            EMI Planner Tool
          </h2>

          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <label className="text-sm font-medium font-body text-muted-foreground mb-2 block">
              Interior Project Cost
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={50000}
                max={2000000}
                step={10000}
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="flex-1 accent-[hsl(var(--accent))]"
              />
              <span className="font-bold font-display text-accent min-w-[120px] text-right">
                {fmt(projectCost)}
              </span>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {emiPlans.map((p) => (
              <button
                key={p.months}
                onClick={() => setSelectedPlan(p.months)}
                className={`rounded-2xl p-6 border-2 transition-all text-center ${
                  selectedPlan === p.months
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card hover:border-accent/30"
                }`}
              >
                <p className="text-3xl font-bold font-display text-accent">
                  {p.months}
                </p>
                <p className="text-sm text-muted-foreground font-body">Months</p>
                {p.interest === 0 && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium font-body">
                    0% Interest
                  </span>
                )}
                {p.interest > 0 && (
                  <span className="inline-block mt-2 text-xs text-muted-foreground font-body">
                    {p.interest}% total interest
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Result */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 text-center border-b border-border">
              <p className="text-sm text-muted-foreground font-body mb-1">
                Monthly EMI
              </p>
              <p className="text-4xl font-bold font-display text-accent flex items-center justify-center">
                <IndianRupee className="w-7 h-7" />
                {monthlyEMI.toLocaleString("en-IN")}
                <span className="text-base font-normal text-muted-foreground ml-1">
                  /month
                </span>
              </p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border">
              {[
                { label: "Interest Rate", val: `${plan.interest}%` },
                { label: "Total Payable", val: fmt(totalPayable) },
                { label: "Processing Fee", val: fmt(processingFee) },
              ].map((item) => (
                <div key={item.label} className="p-4 text-center">
                  <p className="text-xs text-muted-foreground font-body">{item.label}</p>
                  <p className="font-bold font-display text-sm">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Room-by-Room */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <Home className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
              Pay Room-by-Room
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Complete your home interior one room at a time with lower monthly
              payments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {roomEMIs.map((r, i) => (
              <motion.div
                key={r.room}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold font-display">{r.room}</p>
                  <p className="text-xs text-muted-foreground font-body">
                    Monthly EMI
                  </p>
                </div>
                <span className="text-xl font-bold font-display text-accent">
                  {fmt(r.emi)}
                  <span className="text-sm font-normal">/mo</span>
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {[
              { icon: CreditCard, text: "Lower monthly payments" },
              { icon: Clock, text: "Flexible planning" },
              { icon: Wallet, text: "Budget-friendly execution" },
            ].map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-2 bg-sage-light px-4 py-2 rounded-full text-sm font-body border border-border"
              >
                <b.icon className="w-4 h-4 text-primary" />
                {b.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Check */}
      <section className="py-16 bg-sage-light">
        <div className="container max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-8">
            Check Your EMI Eligibility
          </h2>

          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <div>
              <label className="text-sm font-medium font-body block mb-1.5">
                Monthly Income (₹)
              </label>
              <Input
                type="number"
                placeholder="e.g. 50000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium font-body block mb-1.5">
                Employment Type
              </label>
              <div className="flex gap-2">
                {["salaried", "self-employed", "freelancer"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setEmpType(t)}
                    className={`px-4 py-2 rounded-full text-sm font-body font-medium border transition-all capitalize ${
                      empType === t
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Button
              variant="hero"
              className="w-full"
              onClick={() => setShowEligibility(true)}
              disabled={!income}
            >
              <BadgeCheck className="w-5 h-5 mr-2" />
              Check Eligibility
            </Button>

            {showEligibility && income && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-sage-light rounded-xl p-4 space-y-2"
              >
                <div className="flex items-center gap-2 text-primary font-semibold font-body">
                  <CheckCircle className="w-5 h-5" />
                  You are eligible!
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm font-body">
                  <div>
                    <p className="text-muted-foreground">Project Budget</p>
                    <p className="font-bold font-display">{fmt(eligibleBudget)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Suggested EMI</p>
                    <p className="font-bold font-display">
                      {fmt(suggestedEMI)}/mo for 24 months
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Approval Process */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
            EMI Approval in Minutes
          </h2>
          <div className="space-y-4">
            {[
              "Select your interior project",
              "Choose EMI payment option",
              "Submit basic verification documents",
              "EMI approval within minutes",
              "Start your project immediately",
            ].map((step, i) => (
              <motion.div
                key={step}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 bg-card rounded-xl border border-border p-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold font-display shrink-0">
                  {i + 1}
                </div>
                <p className="font-body font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-sage-light">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Make Your Interior Project{" "}
            <span className="text-accent">Affordable</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button variant="warm" size="lg" className="text-base px-8 py-6">
              <Calculator className="w-5 h-5 mr-2" />
              Calculate EMI
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" asChild>
              <a href="/pricing">
                <ArrowRight className="w-5 h-5 mr-2" />
                Start Your Interior Project
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FlexibleEMI;
