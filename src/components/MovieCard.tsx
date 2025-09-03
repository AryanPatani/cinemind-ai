import { Movie } from '../types/movie';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Clock, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  showReason?: boolean;
  reason?: string;
  score?: number;
}

export function MovieCard({ movie, showReason, reason, score }: MovieCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
      <CardContent className="p-0">
        <div className="aspect-[2/3] bg-gradient-to-br from-primary/5 to-secondary/10 rounded-t-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="text-center z-10 p-4">
            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{movie.title}</h3>
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-foreground">{movie.rating}</span>
              <span className="text-xs text-muted-foreground">({movie.votes.toLocaleString()})</span>
            </div>
          </div>
          
          {score && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 right-2 bg-primary/90 text-primary-foreground"
            >
              {(score * 100).toFixed(0)}% match
            </Badge>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{movie.year}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span>{movie.runtime}min</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Director: {movie.director}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              Cast: {movie.cast.slice(0, 3).join(', ')}
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {movie.description}
          </p>
          
          {showReason && reason && (
            <div className="mt-3 p-2 bg-accent/50 rounded-md">
              <p className="text-xs text-accent-foreground font-medium">
                Why recommended: {reason}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}