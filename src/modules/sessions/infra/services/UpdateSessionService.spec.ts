import 'reflect-metadata';
import { format } from 'date-fns';
import UpdateSessionService from './UpdateSessionService';
import FakeSessionsRepository from '../typeorm/repositories/fakes/FakeSessionsRepository';
import FakeMovieRepository from '@modules/movies/infra/typeorm/repositories/fakes/FakeMovieRepository';
import AppError from '@shared/errors/AppError';

describe('UpdateSessionService', () => {
  let fakeSessionsRepository: FakeSessionsRepository;
  let fakeMovieRepository: FakeMovieRepository;
  let updateSessionService: UpdateSessionService;

  beforeEach(() => {
    fakeSessionsRepository = new FakeSessionsRepository();
    fakeMovieRepository = new FakeMovieRepository();
    updateSessionService = new UpdateSessionService(
      fakeSessionsRepository,
      fakeMovieRepository,
    );
  });

  it('should be able to update a session of an existing movie', async () => {
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
      day: new Date().toISOString(),
      time: '18:00:00',
    });

    const updatedSession = await updateSessionService.execute({
      movie_id: movie.id,
      id: session.id,
      room: '2',
      capacity: 200,
      day: new Date('2024-12-12').toISOString(),
      time: '20:00:00',
    });

    expect(updatedSession).toEqual({
      ...session,
      room: '2',
      capacity: 200,
      day: format(new Date('2024-12-12'), 'dd/MM/yyyy'),
      time: '20:00:00',
    });
  });

  it('should throw an error if the movie does not exist', async () => {
    await expect(
      updateSessionService.execute({
        movie_id: 'non-existing-movie-id',
        id: 'some-session-id',
        room: '1',
        capacity: 100,
        day: new Date().toISOString(),
        time: '18:00:00',
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
      updateSessionService.execute({
        movie_id: movie.id,
        id: 'non-existing-session-id',
        room: '1',
        capacity: 100,
        day: new Date().toISOString(),
        time: '18:00:00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error if the new date is in the past', async () => {
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
      day: '2000-01-01',
      time: '18:00:00',
    });

    await expect(
      updateSessionService.execute({
        movie_id: movie.id,
        id: session.id,
        room: '1',
        capacity: 100,
        day: '2000-01-01',
        time: '18:00:00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error if a session already exists in the same room, day, and time', async () => {
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
      room: '1',
      capacity: 100,
      day: new Date().toISOString(),
      time: '18:00:00',
    });

    await expect(
      updateSessionService.execute({
        movie_id: movie.id,
        id: session2.id,
        room: '1',
        capacity: 100,
        day: new Date('2024-12-12').toISOString(),
        time: '18:00:00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
