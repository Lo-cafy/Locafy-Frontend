"use client";

import { Star, MapPin, User, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ServiceCard } from "@/types/serviceTypes";



export default function ServiceCard({ 
  id,
  name, 
  location, 
  price, 
  rating, 
  image, 
  isFeatured,
  providerName = "Local Provider",
  reviewCount = 0
}: ServiceCard) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={() => navigate(`/services/${id}`)}
      className="cursor-pointer group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-slate-100 hover:border-slate-200 sm:hover:-translate-y-0.5 flex sm:flex-col"
    >
      {/* Image Section */}
      <div className="relative w-24 sm:w-full flex-shrink-0">
        <div className="relative h-full sm:aspect-[4/3]">
          {!imageError ? (
            <img
              src={image || "https://via.placeholder.com/400x300?text=Service+Image"}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/service-placeholder.svg"
                  alt="Placeholder"
                  className="w-8 h-8 mx-auto opacity-40"
                />
              </div>
            </div>
          )}
          
          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-2 left-2">
              <span className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                ⭐ Featured
              </span>
            </div>
          )}
          
          {/* Bookmark Button */}
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all shadow-sm ${
              isFavorite 
                ? "bg-red-500 text-white" 
                : "bg-white/90 hover:bg-white text-gray-600 hover:text-red-500"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-3 min-w-0">
        {/* Title */}
        <h3 className="font-semibold text-slate-800 text-sm line-clamp-1 sm:mb-1 group-hover:text-green-600 transition-colors">
          {name}
        </h3>

        {/* Location & Provider */}
        <div className="hidden sm:flex items-center gap-3 text-slate-600 text-xs mb-2">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-slate-400" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1 text-slate-400" />
            <span className="line-clamp-1">{providerName}</span>
          </div>
        </div>

        {/* Mobile Location */}
        <div className="flex sm:hidden items-center text-slate-600 text-xs mb-1">
          <MapPin className="h-3 w-3 mr-1 text-slate-400 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Footer: Rating & Price */}
        <div className="flex items-center justify-between sm:pt-2 sm:border-t sm:border-slate-100">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-400 fill-current" />
            <span className="text-xs font-medium text-slate-700">{rating.toFixed(1)}</span>
            {reviewCount > 0 && (
              <span className="text-xs text-slate-500 hidden sm:inline">({reviewCount})</span>
            )}
          </div>
          <div className="font-semibold text-green-600 text-sm">
            ${typeof price === 'number' ? price.toFixed(2) : price}
          </div>
        </div>
      </div>
    </div>
  );
}
