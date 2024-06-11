import { inject, injectable } from 'tsyringe';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import { IUpdateTicket } from '../domain/models/IUpdateTicket';
import { ITicket } from '../domain/models/ITicket';
import AppError from '@shared/errors/AppError';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
@injectable()
class UpdateTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute(ticket: IUpdateTicket): Promise<ITicket | null> {
    const movie = await this.moviesRepository.findById(
      ticket.movie_id as string,
    );
    if (!movie) {
      throw new AppError(404, 'Not found', 'Movie not found', [
        `movie_id: ${ticket.movie_id}`,
      ]);
    }

    const session = await this.sessionsRepository.findById(ticket.session_id);
    if (!session) {
      throw new AppError(404, 'Not found', 'Session not found', [
        `session_id: ${ticket.session_id}`,
      ]);
    }

    const ticketExists = await this.ticketsRepository.findById(ticket.id);

    if (!ticketExists) {
      throw new AppError(404, 'Not Found', 'Ticket not Found', [
        `ticket_id: ${ticket.id}`,
      ]);
    }

    ticketExists.chair = ticket.chair;
    ticketExists.value = ticket.value;

    const ticketUpdated =
      await this.ticketsRepository.updateTicket(ticketExists);

    return ticketUpdated;
  }
}

export default UpdateTicketService;
