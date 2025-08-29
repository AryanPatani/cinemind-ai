import { Movie, RecommendationResult } from "@/types/movie";

// Simple content-based recommendation algorithm
export const getRecommendations = (
  targetMovie: Movie,
  allMovies: Movie[],
  count: number = 4
): RecommendationResult[] => {
  const recommendations: RecommendationResult[] = [];
  
  allMovies.forEach(movie => {
    if (movie.id === targetMovie.id) return;
    
    let similarity = 0;
    let reasons: string[] = [];
    
    // Genre similarity (40% weight)
    const sharedGenres = movie.genre.filter(genre => 
      targetMovie.genre.includes(genre)
    );
    const genreSimilarity = sharedGenres.length / Math.max(movie.genre.length, targetMovie.genre.length);
    similarity += genreSimilarity * 0.4;
    
    if (sharedGenres.length > 0) {
      reasons.push(`shares ${sharedGenres.join(", ")} genre${sharedGenres.length > 1 ? "s" : ""}`);
    }
    
    // Director similarity (20% weight)
    if (movie.director === targetMovie.director) {
      similarity += 0.2;
      reasons.push(`same director (${movie.director})`);
    }
    
    // Cast similarity (15% weight)
    const sharedCast = movie.cast.filter(actor => 
      targetMovie.cast.includes(actor)
    );
    if (sharedCast.length > 0) {
      const castSimilarity = sharedCast.length / Math.max(movie.cast.length, targetMovie.cast.length);
      similarity += castSimilarity * 0.15;
      reasons.push(`stars ${sharedCast.slice(0, 2).join(", ")}`);
    }
    
    // Year proximity (10% weight)
    const yearDiff = Math.abs(movie.year - targetMovie.year);
    const yearSimilarity = Math.max(0, 1 - yearDiff / 10);
    similarity += yearSimilarity * 0.1;
    
    // Rating similarity (15% weight)
    const ratingDiff = Math.abs(movie.rating - targetMovie.rating);
    const ratingSimilarity = Math.max(0, 1 - ratingDiff / 2);
    similarity += ratingSimilarity * 0.15;
    
    if (movie.rating >= 8) {
      reasons.push("highly rated");
    }
    
    if (similarity > 0.1) { // Only include if there's some similarity
      recommendations.push({
        movie,
        similarity,
        reason: reasons.length > 0 ? reasons.join(" • ") : "similar style"
      });
    }
  });
  
  // Sort by similarity and return top recommendations
  return recommendations
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count);
};

// Get recommendations based on genres
export const getGenreRecommendations = (
  genres: string[],
  allMovies: Movie[],
  count: number = 6
): Movie[] => {
  const genreMovies = allMovies.filter(movie =>
    movie.genre.some(g => genres.some(genre => 
      g.toLowerCase().includes(genre.toLowerCase())
    ))
  );
  
  return genreMovies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
};