import { v4 as uuid } from 'uuid';
import Movie from '../../entities/Movies';
import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { ICreateMovie } from '@modules/movies/domain/models/ICreateMovie';

class FakeMovieRepository implements IMovieRepository {
  private movies: Movie[] = [];

  public async findById(id: string): Promise<Movie | null> {
    const movie = this.movies.find(movie => movie.id === id);
    return movie || null;
  }

  public async findAll(): Promise<Movie[]> {
    return this.movies;
  }

  public async create(movieData: ICreateMovie): Promise<Movie> {
    const movie = new Movie();

    Object.assign(movie, {
      id: uuid(),
      ...movieData,
    });

    this.movies.push(movie);

    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    const index = this.movies.findIndex(m => m.id === movie.id);
    this.movies[index] = movie;
    return movie;
  }

  public async remove(movie: Movie): Promise<void> {
    const index = this.movies.findIndex(m => m.id === movie.id);
    this.movies.splice(index, 1);
  }

  public async findByName(name: string): Promise<Movie | null> {
    const movie = this.movies.find(movie => movie.name === name);
    return movie || null;
  }

  public async update(movie: Movie): Promise<Movie> {
    const index = this.movies.findIndex(m => m.id === movie.id);
    this.movies[index] = movie;
    return movie;
  }
}

export default FakeMovieRepository;
