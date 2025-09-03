import { useState, useEffect } from 'react';
import { Movie, RecommendationResult, RecommendationFilters } from '../types/movie';
import { movies } from '../data/movies';
import { 
  getContentBasedRecommendations, 
  getCollaborativeRecommendations,
  getHybridRecommendations,
  getGenreBasedRecommendations,
  searchMovies 
} from '../utils/recommendations';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { RecommendationSection } from '../components/RecommendationSection';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Film, Brain, Users, Sparkles, TrendingUp } from 'lucide-react';

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [contentRecs, setContentRecs] = useState<RecommendationResult[]>([]);
  const [collabRecs, setCollabRecs] = useState<RecommendationResult[]>([]);
  const [hybridRecs, setHybridRecs] = useState<RecommendationResult[]>([]);
  const [genreRecs, setGenreRecs] = useState<RecommendationResult[]>([]);
  const [filters, setFilters] = useState<RecommendationFilters>({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  // Simulated current user ID for collaborative filtering
  const currentUserId = 1;

  useEffect(() => {
    // Show top-rated movies initially
    const topMovies = [...movies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
    setSearchResults(topMovies);
  }, []);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setLoading(true);
    setActiveTab('recommendations');

    // Simulate API call delay
    setTimeout(() => {
      const contentRecommendations = getContentBasedRecommendations(movie.id, 8, filters);
      const collabRecommendations = getCollaborativeRecommendations(currentUserId, 8, filters);
      const hybridRecommendations = getHybridRecommendations(movie.id, currentUserId, 8, filters);

      setContentRecs(contentRecommendations);
      setCollabRecs(collabRecommendations);
      setHybridRecs(hybridRecommendations);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchMovies(query, 12);
      setSearchResults(results);
    } else {
      // Show top-rated movies if no query
      const topMovies = [...movies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
      setSearchResults(topMovies);
    }
  };

  const handleGenreSelect = (genre: string) => {
    const recommendations = getGenreBasedRecommendations(genre, 12, filters);
    setGenreRecs(recommendations);
    setActiveTab('genre');
  };

  const handleFilterChange = (newFilters: RecommendationFilters) => {
    setFilters(newFilters);
    // Re-run recommendations if a movie is selected
    if (selectedMovie) {
      handleMovieSelect(selectedMovie);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Film className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                CineMind AI
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover your next favorite movie with our intelligent recommendation system. 
              Powered by content-based, collaborative, and hybrid filtering algorithms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="text-center border-primary/20">
                <CardContent className="pt-6">
                  <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Content-Based</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyzes movie features like genre, director, and cast to find similar films
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-primary/20">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Collaborative</h3>
                  <p className="text-sm text-muted-foreground">
                    Recommends based on preferences of users with similar taste
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-primary/20">
                <CardContent className="pt-6">
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Hybrid AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Combines multiple algorithms for the most accurate recommendations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <SearchBar 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onGenreSelect={handleGenreSelect}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              Browse Movies
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2" disabled={!selectedMovie}>
              <TrendingUp className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="genre" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Genre Browse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  {searchResults.length > 0 ? 'Search Results' : 'Top Rated Movies'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click on any movie to get personalized recommendations
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchResults.map((movie) => (
                    <div key={movie.id} onClick={() => handleMovieSelect(movie)} className="cursor-pointer">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            {selectedMovie && (
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Film className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl">Recommendations for:</h2>
                      <h3 className="text-2xl font-bold text-primary">{selectedMovie.title}</h3>
                    </div>
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.genre.map((genre) => (
                      <Badge key={genre} variant="secondary">{genre}</Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            )}

            <div className="space-y-8">
              <RecommendationSection
                title="🤖 Hybrid AI Recommendations"
                description="Our most advanced algorithm combining content-based and collaborative filtering for optimal results"
                recommendations={hybridRecs}
                loading={loading}
              />

              <RecommendationSection
                title="🎬 Content-Based Recommendations"
                description="Movies similar in genre, director, cast, and other attributes"
                recommendations={contentRecs}
                loading={loading}
              />

              <RecommendationSection
                title="👥 Collaborative Filtering"
                description="Recommendations based on users with similar preferences"
                recommendations={collabRecs}
                loading={loading}
              />
            </div>
          </TabsContent>

          <TabsContent value="genre" className="space-y-6">
            <RecommendationSection
              title="Genre-Based Recommendations"
              description="Top-rated movies in the selected genre"
              recommendations={genreRecs}
              loading={false}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
