import AppError from '@shared/errors/AppError';
import DeleteMovieService from './DeleteMovieService';
import FakeMovieRepository from '../infra/typeorm/repositories/fakes/FakeMovieRepository';

describe('DeleteMovieService', () => {
  it('should be able to delete a movie', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const deleteMovieService = new DeleteMovieService(fakeMovieRepository);

    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    await deleteMovieService.execute({ id: movie.id });

    const deletedMovie = await fakeMovieRepository.findById(movie.id);

    expect(deletedMovie).toBeNull();
  });

  it('should not be able to delete a non-existing movie', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const deleteMovieService = new DeleteMovieService(fakeMovieRepository);

    await expect(
      deleteMovieService.execute({ id: 'non_existing_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
