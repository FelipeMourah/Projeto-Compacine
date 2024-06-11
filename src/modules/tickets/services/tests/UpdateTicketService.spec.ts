import { FakeTicketsRepository } from '@modules/tickets/domain/repositories/fakes/FakeTicketsRepository';
import CreateTicketService from '../CreateTicketService';
import { v4 as uuidv4 } from 'uuid';
import FakeMovieRepository from '@modules/movies/infra/typeorm/repositories/fakes/FakeMovieRepository';
import FakeSessionsRepository from '@modules/sessions/infra/typeorm/repositories/fakes/FakeSessionsRepository';
import { ICreateMovie } from '@modules/movies/domain/models/ICreateMovie';
import CreateMovieService from '@modules/movies/services/CreateMovieService';
import CreateSessionsService from '@modules/sessions/infra/services/CreateSessionsService';
import { ICreateSession } from '@modules/sessions/domain/models/ICreateSession';
import { ICreateTicket } from '@modules/tickets/domain/models/ICreateTicket';
import AppError from '@shared/errors/AppError';
import UpdateTicketService from '../UpdateTicketService';
let fakeSessionsRepository: FakeSessionsRepository;
let fakeMoviesRepository: FakeMovieRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let createTicket: CreateTicketService;
let createMovie: CreateMovieService;
let createSession: CreateSessionsService;
let updateTicket: UpdateTicketService;
describe('CreateTicketService', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMovieRepository();
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeSessionsRepository = new FakeSessionsRepository();

    createMovie = new CreateMovieService(fakeMoviesRepository);
    createSession = new CreateSessionsService(
      fakeSessionsRepository,
      fakeMoviesRepository,
    );
    createTicket = new CreateTicketService(
      fakeTicketsRepository,
      fakeSessionsRepository,
      fakeMoviesRepository,
    );

    updateTicket = new UpdateTicketService(
      fakeTicketsRepository,
      fakeSessionsRepository,
      fakeMoviesRepository,
    );
  });
  it('should be able to update a ticket', async () => {
    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    };
    const createdMovie = await createMovie.execute(movieData);

    const sessionData: ICreateSession = {
      capacity: 321,
      day: '2025-07-23',
      movie_id: createdMovie.id,
      room: 'A10',
      time: '22:15:00',
    };

    const createdSession = await createSession.execute(sessionData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: createdSession.id,
      value: 25,
      movie_id: createdMovie.id,
    };

    const createdTicket = await createTicket.execute(ticketData);

    const updatedTicket = await updateTicket.execute({
      id: createdTicket.id as string,
      session_id: createdSession.id,
      movie_id: createdMovie.id,
      chair: 'Z90',
      value: 70,
    });
    await expect(updatedTicket?.chair).toBe('Z90');
    expect(updatedTicket?.value).toBe(70);
  });

  it('It should not be possible to updade a ticket with an invalid Session', async () => {
    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2025-10-15',
    };

    const createdMovie = await createMovie.execute(movieData);

    const sessionData: ICreateSession = {
      capacity: 321,
      day: '2025-10-21',
      movie_id: createdMovie.id,
      room: 'A10',
      time: '22:15:00',
    };

    const createdSession = await createSession.execute(sessionData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: createdSession.id,
      value: 25,
      movie_id: createdMovie.id,
    };

    const createdTicket = await createTicket.execute(ticketData);

    await expect(
      updateTicket.execute({
        id: createdTicket.id as string,
        session_id: uuidv4(),
        movie_id: createdMovie.id,
        chair: 'Z90',
        value: 70,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('It should not be possible to updade a ticket with an invalid Movie', async () => {
    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: new Date('2024-12-12').toISOString(),
    };

    const createdMovie = await createMovie.execute(movieData);

    const sessionData: ICreateSession = {
      capacity: 321,
      day: new Date('2024-12-12').toISOString(),
      movie_id: createdMovie.id,
      room: 'A10',
      time: '22:15:00',
    };

    const createdSession = await createSession.execute(sessionData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: createdSession.id,
      value: 25,
      movie_id: createdMovie.id,
    };

    const createdTicket = await createTicket.execute(ticketData);

    await expect(
      updateTicket.execute({
        id: createdTicket.id as string,
        session_id: createdMovie.id,
        movie_id: uuidv4(),
        chair: 'Z90',
        value: 70,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('It should not be possible to updade a ticket with an invalid ID', async () => {
    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2025-10-15',
    };

    const createdMovie = await createMovie.execute(movieData);

    const sessionData: ICreateSession = {
      capacity: 321,
      day: '2025-10-21',
      movie_id: createdMovie.id,
      room: 'A10',
      time: '22:15:00',
    };

    const createdSession = await createSession.execute(sessionData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: createdSession.id,
      value: 25,
      movie_id: createdMovie.id,
    };

    await createTicket.execute(ticketData);

    await expect(
      updateTicket.execute({
        id: uuidv4(),
        session_id: createdSession.id,
        movie_id: createdMovie.id,
        chair: 'Z90',
        value: 70,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
