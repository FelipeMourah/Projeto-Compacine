import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import { IMovies } from '../models/IMovies';

export interface IMovieRepository {
  findById(id: string): Promise<IMovies | null>;
  create(data: IMovies): Promise<IMovies | undefined>;
  remove(movie: Movie): Promise<void>;
  findAll(): Promise<Movie[]>;
  save(movie: Movie): Promise<Movie>;
}
