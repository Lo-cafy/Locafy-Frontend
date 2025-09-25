"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/Components/Services/sidebar";
import ServiceCard from "@/Components/Services/serviceCard";
import SearchBar from "@/Components/Services/searchBar";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category_id: number;
  location?: string;
  image?: string;  
  isFeatured?: boolean;
}

export default function ServiceListingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState<{
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }>({});
  const [searchText, setSearchText] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        // Step 1: Fetch services
        let url = "http://localhost:5000/api/services";
        if (filters.categoryId) {
          url = `http://localhost:5000/api/services/category/${filters.categoryId}`;
        }
        const res = await axios.get(url);
        let apiServices = res.data.services || res.data;

        // Step 2: Fetch images for each service
        const servicesWithImages = await Promise.all(
          apiServices.map(async (service: any) => {
            try {
              const photoRes = await axios.get(
                `http://localhost:5000/api/photoservices/${service.id}/photos`
              );
              const photos = photoRes.data.data.photos || [];

              const primaryPhoto =
                photos.find((p: any) => p.is_primary) || photos[0];

              return {
                ...service,
                image: primaryPhoto ? primaryPhoto.photo_url : "",
              };
            } catch (err) {
              console.error("Failed to fetch photos for service", service.id);
              return { ...service, image: "" };
            }
          })
        );

        // Step 3: Apply price and rating filters
        let filteredServices = servicesWithImages.filter((s: any) => {
          const price = Number(s.price);
          const rating = Number(s.rating);
          if (filters.minPrice && price < filters.minPrice) return false;
          if (filters.maxPrice && price > filters.maxPrice) return false;
          if (filters.minRating && rating < filters.minRating) return false;
          return true;
        });

        // Step 4: Apply search text filter
        if (searchText.trim()) {
          const text = searchText.toLowerCase();
          filteredServices = filteredServices.filter(
            (s: any) =>
              s.title.toLowerCase().includes(text) ||
              s.description.toLowerCase().includes(text)
          );
        }

        setServices(filteredServices);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [filters, searchText]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <Sidebar filters={filters} setFilters={setFilters} />

        {/* Main */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">Services</h1>

          {/* Search bar */}
          <SearchBar searchText={searchText} setSearchText={setSearchText} />

          {loading ? (
            <p>Loading services...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : services.length === 0 ? (
            <p>No services found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ServiceCard
                  key={s.id}
                  name={s.title}
                  location={s.location || "Unknown location"}
                  price={Number(s.price)}
                  rating={Number(s.rating)}
                  image={s.image}      // <-- show fetched image
                  isFeatured={s.isFeatured}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
