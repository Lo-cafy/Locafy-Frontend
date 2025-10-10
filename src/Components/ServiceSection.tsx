"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./Services/serviceCard";

interface Service {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  isFeatured?: boolean;
}

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://back-end-service-listing.onrender.com/api/services"
        );

        const arr = Array.isArray(data)
          ? data
          : data.data || data.services || [];

        // Limit to 4 + fetch photos
        const limited = arr.slice(0, 4);
        const withPhotos = await Promise.all(
          limited.map(async (service: any) => {
            const id = service.service_id || service.id;
            let image = service.image || "/api/placeholder/400/300";

            try {
              const res = await axios.get(
                `https://back-end-service-listing.onrender.com/api/photoservices/${id}/photos`
              );
              const photos =
                res.data?.data?.photos || res.data?.photos || res.data || [];
              image = photos[0]?.photo_url || photos[0]?.url || image;
            } catch {}

            return {
              id,
              title: service.title,
              location: service.location_text || service.location || "Unknown",
              price: parseFloat(service.price) || 0,
              rating: parseFloat(service.rating) || 0,
              image,
              isFeatured: Math.random() > 0.7,
            };
          })
        );

        setServices(withPhotos);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" /> Premium Services
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Featured Local Services
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Discover top-rated professionals verified by real users.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                id={s.id}
                name={s.title}
                location={s.location}
                price={s.price}
                rating={s.rating}
                image={s.image}
                isFeatured={s.isFeatured}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/all-services")}
              className="bg-white text-emerald-600 border border-emerald-600 px-8 py-3 rounded-xl hover:bg-emerald-50 transition-all font-semibold"
            >
              View All Services
            </button>
          </div>
        </>
      )}
    </section>
  );
}
