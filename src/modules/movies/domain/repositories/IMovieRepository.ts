import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import { IMovies } from '../models/IMovies';
import { ICreateMovie } from '../models/ICreateMovie';

export interface IMovieRepository {
  findById(id: string): Promise<IMovies | null>;
  create(data: ICreateMovie): Promise<IMovies>;
  remove(movie: Movie): Promise<void>;
  findAll(): Promise<Movie[]>;
  save(movie: Movie): Promise<Movie>;
  findByName(name: string): Promise<Movie | null>;
  update(movie: Movie): Promise<Movie>;
}
