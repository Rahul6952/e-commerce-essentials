import { useState, useEffect } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const FeedbackPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
    } else if (formData.comment.length < 10) {
      newErrors.comment = 'Comment must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newReview: Review = {
      id: crypto.randomUUID(),
      name: formData.name,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };
    
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    
    setFormData({ name: '', rating: 0, comment: '' });
    setIsSubmitting(false);
    toast.success('Thank you for your feedback!');
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12 slide-up">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Customer Reviews
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We value your feedback. Share your experience with us and help others make informed decisions.
          </p>
          
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(parseFloat(averageRating))
                        ? 'fill-primary text-primary'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{averageRating}</span>
              <span className="text-muted-foreground">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Review Form */}
          <div className="slide-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-card rounded-lg border border-border p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold mb-6">
                Write a Review
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    className={`input-field ${errors.name ? 'border-destructive' : ''}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, rating: star }));
                          if (errors.rating) setErrors(prev => ({ ...prev, rating: '' }));
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (hoverRating || formData.rating)
                              ? 'fill-primary text-primary'
                              : 'text-border hover:text-primary/50'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {formData.rating > 0 && `${formData.rating} star${formData.rating > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  {errors.rating && (
                    <p className="text-destructive text-sm mt-1">{errors.rating}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, comment: e.target.value }));
                      if (errors.comment) setErrors(prev => ({ ...prev, comment: '' }));
                    }}
                    className={`input-field min-h-[120px] resize-none ${errors.comment ? 'border-destructive' : ''}`}
                    placeholder="Share your experience with us..."
                  />
                  {errors.comment && (
                    <p className="text-destructive text-sm mt-1">{errors.comment}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List */}
          <div className="slide-up" style={{ animationDelay: '200ms' }}>
            <h2 className="font-display text-xl font-semibold mb-6">
              Recent Reviews
            </h2>
            
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to share your experience!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className="bg-card rounded-lg border border-border p-5 fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-primary text-primary'
                                : 'text-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
