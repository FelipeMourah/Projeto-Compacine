import { inject, injectable } from 'tsyringe';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import { ITicket } from '../domain/models/ITicket';
import { IShowTicket } from '../domain/models/IShowTicket';
import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute({
    id,
    movie_id,
    session_id,
  }: IShowTicket): Promise<ITicket | null> {
    const movie = await this.moviesRepository.findById(movie_id);
    if (!movie) {
      throw new AppError(404, 'Not found', 'Movie not found', [
        `movie_id: ${movie_id}`,
      ]);
    }

    const session = await this.sessionsRepository.findById(session_id);
    if (!session) {
      throw new AppError(404, 'Not found', 'Session not found', [
        `session_id: ${session_id}`,
      ]);
    }
    const ticket = await this.ticketsRepository.findById(id);
    if (!ticket) {
      throw new AppError(404, 'Not found', 'Ticket not found', [
        `ticket_id: ${id}`,
      ]);
    }
    return ticket;
  }
}

export default ShowTicketService;
