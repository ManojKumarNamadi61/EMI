import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import aiMeasurementHero from "@/assets/ai-measurement-hero.jpg";
import {
  Camera, Ruler, Smartphone, Zap, CheckCircle, ArrowRight,
  ScanLine, Layers, Download, Shield
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Smartphone,
    title: "Open the App",
    description: "Launch the EMI app on your smartphone and select 'AI Room Measurement'.",
  },
  {
    step: "02",
    icon: Camera,
    title: "Point & Scan",
    description: "Point your phone camera at the room. The AI will automatically detect walls, corners, and edges.",
  },
  {
    step: "03",
    icon: ScanLine,
    title: "Auto-Measure",
    description: "The AI calculates precise room dimensions — length, width, height, and area in real time.",
  },
  {
    step: "04",
    icon: Download,
    title: "Save & Use",
    description: "Save your measurements and use them instantly for cost estimation or interior planning.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get accurate room dimensions in under 30 seconds without any manual tools.",
  },
  {
    icon: Ruler,
    title: "99% Accuracy",
    description: "Our AI achieves near-perfect measurement accuracy comparable to professional tools.",
  },
  {
    icon: Layers,
    title: "3D Room Mapping",
    description: "Generate a 3D floor plan of your room automatically from the scan.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All scans are processed on-device. Your photos never leave your phone.",
  },
];

const capabilities = [
  "Wall-to-wall distance",
  "Ceiling height",
  "Window & door dimensions",
  "Total floor area (sq ft)",
  "Room perimeter",
  "Obstacle detection",
];

const AIRoomMeasurement = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-sage-light overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                AI-Powered Tool
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Measure Any Room With Just Your Phone
              </h1>
              <p className="text-lg text-muted-foreground mb-8 font-body leading-relaxed max-w-lg">
                No tape measure needed. Our AI scans your room through your phone camera and delivers precise dimensions in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
                  <Link to="/ai-room-measurement/tool">Try AI Measurement</Link>
                </Button>
                <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border">
                <img
                  src={aiMeasurementHero}
                  alt="AI Room Measurement in action"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-lg border border-border"
              >
                <p className="text-2xl font-bold font-display text-primary">99%</p>
                <p className="text-xs text-muted-foreground font-body">Accuracy Rate</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-lg border border-border"
              >
                <p className="text-2xl font-bold font-display text-accent">30s</p>
                <p className="text-xs text-muted-foreground font-body">Avg Scan Time</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How AI Measurement Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
              Four simple steps to get precise room dimensions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative p-6 rounded-2xl bg-background border border-border text-center group hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <span className="text-5xl font-bold text-primary/10 font-display absolute top-4 right-4">{step.step}</span>
                <div className="w-14 h-14 rounded-xl bg-sage-light flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <step.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-display">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-border z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our AI Measurement Is Different</h2>
              <p className="text-muted-foreground text-lg mb-8 font-body">
                Built with cutting-edge computer vision technology for reliable, professional-grade results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 rounded-2xl bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 font-display">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground font-body">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-3xl p-8 border border-border shadow-xl shadow-primary/5">
                <h3 className="text-xl font-bold font-display mb-6">What It Measures</h3>
                <div className="space-y-4">
                  {capabilities.map((cap, i) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border"
                    >
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium text-sm font-body">{cap}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Measure Your Room?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 font-body">
              Try our AI Room Measurement tool for free and get instant dimensions.
            </p>
            <Button variant="warm" size="lg" className="text-base px-10 py-6" asChild>
              <Link to="/ai-room-measurement/tool">Start Measuring Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIRoomMeasurement;
