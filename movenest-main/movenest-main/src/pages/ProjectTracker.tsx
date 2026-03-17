import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  ClipboardList, Truck, Wrench, ShieldCheck, PartyPopper, CheckCircle,
  Circle, ArrowRight,
} from "lucide-react";

const stages = [
  { key: "planning", label: "Design Planning", icon: ClipboardList, description: "Finalizing designs, materials, and layout" },
  { key: "procurement", label: "Material Procurement", icon: Truck, description: "Ordering and sourcing materials" },
  { key: "installation", label: "Installation", icon: Wrench, description: "On-site work and assembly" },
  { key: "quality", label: "Quality Check", icon: ShieldCheck, description: "Inspection and finishing touches" },
  { key: "completion", label: "Project Completion", icon: PartyPopper, description: "Handover and final walkthrough" },
];

interface Project {
  id: number;
  name: string;
  currentStage: number;
  startDate: string;
  estimatedEnd: string;
  budget: number;
}

const mockProjects: Project[] = [
  { id: 1, name: "Living Room Interior", currentStage: 2, startDate: "1 Mar 2026", estimatedEnd: "15 Apr 2026", budget: 120000 },
  { id: 2, name: "Master Bedroom Renovation", currentStage: 0, startDate: "10 Mar 2026", estimatedEnd: "30 Apr 2026", budget: 85000 },
];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const ProjectTracker = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const project = mockProjects[selectedProject];
  const progress = ((project.currentStage + 1) / stages.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display">Project Progress Tracker</h1>
            <p className="text-muted-foreground font-body">Track the status of your interior projects</p>
          </div>

          {/* Project selector */}
          <div className="flex gap-3 mb-8">
            {mockProjects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelectedProject(i)}
                className={`px-4 py-2 rounded-xl text-sm font-body font-medium border transition-all ${
                  selectedProject === i
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Project info */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-display">{project.name}</h2>
              <span className="text-sm font-body text-primary font-medium">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm font-body">
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-bold font-display">{project.startDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Estimated Completion</p>
                <p className="font-bold font-display">{project.estimatedEnd}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="font-bold font-display text-primary">{fmt(project.budget)}</p>
              </div>
            </div>
          </div>

          {/* Stages */}
          <div className="space-y-4">
            {stages.map((stage, i) => {
              const isComplete = i < project.currentStage;
              const isCurrent = i === project.currentStage;
              const isFuture = i > project.currentStage;
              const Icon = stage.icon;

              return (
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border p-5 flex items-center gap-4 transition-all ${
                    isCurrent
                      ? "bg-primary/5 border-primary shadow-lg shadow-primary/10"
                      : isComplete
                      ? "bg-card border-border"
                      : "bg-card border-border opacity-60"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isComplete
                        ? "bg-primary text-primary-foreground"
                        : isCurrent
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : isCurrent ? (
                      <Icon className="w-6 h-6 animate-pulse" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold font-display">{stage.label}</h3>
                      {isCurrent && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-body">
                          In Progress
                        </span>
                      )}
                      {isComplete && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-body">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-body">{stage.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
              <a href="/buyer-dashboard">
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Dashboard
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectTracker;
