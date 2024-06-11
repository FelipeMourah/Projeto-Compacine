import { ITicketsRepository } from '@modules/tickets/domain/repositories/ITicketsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { ICreateTicket } from '@modules/tickets/domain/models/ICreateTicket';
import { ITicket } from '@modules/tickets/domain/models/ITicket';
import { IFindByIdAndSession } from '@modules/tickets/domain/models/IFindByIdAndSession';
import { IFindByChairAndSession } from '@modules/tickets/domain/models/IFindByChairAndSession';
import { IUpdateTicket } from '@modules/tickets/domain/models/IUpdateTicket';
import { Ticket } from '../entities/Tickets';

export class TicketsRepository implements ITicketsRepository {
  private ormRepository: Repository<Ticket>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Ticket);
  }

  public async findById(id: string): Promise<Ticket | null> {
    const ticket = await this.ormRepository.findOne({ where: { id } });
    return ticket;
  }

  public async findAll(): Promise<Ticket[] | null> {
    const tickets = await this.ormRepository.find({});
    return tickets;
  }

  public async findBySession(session_id: string): Promise<ITicket[] | null> {
    const ticketsOfSession = await this.ormRepository.find({
      where: {
        session_id,
      },
    });

    return ticketsOfSession;
  }

  public async findByIdAndSession(
    ticketInfos: IFindByIdAndSession,
  ): Promise<Ticket | null> {
    const ticket = await this.ormRepository.findOne({
      where: {
        id: ticketInfos.id,
        session_id: ticketInfos.session_id,
      },
    });
    return ticket;
  }

  public async findByChairAndSession(
    ticketInfos: IFindByChairAndSession,
  ): Promise<Ticket | null> {
    const ticket = await this.ormRepository.findOne({
      where: {
        chair: ticketInfos.chair,
        session_id: ticketInfos.session_id,
      },
    });

    return ticket;
  }

  public async createTicket({
    chair,
    value,
    session_id,
  }: ICreateTicket): Promise<Ticket> {
    const ticket = this.ormRepository.create({
      chair,
      value,
      session_id,
    });
    await this.ormRepository.save(ticket);

    return ticket;
  }

  public async updateTicket(ticket: IUpdateTicket): Promise<Ticket | null> {
    const ticketSaved = await this.ormRepository.save(ticket);

    return ticketSaved;
  }

  public async deleteTicket(ticket: Ticket): Promise<void> {
    await this.ormRepository.remove(ticket);
  }
}
