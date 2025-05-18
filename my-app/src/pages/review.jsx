import React, { useState } from "react";

const RateReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === "") {
      alert("Please provide a rating and a review.");
      return;
    }
    const newReview = {
      id: Date.now(),
      rating,
      text: reviewText,
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setHoverRating(0);
    setReviewText("");
  };

  const renderStars = (starCount, size = "text-2xl") => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span key={index} className={`${size}`}>
          {index < starCount ? "⭐" : "☆"}
        </span>
      ));
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-4 text-center">Rate & Review Our Services</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 border border-gray-200">
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl focus:outline-none"
            >
              {star <= (hoverRating || rating) ? "⭐" : "☆"}
            </button>
          ))}
        </div>

        <textarea
          className="w-full border p-2 rounded"
          rows="4"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="mt-10 space-y-6">
          <h3 className="text-xl font-semibold">User Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <div className="mb-1">{renderStars(review.rating)}</div>
              <p className="text-gray-800">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RateReviewPage;
