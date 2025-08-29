import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { movies, searchMovies, getMoviesByGenre } from "@/data/movies";
import { getRecommendations } from "@/utils/recommendations";
import { Movie, Genre } from "@/types/movie";
import { Film, Sparkles, TrendingUp, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Filter movies based on search and genre
  const filteredMovies = useMemo(() => {
    let result = movies;
    
    if (searchQuery) {
      result = searchMovies(searchQuery);
    }
    
    if (selectedGenre) {
      result = result.filter(movie => 
        movie.genre.includes(selectedGenre)
      );
    }
    
    return result;
  }, [searchQuery, selectedGenre]);

  // Get recommendations if a movie is selected
  const recommendations = useMemo(() => {
    if (!selectedMovie) return [];
    return getRecommendations(selectedMovie, movies, 4);
  }, [selectedMovie]);

  // Featured movies (highest rated)
  const featuredMovies = useMemo(() => {
    return movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, []);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    // Scroll to recommendations section
    setTimeout(() => {
      document.getElementById('recommendations')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Film className="w-8 h-8 text-cinema-gold" />
                <Badge 
                  variant="outline" 
                  className="border-cinema-gold/30 text-cinema-gold bg-cinema-gold/5"
                >
                  AI-Powered
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-cinema-gold to-foreground bg-clip-text text-transparent">
                CineMind AI
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover your next favorite movie with intelligent recommendations powered by content analysis and machine learning
              </p>
            </div>
            
            <SearchBar 
              onSearch={setSearchQuery}
              onGenreFilter={setSelectedGenre}
              selectedGenre={selectedGenre}
            />
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-cinema-gold" />
                <span>1000+ Movies Analyzed</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cinema-blue" />
                <span>Smart Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cinema-purple" />
                <span>Content-Based Filtering</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      {!searchQuery && !selectedGenre && (
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-cinema-gold" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Featured Movies
              </h2>
              <Badge variant="secondary" className="bg-cinema-gold/10 text-cinema-gold border-cinema-gold/20">
                Top Rated
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMovies.map((movie) => (
                <div key={movie.id} onClick={() => handleMovieSelect(movie)}>
                  <MovieCard 
                    movie={movie} 
                    className="cursor-pointer hover:shadow-glow-gold transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search Results Section */}
      {(searchQuery || selectedGenre) && (
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Film className="w-6 h-6 text-cinema-blue" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedGenre} Movies`}
                </h2>
                <Badge variant="outline" className="border-cinema-blue/30 text-cinema-blue">
                  {filteredMovies.length} found
                </Badge>
              </div>
              
              {(searchQuery || selectedGenre) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre(undefined);
                  }}
                  className="hover:bg-cinema-gold/10 hover:text-cinema-gold"
                >
                  Clear Filters
                </Button>
              )}
            </div>
            
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} onClick={() => handleMovieSelect(movie)}>
                    <MovieCard 
                      movie={movie} 
                      className="cursor-pointer hover:shadow-glow-blue transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center bg-card border-border/50">
                <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No movies found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more movies.
                </p>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {selectedMovie && recommendations.length > 0 && (
        <section id="recommendations" className="px-4 py-12 bg-cinema-dark/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-cinema-purple" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Because you liked "{selectedMovie.title}"
                </h2>
              </div>
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI analyzed the content, genre, cast, and director to find movies with similar characteristics
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map(({ movie, reason }) => (
                <div key={movie.id} className="space-y-3">
                  <div onClick={() => handleMovieSelect(movie)}>
                    <MovieCard 
                      movie={movie} 
                      className="cursor-pointer hover:shadow-glow-purple transition-all duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <Badge 
                      variant="outline" 
                      className="text-xs border-cinema-purple/30 text-cinema-purple bg-cinema-purple/5"
                    >
                      {reason}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button
                variant="ghost"
                onClick={() => setSelectedMovie(null)}
                className="hover:bg-cinema-purple/10 hover:text-cinema-purple"
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-border/20">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Film className="w-5 h-5 text-cinema-gold" />
            <span className="font-semibold text-foreground">CineMind AI</span>
          </div>
          <p className="text-sm">
            Movie Recommendation System powered by Content-Based Filtering • 
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;