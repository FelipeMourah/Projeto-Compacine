import { inject, injectable } from 'tsyringe';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import AppError from '@shared/errors/AppError';
import { IDeleteTicket } from '../domain/models/IDeleteTicket';


@injectable()
class DeleteTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({ id, session_id }: IDeleteTicket): Promise<void> {
    const ticketExists = await this.ticketsRepository.findByIdAndSession({
      id,
      session_id,
    });

    if (!ticketExists) {
      throw new AppError(231, 'dsadasdsa', "This ticket doesn't exists", [
        `session_id: ${session_id}`,
        `ticket_id: ${id}`,
      ]);
    }

    const ticket = await this.ticketsRepository.findByIdAndSession({
      id,
      session_id,
    });

    if(!ticket) {
      throw new AppError(1321,"", "");
    }

    await this.ticketsRepository.deleteTicket(ticket);
    return;
  }
}

export default DeleteTicketService;
