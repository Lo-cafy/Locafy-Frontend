"use client";

import { Star, MapPin,  User, Clock, Shield, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ServiceCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  isFeatured?: boolean;
  providerName?: string;
  reviewCount?: number;
  completionTime?: string;
}

export default function ServiceCard({ 
  id,
  name, 
  location, 
  price, 
  rating, 
  image, 
  isFeatured,
  providerName = "Local Provider",
  reviewCount = 0,
  completionTime = "2-3 days"
}: ServiceCardProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      {/* Mobile: compact horizontal card */}
      <div
        onClick={() => navigate(`/services/${id}`)}
        className="sm:hidden cursor-pointer bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden border border-slate-100 active:scale-[0.99]"
      >
        <div className="flex items-center p-3 gap-3">
          <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
            {image && !imageError ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <span className="text-green-700 font-bold text-lg">{name.charAt(0)}</span>
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); handleFavoriteClick(e as any); }}
              className={`${isFavorite ? "bg-red-500 text-white" : "bg-white/90 text-gray-700"} absolute top-1 right-1 p-1.5 rounded-full shadow`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">{name}</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-green-600">${price}</span>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/services/${id}`); }}
                className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet/Desktop: original rich card */}
      <div 
        onClick={() => navigate(`/services/${id}`)}
        className="hidden sm:block cursor-pointer group bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200 w-full sm:w-[300px] md:w-[340px] lg:w-[360px]"
      >
        {/* Image Section */}
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          {image && !imageError ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
                </div>
                <p className="text-green-700 text-sm font-medium">Service Image</p>
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Badges & Save Icon */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
            <div className="flex gap-2">
              {isFeatured && (
                <span className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                  ⭐ FEATURED
                </span>
              )}
              <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                <Shield className="inline w-3 h-3 mr-1" />
                Verified
              </span>
            </div>
            <button 
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-all shadow-md ${
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
        <div className="p-3 sm:p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-2 flex-1 mr-2 group-hover:text-green-600 transition-colors">
              {name}
            </h3>
          </div>

          {/* Provider Info */}
          <div className="flex items-center text-slate-600 text-xs sm:text-sm mb-2">
            <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-600" />
            <span className="line-clamp-1">by {providerName}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-slate-600 text-xs sm:text-sm mb-3">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-bold ml-1 text-green-700">{rating}</span>
              <span className="text-xs text-green-600 ml-1">({reviewCount} reviews)</span>
            </div>
            <div className="flex items-center text-slate-600 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span>{completionTime}</span>
            </div>
          </div>

          {/* Price and Book Now Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg sm:text-xl font-bold text-green-600">${price}</span>
              <span className="text-xs text-slate-500 ml-1">starting from</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/services/${id}`);
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
