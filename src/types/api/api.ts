export interface ApiService {
  service_id?: number;
  id?: number;
  title?: string;
  location_text?: string;
  price?: number;
  rating?: number;
  image_url?: string;
  is_featured?: boolean;
  provider_name?: string;
  review_count?: number;
  completion_time?: string;
  description?: string;
}

export interface ApiPhoto {
  photo_id: number;
  service_id: number;
  photo_url: string;
  is_primary: boolean;
}


