import React, { useState } from "react";
import Footer from "../components/footer";

const RateReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === "" || userName.trim() === "") {
      alert("Please provide your name, a rating, and a review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      text: reviewText,
      name: userName,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setHoverRating(0);
    setReviewText("");
    setUserName("");
    setThankYouVisible(true);

    setTimeout(() => setThankYouVisible(false), 3000);
  };

  const renderStars = (starCount, size = "text-xl") => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span key={index} className={`${size}`}>
          {index < starCount ? "★" : "☆"}
        </span>
      ));
  };

  return (
    <div className="bg-white">
      <h2 className="text-3xl pt-5 text-right mr-5">
          Auto
          <span className={`text-[#ed832d]`}>Assist</span>
        </h2>
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Rate our service?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-4xl focus:outline-none transition-transform hover:scale-110"
              >
                {star <= (hoverRating || rating) ? "★" : "☆"}
              </button>
            ))}
          </div>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <textarea
            className="w-full border border-gray-300 rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
            rows="4"
            placeholder="Write your experience with the mechanic..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#ed832d] transition ease in out duration-300"
          >
            Submit Review
          </button>
        </form>

        {thankYouVisible && (
          <div className="mt-6 text-green-600 font-medium text-center animate-fade-in">
           Thank you for your feedback!
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="max-w-3xl mx-auto mt-10 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">User Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} className="p-4 rounded-xl bg-white border border-gray-200 shadow">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-semibold text-gray-800">{review.name}</div>
                <div>{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  </div>
  );
};

export default RateReviewPage;

