import React, { useState } from 'react';
import { X, ShoppingBag, Star, Mail, User, Package, Send } from 'lucide-react';

export default function ProductDetailModal({ product, onClose }) {
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState(product.reviews || []);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      const newReview = {
        name: "You",
        date: "Just now",
        rating: 5,
        comment: reviewText,
      };
      setReviews(prev => [...prev, newReview]);
      setReviewText('');
      alert('Review submitted!');
    }
  };

  const longDescription = product.longDescription || product.description;

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-[#2B303B] transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto scrollbar-custom p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative rounded-xl overflow-hidden shadow-lg h-96">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-[#2B303B] mb-2">{product.name}</h1>
              <p className="text-3xl font-light text-[#007BFF] mb-4">{product.price}</p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {showFullDescription ? longDescription : product.description}
                  {longDescription.length > product.description.length && (
                    <span
                      onClick={toggleDescription}
                      className="text-[#007BFF] cursor-pointer ml-2 hover:underline"
                    >
                      {showFullDescription ? 'Show less' : 'Show more'}
                    </span>
                  )}
                </p>
                <div className="flex items-center text-gray-600 mb-2">
                  <Package size={18} className="mr-2" />
                  <span>
                    Stock: <span className="text-[#2B303B] font-semibold">{product.stockAvailable || 'Not Specified'}</span>
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#2B303B] mb-4">Seller Info</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <div className="flex items-center text-gray-700 mb-2">
                  <User size={18} className="mr-2 text-[#007BFF]" />
                  <span className="font-semibold text-[#2B303B]">{product.sellerName}</span>
                </div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Mail size={18} className="mr-2 text-[#007BFF]" />
                  <a href={`mailto:${product.sellerEmail}`} className="text-sm text-[#007BFF] hover:underline transition-colors duration-300">
                    {product.sellerEmail}
                  </a>
                </div>
                <div className="flex items-center text-gray-700 mb-2">
                  <span className="font-semibold mr-2">Roll No:</span>
                  <span className="text-[#2B303B]">{product.sellerRollNumber}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#2B303B] mb-4">Reviews</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 mb-4">
                      <div className="flex items-center mb-2">
                        <Star size={16} fill="currentColor" className="text-[#007BFF] mr-2" />
                        <span className="font-semibold text-[#2B303B]">{review.rating} / 5</span>
                        <span className="text-gray-500 text-sm ml-auto">{review.date}</span>
                      </div>
                      <p className="text-gray-700 italic">"{review.comment}"</p>
                      <p className="text-gray-500 text-sm mt-1">- {review.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>
                )}
                
                <form onSubmit={handleReviewSubmit} className="mt-4 pt-4 border-t border-gray-200">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write a review..."
                    rows="3"
                    className="w-full bg-white border border-gray-300 text-[#2B303B] rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  ></textarea>
                  <button
                    type="submit"
                    className="mt-3 w-full bg-[#007BFF] text-white font-bold py-2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#0056b3]"
                  >
                    <Send size={16} className="mr-2" /> Submit Review
                  </button>
                </form>
              </div>

              <button className="bg-[#007BFF] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag size={24} className="mr-3" /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}