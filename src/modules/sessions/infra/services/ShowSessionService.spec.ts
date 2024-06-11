import 'reflect-metadata';
import ShowSessionService from './ShowSessionService';
import FakeSessionsRepository from '../typeorm/repositories/fakes/FakeSessionsRepository';
import FakeMovieRepository from '@modules/movies/infra/typeorm/repositories/fakes/FakeMovieRepository';
import AppError from '@shared/errors/AppError';
import { addDays, format } from 'date-fns';

describe('ShowSessionService', () => {
  let fakeSessionsRepository: FakeSessionsRepository;
  let fakeMovieRepository: FakeMovieRepository;
  let showSessionService: ShowSessionService;

  beforeEach(() => {
    fakeSessionsRepository = new FakeSessionsRepository();
    fakeMovieRepository = new FakeMovieRepository();
    showSessionService = new ShowSessionService(
      fakeSessionsRepository,
      fakeMovieRepository,
    );
  });

  it('should be able to show a session of an existing movie', async () => {
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

    const result = await showSessionService.execute({
      movie_id: movie.id,
      id: session.id,
    });

    expect(result).toEqual({
      ...session,
      day: format(addDays(new Date(session.day), 1), 'dd/MM/yyyy'),
    });
  });

  it('should throw an error if the movie does not exist', async () => {
    await expect(
      showSessionService.execute({
        movie_id: 'non-existing-movie-id',
        id: 'some-session-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error if the session does not exist', async () => {
    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    await expect(
      showSessionService.execute({
        movie_id: movie.id,
        id: 'non-existing-session-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should format the session date correctly', async () => {
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

    const result = await showSessionService.execute({
      movie_id: movie.id,
      id: session.id,
    });

    expect(result.day).toBe(
      format(addDays(new Date(session.day), 1), 'dd/MM/yyyy'),
    );
  });
});
