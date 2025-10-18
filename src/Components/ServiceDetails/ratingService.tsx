type Review = { rating: number };
export const calculateAvgRating = (reviews: Review[]) =>
  reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
