import { Movie } from "@/types/movie";
import neonDreamsPoster from "@/assets/neon-dreams-poster.jpg";
import shadowsEdgePoster from "@/assets/shadows-edge-poster.jpg";
import quantumRealmPoster from "@/assets/quantum-realm-poster.jpg";
import lastGuardianPoster from "@/assets/last-guardian-poster.jpg";
import oceansHeartPoster from "@/assets/oceans-heart-poster.jpg";
import midnightRunnerPoster from "@/assets/midnight-runner-poster.jpg";

export const movies: Movie[] = [
  {
    id: "1",
    title: "Neon Dreams",
    year: 2024,
    genre: ["Sci-Fi", "Thriller"],
    rating: 8.7,
    description: "In a cyberpunk future, a hacker discovers a conspiracy that threatens the fabric of digital reality itself.",
    director: "Alex Chen",
    cast: ["Emma Stone", "Oscar Isaac", "Tilda Swinton"],
    runtime: 142,
    poster: neonDreamsPoster,
    imdbRating: 8.7
  },
  {
    id: "2", 
    title: "Shadow's Edge",
    year: 2023,
    genre: ["Action", "Thriller"],
    rating: 8.2,
    description: "A former assassin must protect a key witness while being hunted by his former employers through the dark streets of Prague.",
    director: "Maria Rodriguez",
    cast: ["Idris Elba", "Charlize Theron", "John Boyega"],
    runtime: 118,
    poster: shadowsEdgePoster,
    imdbRating: 8.2
  },
  {
    id: "3",
    title: "Quantum Realm", 
    year: 2024,
    genre: ["Sci-Fi", "Adventure"],
    rating: 9.1,
    description: "When parallel dimensions begin colliding, a team of scientists races to prevent the destruction of all realities.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Michael Caine"],
    runtime: 165,
    poster: quantumRealmPoster,
    imdbRating: 9.1
  },
  {
    id: "4",
    title: "The Last Guardian",
    year: 2023,
    genre: ["Fantasy", "Adventure"],
    rating: 8.9,
    description: "In a world where magic is fading, the last remaining guardian must train an unlikely hero to save their realm.",
    director: "Peter Jackson",
    cast: ["Saoirse Ronan", "Benedict Cumberbatch", "Ian McKellen"],
    runtime: 156,
    poster: lastGuardianPoster,
    imdbRating: 8.9
  },
  {
    id: "5",
    title: "Ocean's Heart",
    year: 2024,
    genre: ["Romance", "Drama"],
    rating: 8.4,
    description: "A marine biologist and a lighthouse keeper find love while working to save a dying coral reef ecosystem.",
    director: "Greta Gerwig",
    cast: ["Timothée Chalamet", "Zendaya", "Laura Dern"],
    runtime: 127,
    poster: oceansHeartPoster,
    imdbRating: 8.4
  },
  {
    id: "6",
    title: "Midnight Runner",
    year: 2023,
    genre: ["Action", "Thriller"],
    rating: 8.0,
    description: "A courier with a dark past must deliver a mysterious package while evading both law enforcement and criminal organizations.",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Ana de Armas", "Oscar Isaac"],
    runtime: 134,
    poster: midnightRunnerPoster,
    imdbRating: 8.0
  }
];

export const getMoviesByGenre = (genre: string): Movie[] => {
  return movies.filter(movie => 
    movie.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
  );
};

export const searchMovies = (query: string): Movie[] => {
  const lowerQuery = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(lowerQuery) ||
    movie.genre.some(g => g.toLowerCase().includes(lowerQuery)) ||
    movie.director.toLowerCase().includes(lowerQuery) ||
    movie.cast.some(actor => actor.toLowerCase().includes(lowerQuery))
  );
};