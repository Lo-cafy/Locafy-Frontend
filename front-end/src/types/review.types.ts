export type Review = {
  reviewId: string;
  serviceId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer?: {
    userId: number;
    firstname: string;
    lastname: string;
    profilePhoto?: string;
  };
};

export type ReviewStats = {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
};

export type CreateReviewInput = {
  serviceId: string;
  rating: number;
  comment?: string;
};