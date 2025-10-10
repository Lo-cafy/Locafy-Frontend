import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "@/api/baseUrl";

export function useCategories() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${BASE_URL}${API_ENDPOINTS.CATEGORIES}`);
        let categoriesData = res.data;
        if (res.data.categories && Array.isArray(res.data.categories)) categoriesData = res.data.categories;
        else if (res.data.data && Array.isArray(res.data.data)) categoriesData = res.data.data;
        else if (res.data.results && Array.isArray(res.data.results)) categoriesData = res.data.results;
        const mapped = Array.isArray(categoriesData)
          ? categoriesData.map((cat: any) => ({ id: cat.category_id || cat.id, name: cat.name || cat.category_name || "Unnamed Category" }))
          : [];
        setCategories(mapped);
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error
  };
}


