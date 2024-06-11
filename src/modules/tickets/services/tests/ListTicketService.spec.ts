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
let fakeSessionsRepository: FakeSessionsRepository;
let fakeMoviesRepository: FakeMovieRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let createTicket: CreateTicketService;
let createMovie: CreateMovieService;
let createSession: CreateSessionsService;
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
  });
  it('should be able to list all ticket', async () => {
    const sessionData: ICreateSession = {
      capacity: 321,
      day: '2025-07-23',
      movie_id: uuidv4(),
      room: 'A10',
      time: '22:15:00',
    };

    const createdSession = await createSession.execute(sessionData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: createdSession.id,
      value: 25,
    };
    const ticket = await createTicket.execute(ticketData);

    expect(ticket).rejects.toBeInstanceOf(AppError);
  });

  it('It should not be possible to create a ticket with an invalid Movie', async () => {
    const movieData: ICreateMovie = {
      image: 'movie_image.jpg',
      name: 'Test Movie',
      description: 'This is a test movie',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2024-06-10',
    };

    const createdMovie = await createMovie.execute(movieData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: uuidv4(),
      value: 25,
      movie_id: createdMovie.id,
    };

    const ticket = await createTicket.execute(ticketData);

    expect(ticket).toBeInstanceOf(AppError);
  });

  it('It should not be possible to create a ticket with an invalid Session', async () => {
    const sessionData: ICreateSession = {
      capacity: 321,
      day: '20/10/2025',
      movie_id: uuidv4(),
      room: 'A10',
      time: '22:15:00',
    };

    const createdSession = await createSession.execute(sessionData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: createdSession.id,
      value: 25,
    };

    const ticket = await createTicket.execute(ticketData);

    expect(ticket).toBeInstanceOf(AppError);
  });

  it('It should not be possible to create a ticket when capacity is zero or negative', async () => {
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
      capacity: 0,
      day: '20/10/2025',
      movie_id: createdMovie.id,
      room: 'A10',
      time: '22:15:00',
    };

    const createdSession = await createSession.execute(sessionData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: createdSession.id,
      value: 25,
    };

    const ticket = await createTicket.execute(ticketData);

    expect(ticket).toBeInstanceOf(AppError);
  });

  it('It should not be possible to create two equals tickets', async () => {
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
      capacity: 0,
      day: '20/10/2025',
      movie_id: createdMovie.id,
      room: 'A10',
      time: '22:15:00',
    };

    const createdSession = await createSession.execute(sessionData);

    const ticketData: ICreateTicket = {
      chair: 'A40',
      session_id: createdSession.id,
      value: 25,
    };

    await createTicket.execute(ticketData);
    const ticket = await createTicket.execute(ticketData);

    expect(ticket).toBeInstanceOf(AppError);
  });
});
