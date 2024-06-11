import 'reflect-metadata';
import CreateSessionsService from './CreateSessionsService';
import FakeSessionsRepository from '../typeorm/repositories/fakes/FakeSessionsRepository';
import FakeMovieRepository from '@modules/movies/infra/typeorm/repositories/fakes/FakeMovieRepository';
import AppError from '@shared/errors/AppError';

describe('CreateSessionsService', () => {
  let fakeSessionsRepository: FakeSessionsRepository;
  let fakeMovieRepository: FakeMovieRepository;
  let createSessionsService: CreateSessionsService;

  beforeEach(() => {
    fakeSessionsRepository = new FakeSessionsRepository();
    fakeMovieRepository = new FakeMovieRepository();
    createSessionsService = new CreateSessionsService(
      fakeSessionsRepository,
      fakeMovieRepository,
    );
  });

  it('should not be able to create a session for a non-existing movie', async () => {
    await expect(
      createSessionsService.execute({
        movie_id: 'non-existing-movie-id',
        room: '1',
        capacity: 100,
        day: '2024-12-12',
        time: '18:00:00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with a past date', async () => {
    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    await expect(
      createSessionsService.execute({
        movie_id: movie.id,
        room: '1',
        capacity: 100,
        day: new Date('2020-01-01').toISOString(),
        time: '18:00:00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session if there is already a session in the same room at the same time', async () => {
    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    });

    await createSessionsService.execute({
      movie_id: movie.id,
      room: '1',
      capacity: 100,
      day: new Date('2028-01-01').toISOString(),
      time: '18:00:00',
    });

    await expect(
      createSessionsService.execute({
        movie_id: movie.id,
        room: '1',
        capacity: 100,
        day: new Date('2028-01-01').toISOString(),
        time: '18:00:00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a session if all conditions are met', async () => {
    const movie = await fakeMovieRepository.create({
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '12/12/2025',
    });

    const session = await createSessionsService.execute({
      movie_id: movie.id,
      room: '1',
      capacity: 100,
      day: new Date('2028-01-01').toISOString(),
      time: '18:00:00',
    });

    expect(session).toHaveProperty('id');
    expect(session.room).toBe('1');
    expect(session.capacity).toBe(100);
    expect(session.day).toBe('12/12/2025');
    expect(session.time).toBe('18:00:00');
  });
});
