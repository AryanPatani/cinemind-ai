import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Genre } from "@/types/movie";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onGenreFilter: (genre: Genre | undefined) => void;
  selectedGenre?: Genre;
}

const genres: Genre[] = [
  "Action", "Adventure", "Sci-Fi", "Thriller", "Drama", 
  "Fantasy", "Romance", "Comedy", "Horror", "Mystery"
];

export const SearchBar = ({ onSearch, onGenreFilter, selectedGenre }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleGenreChange = (genre: string) => {
    const selectedGenreValue = genre === "all" ? undefined : genre as Genre;
    onGenreFilter(selectedGenreValue);
  };

  const clearFilters = () => {
    onGenreFilter(undefined);
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Search movies by title, genre, director, or cast..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-16 h-14 text-lg bg-card border-border/50 focus:border-cinema-gold focus:ring-cinema-gold/20"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-cinema-gold/10 hover:text-cinema-gold"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-card border border-border/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Genre
              </label>
              <Select onValueChange={handleGenreChange} value={selectedGenre || "all"}>
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {selectedGenre && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <Badge
            variant="secondary"
            className="bg-cinema-gold/10 text-cinema-gold border-cinema-gold/20 hover:bg-cinema-gold/20 cursor-pointer"
            onClick={() => onGenreFilter(undefined)}
          >
            {selectedGenre} ×
          </Badge>
        </div>
      )}
    </div>
  );
};