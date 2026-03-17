import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, MessageCircle, Heart, MapPin, Star, CheckCircle, Truck, Package } from "lucide-react";
import { type FurnitureListing, fmt } from "@/data/marketplaceData";

interface Props {
  listing: FurnitureListing | null;
  open: boolean;
  onClose: () => void;
}

const ListingDetailModal = ({ listing, open, onClose }: Props) => {
  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{listing.title}</DialogTitle>
        </DialogHeader>

        {/* Image gallery */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {listing.images.map((img, i) => (
            <div key={i} className="w-32 h-32 bg-sage-light rounded-xl overflow-hidden shrink-0">
              <img src={img} alt={`${listing.title} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            {listing.verified && (
              <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-body font-semibold px-3 py-1 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" /> Verified
              </span>
            )}
            <span className="text-xs bg-muted px-3 py-1 rounded-full font-body">{listing.condition}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
              <MapPin className="w-3.5 h-3.5" /> {listing.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
              <Star className="w-3.5 h-3.5 text-accent" /> {listing.seller.name} ({listing.seller.rating})
            </span>
          </div>

          <p className="text-sm text-muted-foreground font-body">{listing.description}</p>

          {/* Package items */}
          {listing.type === "package" && listing.items && (
            <div>
              <p className="text-sm font-semibold font-body mb-2 flex items-center gap-2">
                <Package className="w-4 h-4" /> Package Includes
              </p>
              <div className="grid grid-cols-2 gap-2">
                {listing.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-sage-light rounded-xl px-3 py-2 text-sm font-body">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual details */}
          {listing.type === "individual" && (
            <div className="grid grid-cols-2 gap-3">
              {listing.dimensions && (
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground font-body">Dimensions</p>
                  <p className="text-sm font-semibold font-body">{listing.dimensions}</p>
                </div>
              )}
              {listing.material && (
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground font-body">Material</p>
                  <p className="text-sm font-semibold font-body">{listing.material}</p>
                </div>
              )}
            </div>
          )}

          {/* Delivery */}
          <div className="bg-sage-light rounded-xl p-4">
            <p className="text-sm font-semibold font-body mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4" /> Delivery Options
            </p>
            <div className="flex gap-3">
              <div className="flex-1 bg-card rounded-lg p-3 border border-border text-center">
                <p className="text-xs font-body font-medium">Self Pickup</p>
                <p className="text-sm font-bold font-display text-primary">Free</p>
              </div>
              <div className="flex-1 bg-card rounded-lg p-3 border border-border text-center">
                <p className="text-xs font-body font-medium">Platform Delivery</p>
                <p className="text-sm font-bold font-display text-primary">₹800</p>
              </div>
            </div>
          </div>

          {/* Price + Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-3xl font-bold font-display text-primary">{fmt(listing.price)}</span>
              <span className="block text-xs text-accent font-body font-medium">EMI from {fmt(Math.round(listing.price / 6))}/mo</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="heroOutline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" /> Contact
              </Button>
              <Button variant="hero" size="sm">
                <ShoppingCart className="w-4 h-4 mr-1" /> Buy Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingDetailModal;
