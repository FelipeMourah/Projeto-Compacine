import { inject, injectable } from 'tsyringe';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import { ICreateTicket } from '../domain/models/ICreateTicket';
import { ITicket } from '../domain/models/ITicket';
import AppError from '@shared/errors/AppError';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';

@injectable()
class CreateTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}

  public async execute({
    chair,
    value,
    session_id,
  }: ICreateTicket): Promise<ITicket> {
    const ticketExists = await this.ticketsRepository.findByChairAndSession({
      chair,
      session_id,
    });

    if (ticketExists) {
      throw new AppError(400, 'Bad Request', 'This ticket is already created', [
        `session_id: ${session_id}`,
        `chair: ${chair}`,
      ]);
    }

    const session = await this.sessionsRepository.findById(session_id);

    if (!session) {
      throw new AppError(404, 'Not Found', 'Session not found');
    }

    if (session.capacity <= 0) {
      throw new AppError(
        400,
        'Bad Request',
        'There is no available seats in this session',
      );
    }

    session.capacity -= 1;

    await this.sessionsRepository.save(session);

    const ticket = await this.ticketsRepository.createTicket({
      chair,
      value,
      session_id,
    });

    return ticket;
  }
}

export default CreateTicketService;
