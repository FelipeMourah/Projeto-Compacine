import 'reflect-metadata';
import ListSessionsService from './ListSessionsService';
import FakeSessionsRepository from '../typeorm/repositories/fakes/FakeSessionsRepository';
import FakeMovieRepository from '@modules/movies/infra/typeorm/repositories/fakes/FakeMovieRepository';
import AppError from '@shared/errors/AppError';
import { addDays, format } from 'date-fns';

describe('ListSessionsService', () => {
  let fakeSessionsRepository: FakeSessionsRepository;
  let fakeMovieRepository: FakeMovieRepository;
  let listSessionsService: ListSessionsService;

  beforeEach(() => {
    fakeSessionsRepository = new FakeSessionsRepository();
    fakeMovieRepository = new FakeMovieRepository();
    listSessionsService = new ListSessionsService(
      fakeSessionsRepository,
      fakeMovieRepository,
    );
  });

  it('should be able to list sessions of an existing movie', async () => {
    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    const session1 = await fakeSessionsRepository.create({
      movie_id: movie.id,
      room: '1',
      capacity: 100,
      day: new Date('2024-12-12').toISOString(),
      time: '18:00:00',
    });

    const session2 = await fakeSessionsRepository.create({
      movie_id: movie.id,
      room: '2',
      capacity: 150,
      day: new Date('2024-12-13').toISOString(),
      time: '20:00:00',
    });

    const sessions = await listSessionsService.execute(movie.id);

    expect(sessions).toHaveLength(2);
    expect(sessions).toEqual(
      expect.arrayContaining([
        {
          ...session1,
          day: format(addDays(new Date(session1.day), 1), 'dd/MM/yyyy'),
        },
        {
          ...session2,
          day: format(addDays(new Date(session2.day), 1), 'dd/MM/yyyy'),
        },
      ]),
    );
  });

  it('should throw an error if the movie does not exist', async () => {
    await expect(
      listSessionsService.execute('non-existing-movie-id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should format session dates correctly', async () => {
    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    const session = await fakeSessionsRepository.create({
      movie_id: movie.id,
      room: '1',
      capacity: 100,
      day: new Date('2024-12-12').toISOString(),
      time: '18:00:00',
    });

    const sessions = await listSessionsService.execute(movie.id);

    expect(sessions).toHaveLength(1);
    expect(sessions[0].day).toBe(
      format(addDays(new Date(session.day), 1), 'dd/MM/yyyy'),
    );
  });
});
