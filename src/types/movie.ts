export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  description: string;
  director: string;
  cast: string[];
  runtime: number;
  poster: string;
  imdbRating?: number;
}

export interface RecommendationResult {
  movie: Movie;
  similarity: number;
  reason: string;
}

export type Genre = 
  | "Action"
  | "Adventure" 
  | "Sci-Fi"
  | "Thriller"
  | "Drama"
  | "Fantasy"
  | "Romance"
  | "Comedy"
  | "Horror"
  | "Mystery";

export interface SearchFilters {
  genre?: Genre;
  yearRange?: { min: number; max: number };
  ratingMin?: number;
}