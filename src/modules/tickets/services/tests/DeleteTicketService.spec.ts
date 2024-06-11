import { FakeTicketsRepository } from '@modules/tickets/domain/repositories/fakes/FakeTicketsRepository';
import CreateTicketService from '../CreateTicketService';
import { v4 as uuidv4 } from 'uuid';
import FakeMovieRepository from '@modules/movies/infra/typeorm/repositories/fakes/FakeMovieRepository';
import FakeSessionsRepository from '@modules/sessions/infra/typeorm/repositories/fakes/FakeSessionsRepository';
import { ICreateSession } from '@modules/sessions/domain/models/ICreateSession';
import { ICreateMovie } from '@modules/movies/domain/models/ICreateMovie';
import { ICreateTicket } from '@modules/tickets/domain/models/ICreateTicket';
import AppError from '@shared/errors/AppError';
import CreateMovieService from '@modules/movies/services/CreateMovieService';
import CreateSessionsService from '@modules/sessions/infra/services/CreateSessionsService';
import DeleteTicketService from '../DeleteTicketService';
let fakeSessionsRepository: FakeSessionsRepository;
let fakeMoviesRepository: FakeMovieRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let createTicket: CreateTicketService;
let createSession: CreateSessionsService;
let createMovie: CreateMovieService;
let deleteTicket: DeleteTicketService;
describe('DeleteTicketService', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMovieRepository();
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeSessionsRepository = new FakeSessionsRepository();
    deleteTicket = new DeleteTicketService(
      fakeTicketsRepository,
      fakeSessionsRepository,
      fakeMoviesRepository,
    );
    createTicket = new CreateTicketService(
      fakeTicketsRepository,
      fakeSessionsRepository,
      fakeMoviesRepository,
    );
    createSession = new CreateSessionsService(
      fakeSessionsRepository,
      fakeMoviesRepository,
    );
    createMovie = new CreateMovieService(fakeMoviesRepository);
  });
  it('should be able to delete a ticket', async () => {
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
      day: '2025-08-19',
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
      deleteTicket.execute({
        id: createdTicket.id as string,
        session_id: createdSession.id,
        movie_id: createdMovie.id,
      }),
    ).resolves.toBeFalsy();
  });

  it('It should not be possible to delete a ticket with an invalid Session', async () => {
    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-19',
    };

    const createdMovie = await createMovie.execute(movieData);

    const sessionData: ICreateSession = {
      capacity: 321,
      day: '2025-08-19',
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

    const ticket = await createTicket.execute(ticketData);

    await expect(
      deleteTicket.execute({
        id: ticket.id as string,
        session_id: uuidv4(),
        movie_id: createdMovie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('It should not be possible to delete a ticket with an invalid Movie', async () => {
    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-19',
    };

    const createdMovie = await createMovie.execute(movieData);

    const sessionData: ICreateSession = {
      capacity: 321,
      day: '2025-08-19',
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

    const ticket = await createTicket.execute(ticketData);

    await expect(
      deleteTicket.execute({
        id: ticket.id as string,
        session_id: createdSession.id,
        movie_id: uuidv4(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('It should not be possible to delete a ticket not found', async () => {
    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-19',
    };

    const createdMovie = await createMovie.execute(movieData);

    const sessionData: ICreateSession = {
      capacity: 321,
      day: '2025-08-19',
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
      deleteTicket.execute({
        id: uuidv4(),
        session_id: createdSession.id,
        movie_id: createdMovie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
