import movies from "../../movies.json" with  { type: "json" }// Validaciones
import { randomUUID } from "node:crypto";
 
export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      );
    }   
    return movies
  }
  static async getById({id}){
    const movie = movies.find((movie) => movie.id === id); 
    return movie
  }

  static async create({input}){
    const newMovie = {
        id: randomUUID(), // Genera un ID único
        ...input,
      };
      movies.push(newMovie);
    
      return newMovie
  }

  static async delete({id}){
    const moviesIndex = movies.find((movie) => movie.id === id);
    if(moviesIndex === -1) return false

    movies.splice(moviesIndex, 1);
    return true
  }

  static async update({id, input}){
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1) return false
    
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}
