import SessionsRepository from '@modules/sessions/infra/typeorm/repositories/SessionsRepository';
import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import MovieRepository from '@modules/movies/infra/typeorm/repositories/MoviesRepositories';
import { container } from 'tsyringe';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';

container.registerSingleton<IMovieRepository>(
  'MovieRepository',
  MovieRepository,
);

container.registerSingleton<ISessionsRepository>(
  'SessionsRepository',
  SessionsRepository,
);
