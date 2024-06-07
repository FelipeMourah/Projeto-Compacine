import { ITicketsRepository } from '@modules/tickets/domain/repositories/ITicketsRepository';
import { dataSource } from '@shared/infra/typeorm';
import Ticket from '../entities/Tickets';
import { Repository } from 'typeorm';
import { ICreateTicket } from '@modules/tickets/domain/models/ICreateTicket';
import { IUpdateTicket } from '@modules/tickets/domain/models/IUpdateTicket';
import { ITicket } from '@modules/tickets/domain/models/ITicket';


export class TicketsRepository implements ITicketsRepository {
  private ormRepository: Repository<Ticket>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Ticket);
  }

  public async findById(id: string): Promise<ITicket | null> {
    const ticket = await this.ormRepository.findOne({ where: { id } });
    return ticket;
  }

  public async createTicket({ chair, value, session_id }: ICreateTicket): Promise<ITicket> {
    const ticket = this.ormRepository.create({
      chair,
      value,
      session_id
    });

    await this.ormRepository.save(ticket);

    return ticket;
  }

  public async updateTicket(ticket: IUpdateTicket): Promise<ITicket | null> {
    const ticketSaved = await this.ormRepository.save(ticket);

    return ticketSaved;
  }

  public async deleteTicket(ticket: ITicket): Promise<void> {
    await this.ormRepository.remove(ticket)
  }
}
