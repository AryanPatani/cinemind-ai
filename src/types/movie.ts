export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  director: string;
  cast: string[];
  rating: number;
  votes: number;
  runtime: number;
  description: string;
  poster?: string;
}

export interface UserRating {
  userId: number;
  movieId: number;
  rating: number;
}

export interface RecommendationResult {
  movie: Movie;
  score: number;
  reason: string;
}

export interface RecommendationFilters {
  genre?: string;
  yearFrom?: number;
  yearTo?: number;
  minRating?: number;
  director?: string;
}