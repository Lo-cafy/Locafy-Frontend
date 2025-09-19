export interface ServicePhoto {
  photo_id: number;
  service_id: number;
  photo_url: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface CreateServicePhotoDTO {
  service_id: number;
  photo_url: string;
}

export interface UpdateServicePhotoDTO {
  photo_url?: string;
}