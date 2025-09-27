"use client";

import { Star, MapPin, Heart } from "lucide-react";

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
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200">
      {/* Image Section */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image || "/api/placeholder/400/300"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between">
          {isFeatured && (
            <span className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              FEATURED
            </span>
          )}
          <button className="bg-white/80 hover:bg-white text-slate-700 p-1.5 rounded-full transition-all">
            <Heart className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-slate-800 text-base line-clamp-1 flex-1 mr-2">
            {name}
          </h3>
          <div className="flex items-center bg-slate-100 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold ml-1">{rating}</span>
          </div>
        </div>

        <div className="flex items-center text-slate-600 text-sm mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">${price}</span>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-sm font-semibold">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}