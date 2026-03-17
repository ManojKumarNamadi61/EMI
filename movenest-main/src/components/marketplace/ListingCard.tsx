import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, MessageCircle, CheckCircle, MapPin, Star, Clock } from "lucide-react";
import { type FurnitureListing, fmt } from "@/data/marketplaceData";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const conditionColor: Record<string, string> = {
  New: "bg-primary/15 text-primary",
  "Like New": "bg-primary/10 text-primary",
  Used: "bg-muted text-muted-foreground",
  Good: "bg-accent/10 text-accent",
};

interface Props {
  listing: FurnitureListing;
  index: number;
  onViewDetails: (id: number) => void;
  onContact: (id: number) => void;
}

const ListingCard = ({ listing, index, onViewDetails, onContact }: Props) => (
  <motion.div
    variants={fade}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: index * 0.04 }}
    className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
  >
    {/* Image */}
    <div className="h-40 bg-sage-light relative overflow-hidden">
      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" loading="lazy" />
      {listing.verified && (
        <span className="absolute top-2 left-2 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-body font-semibold px-2 py-0.5 rounded-full">
          <CheckCircle className="w-3 h-3" /> Verified
        </span>
      )}
      <span className={`absolute top-2 right-2 text-[10px] font-body font-semibold px-2 py-0.5 rounded-full ${conditionColor[listing.condition]}`}>
        {listing.condition}
      </span>
    </div>

    {/* Content */}
    <div className="p-4">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-semibold font-display text-sm leading-tight">{listing.title}</h3>
      </div>

      {/* Package items */}
      {listing.type === "package" && listing.items && (
        <div className="flex flex-wrap gap-1 my-2">
          {listing.items.slice(0, 4).map((item) => (
            <span key={item} className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-body">{item}</span>
          ))}
          {listing.items.length > 4 && (
            <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-body">+{listing.items.length - 4} more</span>
          )}
        </div>
      )}

      {/* Individual details */}
      {listing.type === "individual" && listing.dimensions && (
        <p className="text-xs text-muted-foreground font-body mt-1">{listing.dimensions} • {listing.material}</p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground font-body">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {listing.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {listing.daysAgo === 0 ? "Today" : `${listing.daysAgo}d ago`}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3 text-accent" /> {listing.seller.rating}
        </span>
      </div>

      {/* Price + Actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div>
          <span className="text-xl font-bold font-display text-primary">{fmt(listing.price)}</span>
          <span className="block text-[10px] text-accent font-body font-medium">EMI {fmt(Math.round(listing.price / 6))}/mo</span>
        </div>
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="text-xs h-8 px-2" onClick={() => onViewDetails(listing.id)}>
            <Eye className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8 px-2" onClick={() => onContact(listing.id)}>
            <MessageCircle className="w-3.5 h-3.5" />
          </Button>
          <Button variant="hero" size="sm" className="text-xs h-8 px-2.5">
            <ShoppingCart className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default ListingCard;
