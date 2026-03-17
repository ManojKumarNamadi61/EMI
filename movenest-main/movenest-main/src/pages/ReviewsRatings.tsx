import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Star, Send, User, ThumbsUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  category: string;
}

const mockReviews: Review[] = [
  { id: 1, name: "Rahul Sharma", rating: 5, comment: "Excellent service! The false ceiling work was top-notch and completed on time.", date: "10 Mar 2026", helpful: 12, category: "False Ceiling" },
  { id: 2, name: "Priya Mehta", rating: 4, comment: "Good quality modular kitchen. Minor delay in delivery but overall satisfied.", date: "8 Mar 2026", helpful: 8, category: "Modular Kitchen" },
  { id: 3, name: "Amit Kumar", rating: 5, comment: "The furniture package was exactly as described. Great condition and fair price.", date: "5 Mar 2026", helpful: 15, category: "Furniture" },
  { id: 4, name: "Sneha Patel", rating: 3, comment: "Painting quality was decent but could have been better for the price.", date: "1 Mar 2026", helpful: 3, category: "Painting" },
  { id: 5, name: "Vikram Singh", rating: 5, comment: "AI room measurement tool saved us so much time. Very accurate!", date: "28 Feb 2026", helpful: 20, category: "AI Tools" },
];

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => interactive && onRate?.(star)}
        className={interactive ? "cursor-pointer" : "cursor-default"}
        disabled={!interactive}
      >
        <Star
          className={`w-5 h-5 ${
            star <= rating ? "fill-accent text-accent" : "text-muted"
          }`}
        />
      </button>
    ))}
  </div>
);

const ReviewsRatings = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [newRating, setNewRating] = useState(0);
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(reviews.map((r) => r.category)))];
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const filtered = filterCategory === "All" ? reviews : reviews.filter((r) => r.category === filterCategory);

  const submitReview = () => {
    if (!newName || !newComment || newRating === 0) {
      toast({ title: "Incomplete", description: "Please fill all fields and select a rating.", variant: "destructive" });
      return;
    }
    const review: Review = {
      id: Date.now(),
      name: newName,
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      helpful: 0,
      category: "General",
    };
    setReviews((prev) => [review, ...prev]);
    setNewName("");
    setNewComment("");
    setNewRating(0);
    toast({ title: "Review Submitted", description: "Thank you for your feedback!" });
  };

  const markHelpful = (id: number) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Reviews & Ratings</h1>
            <p className="text-muted-foreground font-body">See what our customers say about our services</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-4xl font-bold font-display text-accent">{avgRating}</span>
              <div>
                <StarRating rating={Math.round(parseFloat(avgRating))} />
                <p className="text-xs text-muted-foreground font-body">{reviews.length} reviews</p>
              </div>
            </div>
          </div>

          {/* Write review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-6 mb-8"
          >
            <h3 className="font-semibold font-display mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-body font-medium block mb-1">Your Rating</label>
                <StarRating rating={newRating} onRate={setNewRating} interactive />
              </div>
              <Input
                placeholder="Your Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <textarea
                placeholder="Share your experience..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px] font-body"
              />
              <Button variant="hero" onClick={submitReview}>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </Button>
            </div>
          </motion.div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium border transition-all ${
                  filterCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reviews list */}
          <div className="space-y-4">
            {filtered.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold font-display text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground font-body">{review.date}</p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-body">
                    {review.category}
                  </span>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-sm text-foreground/80 font-body mt-2 mb-3">{review.comment}</p>
                <button
                  onClick={() => markHelpful(review.id)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground font-body hover:text-primary transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful ({review.helpful})
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsRatings;
