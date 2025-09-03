import { RecommendationResult } from '../types/movie';
import { MovieCard } from './MovieCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface RecommendationSectionProps {
  title: string;
  description: string;
  recommendations: RecommendationResult[];
  loading?: boolean;
}

export function RecommendationSection({ 
  title, 
  description, 
  recommendations, 
  loading 
}: RecommendationSectionProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No recommendations available. Try adjusting your filters or selecting a different movie.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendations.map((rec, index) => (
            <MovieCard 
              key={rec.movie.id} 
              movie={rec.movie} 
              showReason={true}
              reason={rec.reason}
              score={rec.score}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}