import AppError from '@shared/errors/AppError';
import FakeMovieRepository from '../infra/typeorm/repositories/fakes/FakeMovieRepository';
import ShowOneMovieService from './ShowOneMovieService';

describe('ShowOneMovieService', () => {
  it('should be able to show one movie with formatted release date', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const showOneMovieService = new ShowOneMovieService(fakeMovieRepository);

    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    const shownMovie = await showOneMovieService.execute(movie.id);

    expect(shownMovie).toHaveProperty('id');
    expect(shownMovie.name).toBe('Test Movie');
    expect(shownMovie.release_date).toBe('10/06/2024');
  });

  it('should not be able to show a movie with non-existing id', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const showOneMovieService = new ShowOneMovieService(fakeMovieRepository);

    await expect(
      showOneMovieService.execute('non_existing_id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
