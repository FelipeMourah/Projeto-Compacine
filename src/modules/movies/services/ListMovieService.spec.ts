import FakeMovieRepository from '../infra/typeorm/repositories/fakes/FakeMovieRepository';
import ListMovieService from './ListMovieService';

describe('ListMovieService', () => {
  it('should be able to list all movies with formatted release date', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const listMovieService = new ListMovieService(fakeMovieRepository);

    await fakeMovieRepository.create({
      image: 'movie_image1.jpg',
      name: 'Test Movie 1',
      description: 'This is a test movie 1',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    await fakeMovieRepository.create({
      image: 'movie_image2.jpg',
      name: 'Test Movie 2',
      description: 'This is a test movie 2',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Comedy',
      release_date: '2024-06-15',
    });

    const movies = await listMovieService.execute();

    expect(movies).toHaveLength(2);
    expect(movies[0].release_date).toBe('10/06/2024');
    expect(movies[1].release_date).toBe('15/06/2024');
  });

  it('should return an empty array if no movies are found', async () => {
    const fakeMovieRepository = new FakeMovieRepository();
    const listMovieService = new ListMovieService(fakeMovieRepository);

    const movies = await listMovieService.execute();

    expect(movies).toEqual([]);
  });
});
