"use client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Star, MapPin, Heart } from "lucide-react";
interface ServiceCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  isFeatured?: boolean;
}
function ServiceCard({ id, name, location, price, rating, image, isFeatured }: ServiceCardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/services/${id}`)}
      className="cursor-pointer group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200 w-full sm:w-[300px] md:w-[340px] lg:w-[360px]"
    >
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={image || "/api/placeholder/400/300"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent" />

        <div className="absolute top-2 left-2 right-2 flex justify-between">
          {isFeatured && (
            <span className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-bold sm:text-sm">
              FEATURED
            </span>
          )}
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-white/80 hover:bg-white text-slate-700 p-1.5 rounded-full transition-all sm:p-2"
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base line-clamp-1 flex-1 mr-2">
            {name}
          </h3>
          <div className="flex items-center bg-slate-100 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs sm:text-sm font-bold ml-1">{rating}</span>
          </div>
        </div>
        <div className="flex items-center text-slate-600 text-xs sm:text-sm mb-3">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-lg font-bold text-blue-600">${price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/services/${id}`);
            }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-xs sm:text-sm font-semibold">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
type Service = {
  id: number;
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  isFeatured?: boolean;
};
export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://back-end-service-listing.onrender.com/api/services");
        let servicesData = response.data;
        if (!Array.isArray(servicesData)) {
          if (servicesData.data && Array.isArray(servicesData.data)) {
            servicesData = servicesData.data;
          } else if (servicesData.services && Array.isArray(servicesData.services)) {
            servicesData = servicesData.services;
          } else if (servicesData.results && Array.isArray(servicesData.results)) {
            servicesData = servicesData.results;
          } else {
            console.error("No array found in response:", servicesData);
            setError("No services data found");
            setServices([]);
            return;
          }
        }
        if (!Array.isArray(servicesData)) {
          console.error("servicesData is not an array:", servicesData);
          setError("Invalid data format received");
          setServices([]);
          return;
        }

        console.log("First service data:", servicesData[0]); 

        const servicesWithPhotos = await Promise.all(
          servicesData.map(async (service) => {
            const serviceId = service.service_id || service.id;
            if (!serviceId) {
              console.error("Service missing ID:", service);
              return {
                ...service,
                id: serviceId,
                location: service.location_text || service.location,
                image: service.image || "/api/placeholder/400/300",
                isFeatured: Math.random() > 0.7,
              };
            }
            try {
              const photosRes = await axios.get(
                `https://back-end-service-listing.onrender.com/api/photoservices/${serviceId}/photos`
              );
              let photos: string[] = [];
              if (photosRes.data && photosRes.data.data && photosRes.data.data.photos) {
                photos = photosRes.data.data.photos.map((p: any) => p.photo_url);
              } else if (Array.isArray(photosRes.data)) {
                photos = photosRes.data.map((p: any) => p.photo_url || p.url);
              } else if (photosRes.data.photos && Array.isArray(photosRes.data.photos)) {
                photos = photosRes.data.photos.map((p: any) => p.photo_url || p.url);
              }
              return {
                ...service,
                id: serviceId, // Map service_id to id for the component
                location: service.location_text || service.location, // Map location_text to location
                image: photos[0] || service.image || "/api/placeholder/400/300",
                isFeatured: Math.random() > 0.7,
              };
            } catch (err) {
              console.error(`Failed to fetch photos for service ${serviceId}`, err);
              return {
                ...service,
                id: serviceId,
                location: service.location_text || service.location,
                image: service.image || "/api/placeholder/400/300",
                isFeatured: Math.random() > 0.7,
              };
            }
          })
        );
        setServices(servicesWithPhotos);
      } catch (err) {
        setError("Failed to fetch services");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-emerald-50">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading services...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-emerald-50">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-emerald-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Featured Local Services</h2>
          <p className="text-gray-600 mt-2 max-w-xl">
            Hand-picked professionals with the highest ratings and customer satisfaction scores in your area.
          </p>
        </div>
        <button
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
          onClick={() => navigate("/all-services")}
        >
          Explore All Services
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s) => (
          <ServiceCard
            key={s.id}
            id={s.id}
            name={s.title}
            location={s.location || "Unknown location"}
            price={parseFloat(s.price)}
            rating={s.rating}
            image={s.image}
            isFeatured={s.isFeatured}
          />
        ))}
      </div>
    </section>
  );
}