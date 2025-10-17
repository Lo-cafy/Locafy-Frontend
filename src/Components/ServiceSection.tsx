"use client";
import { useNavigate } from "react-router-dom";
import { listingApi as api } from "@/Api/baseurl";
import { useEffect, useState } from "react";
import { Star, MapPin, Heart, Sparkles } from "lucide-react";
import type { Service, ServiceCard } from "@/types/serviceTypes"; // ✅ type-only import

// ---------------------- ServiceCard ----------------------
const ServiceCard = ({
  id,
  name,
  location,
  price,
  rating,
  image,
  isFeatured,
}: ServiceCard) => {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);

  // safely ensure rating is numeric for .toFixed()
  const numericRating = Number(rating) || 0;

  return (
    <div
      onClick={() => navigate(`/services/${id}`)}
      className="cursor-pointer group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/api/placeholder/400/300"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {isFeatured && (
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
              <Sparkles className="h-3 w-3" /> FEATURED
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFav(!fav);
            }}
            className={`p-2 rounded-full transition-all ${fav
              ? "bg-red-500 text-white"
              : "bg-white/90 text-slate-600 hover:text-red-500"
              }`}
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center">
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold ml-1 text-slate-800">
            {numericRating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-slate-900 text-lg mb-2 line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center text-slate-600 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="text-lg font-bold text-emerald-600">
              ${price.toFixed(2)}
            </span>
            <span className="text-slate-500 text-sm ml-1">/service</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/services/${id}`);
            }}
            className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-all text-sm font-semibold"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------------- FeaturedServices ----------------------
export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(
          "/api/services"
        );

        const arr = Array.isArray(data)
          ? data
          : data.data || data.services || data.results || [];

        const limited = arr.slice(0, 4);

        const withPhotos: Service[] = await Promise.all(
          limited.map(async (service: any) => {
            const id = service.service_id || service.id;
            let image = service.image || "/api/placeholder/400/300";

            try {
              const { data: photosData } = await api.get(
                `/api/photoservices/${id}/photos`
              );
              const photos =
                photosData?.data?.photos ||
                photosData?.photos ||
                photosData ||
                [];
              image = photos[0]?.photo_url || photos[0]?.url || image;
            } catch { }

            const numericRating =
              typeof service.rating === "number"
                ? service.rating
                : parseFloat(service.rating) || 0;

            const numericPrice =
              typeof service.price === "number"
                ? service.price
                : parseFloat(service.price) || 0;

            return {
              id,
              name: service.name || service.title || "Untitled Service",
              location: service.location_text || service.location || "Unknown",
              price: numericPrice,
              rating: numericRating,
              image,
              isFeatured: Math.random() > 0.7,
            };
          })
        );

        setServices(withPhotos);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || error)
    return (
      <section className="py-16 bg-slate-50 text-center text-slate-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            {error ? (
              <span className="text-red-600">{error}</span>
            ) : (
              "Loading featured services..."
            )}
          </div>
        </div>
      </section>
    );

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
          Discover hand-picked professionals with top ratings and customer satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {services.map((s) => (
          <ServiceCard
            key={s.id}
            id={s.id}
            name={s.name}
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
    </section>
  );
}
