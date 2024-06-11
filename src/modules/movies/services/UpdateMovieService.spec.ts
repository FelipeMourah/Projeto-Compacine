import AppError from '@shared/errors/AppError';
import FakeMovieRepository from '../infra/typeorm/repositories/fakes/FakeMovieRepository';
import UpdateMovieService from './UpdateMoviesService';

describe('UpdateMovieService', () => {
  it('should be able to update a movie', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const updateMovieService = new UpdateMovieService(fakeMovieRepository);

    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    const updateData = {
      id: movie.id,
      image: 'new_movie_image.jpg',
      name: 'Updated Test Movie',
      description: 'This is an updated test movie',
      actors: ['New Actor 1', 'New Actor 2'],
      genre: 'Comedy',
      release_date: '2024-07-15',
    };

    const updatedMovie = await updateMovieService.execute(updateData);

    expect(updatedMovie).toHaveProperty('id');
    expect(updatedMovie.name).toBe('Updated Test Movie');
  });

  it('should not be able to update a non-existing movie', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const updateMovieService = new UpdateMovieService(fakeMovieRepository);

    const updateData = {
      id: 'non_existing_id',
      image: 'new_movie_image.jpg',
      name: 'Updated Test Movie',
      description: 'This is an updated test movie',
      actors: ['New Actor 1', 'New Actor 2'],
      genre: 'Comedy',
      release_date: '2024-07-15',
    };

    await expect(updateMovieService.execute(updateData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
