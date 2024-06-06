import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import MovieRepository from '@modules/movies/infra/typeorm/repositories/MoviesRepositories';
import { container } from 'tsyringe';

container.registerSingleton<IMovieRepository>(
  'MovieRepository',
  MovieRepository,
);
