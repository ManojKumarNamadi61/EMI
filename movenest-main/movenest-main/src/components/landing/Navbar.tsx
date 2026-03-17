import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

const navLinks = [
  { label: "AI Tools", href: "/ai-room-measurement" },
  { label: "Pricing", href: "/pricing" },
  { label: "EMI Plans", href: "/emi-payments" },
  { label: "Furniture Marketplace", href: "/furniture" },
  { label: "Design Styles", href: "/design-styles" },
  { label: "Budget Planner", href: "/budget-planner" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-[5px]">
          <img src={logo} alt="Logo" className="w-12 h-10 object-contain" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              {link.label}
            </a>
          ))}

          {/* Warm Yellow Button */}
          <Button
            variant="hero"
            size="sm"
            className="bg-[#FFD736] hover:bg-[#e6c12f] text-black rounded-full px-5"
          >
            Get Estimate
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border p-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground font-body"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Button */}
          <Button
            variant="hero"
            size="sm"
            className="w-full bg-[#FFD736] hover:bg-[#e6c12f] text-black rounded-full"
          >
            Get Estimate
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;