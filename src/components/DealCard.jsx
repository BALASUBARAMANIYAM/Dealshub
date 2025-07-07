import React, { useState } from 'react';
import { ExternalLink, Heart, Star, Eye } from 'lucide-react';

const DealCard = ({
  title,
  price,
  originalPrice,
  link,
  image,
  discount,
  rating,
  onAddToWatchlist,
  isLoggedIn
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);

  const handleWatchlist = () => {
    if (!isLoggedIn) {
      alert("🔒 Please login to add this deal to your watchlist.");
      return;
    }

    if (!watchlisted) {
      setWatchlisted(true);
      if (onAddToWatchlist) {
        onAddToWatchlist({
          title,
          price,
          originalPrice,
          link,
          image,
          discount,
          rating
        });
      }
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 w-64">
      {/* Image & Discount Badge */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          {discount}% OFF
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Deal Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">{title}</h3>

        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-bold text-gray-900">₹{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-2">
          <a href={link} target="_blank" rel="noopener noreferrer" className="block">
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 group">
              <span>Buy Now</span>
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </a>

          <button
            onClick={handleWatchlist}
            disabled={watchlisted}
            className={`w-full py-2 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
              watchlisted
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>{watchlisted ? 'Added to Watchlist' : 'Add to Watchlist'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
