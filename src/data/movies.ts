import { Movie, UserRating } from '../types/movie';

// Simulated IMDB dataset of top 1000 movies
export const movies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    rating: 9.3,
    votes: 2500000,
    runtime: 142,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    rating: 9.2,
    votes: 1800000,
    runtime: 175,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    rating: 9.0,
    votes: 2600000,
    runtime: 152,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    rating: 8.9,
    votes: 2000000,
    runtime: 154,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    rating: 8.8,
    votes: 2100000,
    runtime: 142,
    description: "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75."
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    rating: 8.8,
    votes: 2300000,
    runtime: 148,
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea."
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    director: "Lana Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    rating: 8.7,
    votes: 1900000,
    runtime: 136,
    description: "A computer programmer discovers that reality as he knows it is actually a simulation controlled by machines."
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    rating: 8.7,
    votes: 1100000,
    runtime: 146,
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners."
  },
  {
    id: 9,
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    rating: 8.6,
    votes: 1700000,
    runtime: 169,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: ["Adventure", "Drama", "Fantasy"],
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    rating: 8.8,
    votes: 1800000,
    runtime: 178,
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring."
  },
  {
    id: 11,
    title: "Fight Club",
    year: 1999,
    genre: ["Drama"],
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    rating: 8.8,
    votes: 2000000,
    runtime: 139,
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club."
  },
  {
    id: 12,
    title: "The Silence of the Lambs",
    year: 1991,
    genre: ["Crime", "Drama", "Thriller"],
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    rating: 8.6,
    votes: 1400000,
    runtime: 118,
    description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer."
  },
  {
    id: 13,
    title: "Saving Private Ryan",
    year: 1998,
    genre: ["Drama", "War"],
    director: "Steven Spielberg",
    cast: ["Tom Hanks", "Matt Damon", "Tom Sizemore"],
    rating: 8.6,
    votes: 1300000,
    runtime: 169,
    description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper."
  },
  {
    id: 14,
    title: "Schindler's List",
    year: 1993,
    genre: ["Biography", "Drama", "History"],
    director: "Steven Spielberg",
    cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    rating: 9.0,
    votes: 1400000,
    runtime: 195,
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce."
  },
  {
    id: 15,
    title: "Titanic",
    year: 1997,
    genre: ["Drama", "Romance"],
    director: "James Cameron",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
    rating: 7.9,
    votes: 1200000,
    runtime: 194,
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
  }
];

// Simulated user ratings for collaborative filtering
export const userRatings: UserRating[] = [
  // User 1 ratings
  { userId: 1, movieId: 1, rating: 5 },
  { userId: 1, movieId: 2, rating: 5 },
  { userId: 1, movieId: 3, rating: 4 },
  { userId: 1, movieId: 4, rating: 5 },
  { userId: 1, movieId: 8, rating: 4 },
  
  // User 2 ratings
  { userId: 2, movieId: 1, rating: 5 },
  { userId: 2, movieId: 2, rating: 4 },
  { userId: 2, movieId: 5, rating: 5 },
  { userId: 2, movieId: 6, rating: 4 },
  { userId: 2, movieId: 9, rating: 5 },
  
  // User 3 ratings
  { userId: 3, movieId: 3, rating: 5 },
  { userId: 3, movieId: 6, rating: 5 },
  { userId: 3, movieId: 7, rating: 4 },
  { userId: 3, movieId: 9, rating: 4 },
  { userId: 3, movieId: 10, rating: 5 },
  
  // Add more user ratings for better collaborative filtering
  { userId: 4, movieId: 1, rating: 4 },
  { userId: 4, movieId: 11, rating: 5 },
  { userId: 4, movieId: 12, rating: 4 },
  { userId: 4, movieId: 13, rating: 5 },
  
  { userId: 5, movieId: 2, rating: 5 },
  { userId: 5, movieId: 4, rating: 4 },
  { userId: 5, movieId: 8, rating: 5 },
  { userId: 5, movieId: 14, rating: 5 },
];

export const genres = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", 
  "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", 
  "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", 
  "Thriller", "War", "Western"
];