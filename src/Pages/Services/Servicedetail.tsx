"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listingApi as api } from "@/Api/baseurl";

import Footer from "@/Components/Footer";
import ImageCarousel from "@/Components/ServiceDetails/ImageCarousel";
import ServiceInfo from "@/Components/ServiceDetails/serviceDetails";
import ReviewSection from "@/Components/ServiceDetails/ReviewSection";
import RelatedServices from "@/Components/ServiceDetails/RelatedService";
import { calculateAvgRating } from "@/Components/ServiceDetails/ratingService";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(1);
  const [reviewFilter, setReviewFilter] = useState("all");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/services/services/${id}`);
        
        // Handle different response structures
        const data: Record<string, unknown> = (res.data.service || res.data.data || res.data) as Record<string, unknown>;
        
        if (!data) {
          console.error("No service data found");
          setService(null);
          return;
        }

        // Use service_id instead of id for photo API call
        const serviceId = (data as { service_id?: number; id?: number }).service_id || (data as { id?: number }).id;
        
        if (!serviceId) {
          console.error("Service ID not found in response:", data);
          setService(null);
          return;
        }

        // Fetch service photos
        const photoRes = await api.get(
          `/api/photoservices/${serviceId}/photos`
        );
        
        // Handle different photo response structures
        let photos: Array<Record<string, unknown>> = [];
        if (photoRes.data.data && Array.isArray(photoRes.data.data.photos)) {
          photos = photoRes.data.data.photos as Array<Record<string, unknown>>;
        } else if (Array.isArray(photoRes.data)) {
          photos = photoRes.data as Array<Record<string, unknown>>;
        } else if (photoRes.data.photos && Array.isArray(photoRes.data.photos)) {
          photos = photoRes.data.photos as Array<Record<string, unknown>>;
        }
        
        (data as Record<string, unknown>).photos = photos;

        // Fetch related services
        const categoryId = (data as { category_id?: number }).category_id;
        if (categoryId) {
          try {
            const relatedRes = await api.get(
              `/api/services/category/${categoryId}`
            );
            
            // Handle different related services response structures
            let relatedServices: unknown[] = [];
            if (relatedRes.data.services && Array.isArray(relatedRes.data.services)) {
              relatedServices = relatedRes.data.services;
            } else if (Array.isArray(relatedRes.data)) {
              relatedServices = relatedRes.data;
            } else if (relatedRes.data.data && Array.isArray(relatedRes.data.data)) {
              relatedServices = relatedRes.data.data;
            }
            
            // Filter out the current service from related services
            (data as Record<string, unknown>).relatedServices = relatedServices.filter((s: unknown) => {
              const obj = s as { service_id?: number; id?: number };
              return (obj.service_id || obj.id) !== serviceId;
            });
          } catch (err) {
            console.error("Error fetching related services:", err);
            (data as Record<string, unknown>).relatedServices = [];
          }
        } else {
          data.relatedServices = [];
        }

        setService(data);
      } catch (err) {
        console.error("Error fetching service:", err);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    } else {
      setService(null);
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="text-center py-16">Loading...</p>;
  if (!service) return <p className="text-center py-16">Service not found</p>;

  type Review = { rating: number };
  const reviewsUnknown = Array.isArray((service as { reviews?: unknown }).reviews)
    ? ((service as { reviews?: unknown[] }).reviews as unknown[])
    : [];
  const reviewsTyped: Review[] = reviewsUnknown.map((r) => {
    const ratingVal = (r as { rating?: number | string })?.rating;
    const rating = typeof ratingVal === "number" ? ratingVal : parseFloat(String(ratingVal ?? 0)) || 0;
    return { rating };
  });
  const avgRating = calculateAvgRating(reviewsTyped);
  type Option = { id: number | string; name: string; price: number; description?: string };
  const rawOptions = (service as { options?: unknown }).options;
  const serviceOptions: Option[] = Array.isArray(rawOptions)
    ? (rawOptions as unknown[]).map((o, idx) => ({
        id: (o as { id?: number | string }).id ?? idx + 1,
        name: String((o as { name?: unknown }).name ?? `Option ${idx + 1}`),
        price: Number((o as { price?: unknown }).price ?? 0),
        description:
          (o as { description?: unknown }).description !== undefined
            ? String((o as { description?: unknown }).description as unknown)
            : undefined,
      }))
    : [
        {
          id: 1,
          name: "Default",
          price: Number((service as { price?: unknown }).price ?? 0),
        },
      ];

  const typedService = {
    id: (service as { id?: number | string }).id,
    service_id: (service as { service_id?: number | string }).service_id,
    type: (service as { type?: string }).type,
    tags: Array.isArray((service as { tags?: unknown }).tags)
      ? ((service as { tags?: string[] }).tags as string[])
      : undefined,
    title: String((service as { title?: unknown }).title ?? ""),
    price: Number((service as { price?: unknown }).price ?? (serviceOptions[0]?.price ?? 0)),
    reviews: Array.isArray((service as { reviews?: unknown }).reviews)
      ? ((service as { reviews?: unknown[] }).reviews as unknown[])
      : [],
    description:
      typeof (service as { description?: unknown }).description === "string"
        ? ((service as { description?: string }).description as string)
        : undefined,
    whatsIncluded: Array.isArray((service as { whatsIncluded?: unknown }).whatsIncluded)
      ? ((service as { whatsIncluded?: string[] }).whatsIncluded as string[])
      : [],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* Navigation */}
      <section className="flex items-center mb-4">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2" size={20} /> Back to Services
        </button>
        <h1 className="ml-auto text-xl sm:text-2xl font-bold text-gray-900">
          {String((service as { title?: string }).title ?? "")}
        </h1>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ImageCarousel images={Array.isArray((service as { photos?: unknown }).photos) ? ((service as { photos?: Array<{ photo_url?: string; url?: string }> }).photos as Array<{ photo_url?: string; url?: string }>).map(p => String(p.photo_url ?? p.url ?? "")) : []} />
        </div>

        <div className="lg:col-span-5">
          <ServiceInfo
            service={typedService}
            serviceOptions={serviceOptions}
            selectedOption={selectedOption}
            setSelectedOption={(id) => setSelectedOption(Number(id))}
            avgRating={avgRating}
          />
        </div>
      </section>

      <ReviewSection
        reviews={service.reviews || []}
        reviewFilter={reviewFilter}
        setReviewFilter={setReviewFilter}
      />

      <RelatedServices related={Array.isArray((service as { relatedServices?: unknown }).relatedServices) ? ((service as { relatedServices?: unknown[] }).relatedServices as unknown[]) : []} />

      <Footer />
    </div>
  );
}