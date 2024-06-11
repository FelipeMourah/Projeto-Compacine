import 'reflect-metadata';
import DeleteSessionService from './DeleteSessionService';
import FakeSessionsRepository from '../typeorm/repositories/fakes/FakeSessionsRepository';
import FakeMovieRepository from '@modules/movies/infra/typeorm/repositories/fakes/FakeMovieRepository';
import AppError from '@shared/errors/AppError';

describe('DeleteSessionService', () => {
  let fakeSessionsRepository: FakeSessionsRepository;
  let fakeMovieRepository: FakeMovieRepository;
  let deleteSessionService: DeleteSessionService;

  beforeEach(() => {
    fakeSessionsRepository = new FakeSessionsRepository();
    fakeMovieRepository = new FakeMovieRepository();
    deleteSessionService = new DeleteSessionService(
      fakeSessionsRepository,
      fakeMovieRepository,
    );
  });

  it('should be able to delete a session', async () => {
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

    await expect(
      deleteSessionService.execute({ id: session.id, movie_id: movie.id }),
    ).resolves.not.toThrow();

    const foundSession = await fakeSessionsRepository.findById(session.id);
    expect(foundSession).toBeNull();
  });

  it('should not be able to delete a session for a non-existing movie', async () => {
    await expect(
      deleteSessionService.execute({
        id: 'non-existing-session-id',
        movie_id: 'non-existing-movie-id',
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
      deleteSessionService.execute({
        id: 'non-existing-session-id',
        movie_id: movie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
