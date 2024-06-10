import { inject, injectable } from 'tsyringe';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import AppError from '@shared/errors/AppError';
import { IDeleteTicket } from '../domain/models/IDeleteTicket';
import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';

@injectable()
class DeleteTicketService {
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
    session_id,
    movie_id,
  }: IDeleteTicket): Promise<void> {
    const movie = await this.moviesRepository.findById(movie_id as string);
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
      throw new AppError(
        404,
        'Ticket Not Found',
        "This ticket doesn't exists",
        [`session_id: ${session_id}`, `ticket_id: ${id}`],
      );
    }

    await this.ticketsRepository.deleteTicket(ticket);
    return;
  }
}

export default DeleteTicketService;
