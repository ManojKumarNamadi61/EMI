import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AIRoomMeasurement from "./pages/AIRoomMeasurement.tsx";
import AIRoomMeasurementTool from "./pages/AIRoomMeasurementTool.tsx";
import TransparentPricing from "./pages/TransparentPricing.tsx";
import FlexibleEMI from "./pages/FlexibleEMI.tsx";
import FurnitureMarketplacePage from "./pages/FurnitureMarketplace.tsx";
import BudgetPlanner from "./pages/BudgetPlanner.tsx";
import DesignStyles from "./pages/DesignStyles.tsx";
import AIWallDesign from "./pages/AIWallDesign.tsx";
import SellerDashboard from "./pages/SellerDashboard.tsx";
import BuyerDashboard from "./pages/BuyerDashboard.tsx";
import ProjectTracker from "./pages/ProjectTracker.tsx";
import NotFound from "./pages/NotFound.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-room-measurement" element={<AIRoomMeasurement />} />
          <Route path="/ai-room-measurement/tool" element={<AIRoomMeasurementTool />} />
          <Route path="/pricing" element={<TransparentPricing />} />
          <Route path="/emi-payments" element={<FlexibleEMI />} />
          <Route path="/furniture" element={<FurnitureMarketplacePage />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
          <Route path="/design-styles" element={<DesignStyles />} />
          <Route path="/ai-wall-design" element={<AIWallDesign />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/project-tracker" element={<ProjectTracker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
