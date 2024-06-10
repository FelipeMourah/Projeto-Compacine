import AppError from '@shared/errors/AppError';
import { ICreateMovie } from '../domain/models/ICreateMovie';
import CreateMovieService from './CreateMovieService';
import FakeMovieRepository from '../infra/typeorm/repositories/fakes/FakeMovieRepository';

describe('CreateMovieService', () => {
  it('should be able to create a new movie', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const createMovieService = new CreateMovieService(fakeMovieRepository);

    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    };

    const createdMovie = await createMovieService.execute(movieData);

    expect(createdMovie).toHaveProperty('id');
    expect(createdMovie.name).toBe('Test Movie');
  });

  it('should not be able to create a movie with an existing name', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const createMovieService = new CreateMovieService(fakeMovieRepository);

    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Existing Movie',
      description: 'This is an existing movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Comedy',
      release_date: '2024-06-10',
    };

    await createMovieService.execute(movieData);

    await expect(createMovieService.execute(movieData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
