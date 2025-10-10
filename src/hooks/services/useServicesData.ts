import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "@/api/baseUrl";
import { extractServicesArray, extractPhotosArray, getPrimaryPhoto, normalizeService } from "@/lib/api";
import type { ServiceType, Filters } from "@/types/services";

export function useServicesData(filters: Filters, searchText: string, locationText: string) {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let url = filters.categoryId 
          ? `${BASE_URL}${API_ENDPOINTS.SERVICES_BY_CATEGORY(filters.categoryId)}`
          : `${BASE_URL}${API_ENDPOINTS.SERVICES}`;
        
        const res = await axios.get(url);
        let apiServices = extractServicesArray(res.data);

        if (!Array.isArray(apiServices)) {
          setError("Invalid data format received");
          setServices([]);
          return;
        }

        const servicesWithImages = await Promise.all(
          apiServices.map(async (service) => {
            const normalized = normalizeService(service);
            if (!normalized.id) return normalized;
            try {
              const photoRes = await axios.get(`${BASE_URL}${API_ENDPOINTS.PHOTOS(normalized.id)}`);
              const photos = extractPhotosArray(photoRes.data);
              const url = getPrimaryPhoto(photos);
              return { ...normalized, image: url } as ServiceType;
            } catch {
              return normalized;
            }
          })
        );

        setServices(servicesWithImages);
        setError("");
      } catch (err) {
        setError("Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [filters, searchText, locationText, refreshToken]);

  const refetch = () => setRefreshToken(prev => prev + 1);

  return {
    services,
    loading,
    error,
    refetch
  };
}
