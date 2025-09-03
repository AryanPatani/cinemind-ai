import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter } from 'lucide-react';
import { genres } from '../data/movies';
import { RecommendationFilters } from '../types/movie';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: RecommendationFilters) => void;
  onGenreSelect: (genre: string) => void;
}

export function SearchBar({ onSearch, onFilterChange, onGenreSelect }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<RecommendationFilters>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof RecommendationFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search movies, directors, or actors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex gap-2 flex-wrap">
        <Select onValueChange={(value) => onGenreSelect(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Browse by genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-card border rounded-lg">
          <div>
            <label className="text-sm font-medium mb-2 block">Genre</label>
            <Select onValueChange={(value) => handleFilterChange('genre', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any genre</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Year From</label>
            <Input 
              type="number" 
              placeholder="1900"
              min="1900"
              max="2024"
              onChange={(e) => handleFilterChange('yearFrom', parseInt(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Year To</label>
            <Input 
              type="number" 
              placeholder="2024"
              min="1900"
              max="2024"
              onChange={(e) => handleFilterChange('yearTo', parseInt(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Min Rating</label>
            <Input 
              type="number" 
              placeholder="0"
              min="0"
              max="10"
              step="0.1"
              onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
}