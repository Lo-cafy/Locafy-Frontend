"use client";

import { CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type  { Option, ServiceFull } from "@/types/service.types";

// Use Omit<> to safely override price type for UI
interface Props {
  service: Omit<ServiceFull, "price"> & { price: number };
  serviceOptions: Option[];
  selectedOption: string | number;
  setSelectedOption: (id: string | number) => void;
  avgRating: number;
}

export default function ServiceInfo({
  service,
  serviceOptions,
  selectedOption,
  setSelectedOption,
  avgRating,
}: Props) {
  const navigate = useNavigate();
  const price = serviceOptions.find(o => o.id === selectedOption)?.price ?? service.price;
  const whatsIncluded = service.whatsIncluded ?? [];

  return (
    <div className="space-y-4">
      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        {service.type && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{service.type}</span>}
        {service.tags?.map((t, i) => (
          <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{t}</span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>

      {/* Price */}
      <p className="text-2xl font-bold text-gray-900">${price}</p>

      {/* Ratings */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < Math.round(avgRating) ? "currentColor" : "none"} />
          ))}
        </div>
        <span>{avgRating.toFixed(1)} • {service.reviews?.length ?? 0} reviews</span>
      </div>

      {/* Extra info */}
      <div className="text-sm text-gray-700 space-y-1">
        {service.availability && <p>Availability: <b>{service.availability}</b></p>}
        {service.booking_count !== undefined && <p>Bookings: <b>{service.booking_count}</b></p>}
        {service.location_text && <p>Location: <b>{service.location_text}</b></p>}
        {service.service_radius_km !== undefined && <p>Service Radius: <b>{service.service_radius_km} km</b></p>}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {serviceOptions.map(o => (
          <div
            key={o.id}
            className={`p-3 rounded-lg border cursor-pointer transition ${selectedOption === o.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
            onClick={() => setSelectedOption(o.id)}
          >
            <div className="flex justify-between">
              <span className="font-medium">{o.name}</span>
              <span>${o.price}</span>
            </div>
            {o.description && <p className="text-xs text-gray-600 mt-1">{o.description}</p>}
          </div>
        ))}
      </div>

      {/* Description */}
      {service.description && <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>}

      {/* What's Included */}
      {whatsIncluded.length > 0 && (
        <ul className="text-sm space-y-1">
          {whatsIncluded.map((i, idx) => (
            <li key={idx} className="flex items-center gap-1">
              <CheckCircle size={14} className="text-green-500" /> {i}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <button
        onClick={() => navigate(`/services/${service.service_id || service.id}/booking`, { state: { service } })}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        Book Now
      </button>
    </div>
  );
}
