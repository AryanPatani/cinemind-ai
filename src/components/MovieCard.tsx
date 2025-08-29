import { Movie } from "@/types/movie";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export const MovieCard = ({ movie, className }: MovieCardProps) => {
  return (
    <Card className={`group overflow-hidden bg-gradient-card border-border/50 hover:border-cinema-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${className}`}>
      <div className="relative overflow-hidden">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-cinema-dark/80 text-cinema-gold border-cinema-gold/20">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {movie.rating}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-cinema-gold transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {movie.year}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {movie.runtime}m
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {movie.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((genre) => (
              <Badge 
                key={genre} 
                variant="outline" 
                className="text-xs border-cinema-blue/30 text-cinema-blue hover:bg-cinema-blue/10"
              >
                {genre}
              </Badge>
            ))}
            {movie.genre.length > 2 && (
              <Badge variant="outline" className="text-xs border-muted text-muted-foreground">
                +{movie.genre.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p className="font-medium">Director: <span className="font-normal">{movie.director}</span></p>
            <p className="font-medium">Starring: <span className="font-normal">{movie.cast.slice(0, 2).join(", ")}</span></p>
          </div>
        </div>
      </div>
    </Card>
  );
};