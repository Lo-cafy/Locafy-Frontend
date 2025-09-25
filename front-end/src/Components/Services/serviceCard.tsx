"use client";

import { Star, MapPin, Heart } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  name: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  isFeatured?: boolean;
}

export default function ServiceCard({ 
  name, 
  location, 
  price, 
  rating, 
  image, 
  isFeatured 
}: ServiceCardProps) {
  const [liked, setLiked] = useState(false);

  // Helper: render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
        }`}
      />
    ));
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg hover:shadow-slate-200 transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200">
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={image || "/api/placeholder/400/300"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent" />
        
        {/* Badges + Like */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          {isFeatured && (
            <span className="backdrop-blur-sm bg-amber-500/80 text-white px-2.5 py-1 rounded-md text-[11px] font-bold shadow-md">
              FEATURED
            </span>
          )}
          <button 
            onClick={() => setLiked(!liked)} 
            className={`p-1.5 rounded-full transition-all ${
              liked 
                ? "bg-red-500 text-white" 
                : "bg-white/90 hover:bg-white text-slate-700"
            }`}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-slate-800 text-base line-clamp-1 flex-1 mr-2">
            {name}
          </h3>
          <div className="flex">{renderStars(rating)}</div>
        </div>

        <div className="flex items-center text-slate-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 text-slate-400" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            ${price.toLocaleString()}
          </span>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:scale-105 hover:from-green-600 hover:to-green-700 transition-all text-sm font-semibold shadow">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
