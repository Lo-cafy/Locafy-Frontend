export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  filter?: Record<string, any>;
  include?: string[];
  fields?: string[];
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  validation?: Record<string, string[]>;
}

export interface ApiRequestConfig {
  headers?: Record<string, string>;
  params?: QueryParams;
  timeout?: number;
  signal?: AbortSignal;
}

export interface ApiFile {
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface BatchOperation<T> {
  success: boolean;
  data: T[];
  errors?: {
    index: number;
    error: ApiError;
  }[];
}

export interface ApiCache {
  key: string;
  data: any;
  timestamp: number;
  ttl: number;
}