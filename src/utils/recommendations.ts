import { Movie, UserRating, RecommendationResult, RecommendationFilters } from '../types/movie';
import { movies, userRatings } from '../data/movies';

/**
 * Content-Based Filtering Algorithm
 * Recommends movies based on similarity to a given movie using:
 * - Genre overlap
 * - Director similarity
 * - Cast overlap
 * - Year proximity
 * - Rating similarity
 */
export function getContentBasedRecommendations(
  targetMovieId: number,
  limit: number = 5,
  filters?: RecommendationFilters
): RecommendationResult[] {
  const targetMovie = movies.find(m => m.id === targetMovieId);
  if (!targetMovie) return [];

  let candidateMovies = movies.filter(m => m.id !== targetMovieId);
  
  // Apply filters
  if (filters) {
    candidateMovies = applyFilters(candidateMovies, filters);
  }

  const recommendations = candidateMovies.map(movie => {
    const score = calculateContentSimilarity(targetMovie, movie);
    const reason = generateContentReason(targetMovie, movie, score);
    
    return {
      movie,
      score,
      reason
    };
  });

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Collaborative Filtering Algorithm
 * Recommends movies based on users with similar preferences
 */
export function getCollaborativeRecommendations(
  userId: number,
  limit: number = 5,
  filters?: RecommendationFilters
): RecommendationResult[] {
  const userMovieRatings = userRatings.filter(r => r.userId === userId);
  const userMovieIds = new Set(userMovieRatings.map(r => r.movieId));
  
  // Find similar users
  const similarUsers = findSimilarUsers(userId);
  
  // Get recommendations from similar users
  const movieScores = new Map<number, { totalScore: number, count: number, reasons: string[] }>();
  
  similarUsers.forEach(({ userId: similarUserId, similarity }) => {
    const similarUserRatings = userRatings.filter(r => 
      r.userId === similarUserId && !userMovieIds.has(r.movieId)
    );
    
    similarUserRatings.forEach(rating => {
      const current = movieScores.get(rating.movieId) || { totalScore: 0, count: 0, reasons: [] };
      current.totalScore += rating.rating * similarity;
      current.count += 1;
      current.reasons.push(`User with ${(similarity * 100).toFixed(0)}% similarity rated it ${rating.rating}/5`);
      movieScores.set(rating.movieId, current);
    });
  });

  let candidateMovies = Array.from(movieScores.entries())
    .map(([movieId, data]) => {
      const movie = movies.find(m => m.id === movieId);
      if (!movie) return null;
      
      return {
        movie,
        score: data.totalScore / data.count,
        reason: `Recommended by users with similar taste: ${data.reasons[0]}`
      };
    })
    .filter((item): item is RecommendationResult => item !== null);

  // Apply filters
  if (filters) {
    candidateMovies = candidateMovies.filter(rec => 
      matchesFilters(rec.movie, filters)
    );
  }

  return candidateMovies
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Hybrid Recommendation Algorithm
 * Combines content-based and collaborative filtering
 */
export function getHybridRecommendations(
  movieId: number,
  userId: number,
  limit: number = 5,
  filters?: RecommendationFilters
): RecommendationResult[] {
  const contentRecs = getContentBasedRecommendations(movieId, limit * 2, filters);
  const collabRecs = getCollaborativeRecommendations(userId, limit * 2, filters);
  
  const hybridScores = new Map<number, RecommendationResult>();
  
  // Combine scores with weights (60% content, 40% collaborative)
  contentRecs.forEach(rec => {
    hybridScores.set(rec.movie.id, {
      ...rec,
      score: rec.score * 0.6,
      reason: `Content: ${rec.reason}`
    });
  });
  
  collabRecs.forEach(rec => {
    const existing = hybridScores.get(rec.movie.id);
    if (existing) {
      existing.score += rec.score * 0.4;
      existing.reason += ` | Collaborative: ${rec.reason}`;
    } else {
      hybridScores.set(rec.movie.id, {
        ...rec,
        score: rec.score * 0.4,
        reason: `Collaborative: ${rec.reason}`
      });
    }
  });
  
  return Array.from(hybridScores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Genre-based recommendations
 */
export function getGenreBasedRecommendations(
  genre: string,
  limit: number = 10,
  filters?: RecommendationFilters
): RecommendationResult[] {
  let candidateMovies = movies.filter(movie => 
    movie.genre.includes(genre)
  );
  
  if (filters) {
    candidateMovies = applyFilters(candidateMovies, filters);
  }
  
  return candidateMovies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
    .map(movie => ({
      movie,
      score: movie.rating / 10,
      reason: `Top-rated ${genre} movie with ${movie.rating}/10 rating`
    }));
}

/**
 * Search movies by title, director, or cast
 */
export function searchMovies(query: string, limit: number = 10): Movie[] {
  const searchTerm = query.toLowerCase();
  
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm) ||
    movie.director.toLowerCase().includes(searchTerm) ||
    movie.cast.some(actor => actor.toLowerCase().includes(searchTerm)) ||
    movie.genre.some(g => g.toLowerCase().includes(searchTerm))
  ).slice(0, limit);
}

// Helper functions

function calculateContentSimilarity(movie1: Movie, movie2: Movie): number {
  let score = 0;
  
  // Genre similarity (40% weight)
  const genreOverlap = movie1.genre.filter(g => movie2.genre.includes(g)).length;
  const genreScore = genreOverlap / Math.max(movie1.genre.length, movie2.genre.length);
  score += genreScore * 0.4;
  
  // Director similarity (20% weight)
  const directorScore = movie1.director === movie2.director ? 1 : 0;
  score += directorScore * 0.2;
  
  // Cast overlap (20% weight)
  const castOverlap = movie1.cast.filter(actor => movie2.cast.includes(actor)).length;
  const castScore = castOverlap > 0 ? castOverlap / Math.max(movie1.cast.length, movie2.cast.length) : 0;
  score += castScore * 0.2;
  
  // Year proximity (10% weight)
  const yearDiff = Math.abs(movie1.year - movie2.year);
  const yearScore = Math.max(0, 1 - yearDiff / 50); // Normalize over 50 years
  score += yearScore * 0.1;
  
  // Rating similarity (10% weight)
  const ratingDiff = Math.abs(movie1.rating - movie2.rating);
  const ratingScore = Math.max(0, 1 - ratingDiff / 10); // Normalize over 10 point scale
  score += ratingScore * 0.1;
  
  return score;
}

function generateContentReason(movie1: Movie, movie2: Movie, score: number): string {
  const reasons = [];
  
  const genreOverlap = movie1.genre.filter(g => movie2.genre.includes(g));
  if (genreOverlap.length > 0) {
    reasons.push(`shares ${genreOverlap.join(', ')} genre${genreOverlap.length > 1 ? 's' : ''}`);
  }
  
  if (movie1.director === movie2.director) {
    reasons.push(`same director (${movie1.director})`);
  }
  
  const castOverlap = movie1.cast.filter(actor => movie2.cast.includes(actor));
  if (castOverlap.length > 0) {
    reasons.push(`features ${castOverlap.slice(0, 2).join(', ')}`);
  }
  
  const yearDiff = Math.abs(movie1.year - movie2.year);
  if (yearDiff <= 5) {
    reasons.push(`from similar era (${movie2.year})`);
  }
  
  return reasons.length > 0 
    ? `${(score * 100).toFixed(0)}% match - ${reasons.slice(0, 2).join(' and ')}`
    : `${(score * 100).toFixed(0)}% similarity match`;
}

function findSimilarUsers(userId: number): Array<{ userId: number, similarity: number }> {
  const userMovieRatings = userRatings.filter(r => r.userId === userId);
  const userMovieIds = new Set(userMovieRatings.map(r => r.movieId));
  
  const otherUsers = [...new Set(userRatings.map(r => r.userId))].filter(id => id !== userId);
  
  return otherUsers.map(otherUserId => {
    const otherUserRatings = userRatings.filter(r => r.userId === otherUserId);
    const commonMovies = otherUserRatings.filter(r => userMovieIds.has(r.movieId));
    
    if (commonMovies.length === 0) return { userId: otherUserId, similarity: 0 };
    
    // Calculate Pearson correlation coefficient
    const userRatingMap = new Map(userMovieRatings.map(r => [r.movieId, r.rating]));
    const otherRatingMap = new Map(otherUserRatings.map(r => [r.movieId, r.rating]));
    
    let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0;
    
    commonMovies.forEach(({ movieId }) => {
      const rating1 = userRatingMap.get(movieId)!;
      const rating2 = otherRatingMap.get(movieId)!;
      
      sum1 += rating1;
      sum2 += rating2;
      sum1Sq += rating1 * rating1;
      sum2Sq += rating2 * rating2;
      pSum += rating1 * rating2;
    });
    
    const n = commonMovies.length;
    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));
    
    const similarity = den === 0 ? 0 : num / den;
    
    return { userId: otherUserId, similarity: Math.max(0, similarity) };
  }).filter(u => u.similarity > 0.1)
    .sort((a, b) => b.similarity - a.similarity);
}

function applyFilters(movies: Movie[], filters: RecommendationFilters): Movie[] {
  return movies.filter(movie => matchesFilters(movie, filters));
}

function matchesFilters(movie: Movie, filters: RecommendationFilters): boolean {
  if (filters.genre && !movie.genre.includes(filters.genre)) return false;
  if (filters.yearFrom && movie.year < filters.yearFrom) return false;
  if (filters.yearTo && movie.year > filters.yearTo) return false;
  if (filters.minRating && movie.rating < filters.minRating) return false;
  if (filters.director && movie.director !== filters.director) return false;
  return true;
}