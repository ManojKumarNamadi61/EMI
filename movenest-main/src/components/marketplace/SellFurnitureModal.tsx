import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Package, Armchair, CheckCircle, Eye } from "lucide-react";
import { packageItems, conditions, categories, type Condition, type FurnitureCategory } from "@/data/marketplaceData";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SellFurnitureModal = ({ open, onClose }: Props) => {
  const [listingType, setListingType] = useState<"package" | "individual">("individual");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<FurnitureCategory>("Sofa");
  const [condition, setCondition] = useState<Condition>("Like New");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const canPublish = title && price && location && (listingType === "individual" || selectedItems.length >= 4);

  const handlePublish = () => {
    toast({
      title: "Listing Published!",
      description: "Your furniture listing is now live on the marketplace.",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Sell Your Furniture</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Listing type */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setListingType("package")}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-body font-medium ${
                listingType === "package" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
              }`}
            >
              <Package className="w-5 h-5 text-primary" /> Furniture Package
            </button>
            <button
              onClick={() => setListingType("individual")}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-body font-medium ${
                listingType === "individual" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
              }`}
            >
              <Armchair className="w-5 h-5 text-primary" /> Individual Item
            </button>
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-medium font-body block mb-1.5">Upload Images (3–8)</label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground font-body">Click or drag images here</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium font-body block mb-1.5">Listing Title</label>
            <Input placeholder="e.g. Full Home Furniture Package" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Package builder */}
          {listingType === "package" && (
            <div>
              <label className="text-sm font-medium font-body block mb-1.5">
                Select Items (min 4){" "}
                <span className={`${selectedItems.length >= 4 ? "text-primary" : "text-destructive"}`}>
                  ({selectedItems.length} selected)
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {packageItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleItem(item)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-body border transition-all ${
                      selectedItems.includes(item)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {selectedItems.includes(item) && <CheckCircle className="w-4 h-4 shrink-0" />}
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category (individual) */}
          {listingType === "individual" && (
            <div>
              <label className="text-sm font-medium font-body block mb-1.5">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-body font-medium border transition-all ${
                      category === c
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Condition */}
          <div>
            <label className="text-sm font-medium font-body block mb-1.5">Condition</label>
            <div className="flex flex-wrap gap-2">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => setCondition(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-body font-medium border transition-all ${
                    condition === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium font-body block mb-1.5">Price (₹)</label>
              <Input type="number" placeholder="40000" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium font-body block mb-1.5">City</label>
              <Input placeholder="Mumbai" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium font-body block mb-1.5">Description</label>
            <Textarea
              placeholder="Furniture used for 1 year. Selling because we are relocating."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="heroOutline" className="flex-1" disabled={!canPublish}>
              <Eye className="w-4 h-4 mr-2" /> Preview
            </Button>
            <Button variant="hero" className="flex-1" disabled={!canPublish} onClick={handlePublish}>
              Publish Listing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellFurnitureModal;
