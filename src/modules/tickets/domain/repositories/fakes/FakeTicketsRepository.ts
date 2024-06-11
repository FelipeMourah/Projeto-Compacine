import { ITicketsRepository } from '@modules/tickets/domain/repositories/ITicketsRepository';
import { ICreateTicket } from '@modules/tickets/domain/models/ICreateTicket';
import { ITicket } from '@modules/tickets/domain/models/ITicket';
import { IFindByIdAndSession } from '@modules/tickets/domain/models/IFindByIdAndSession';
import { IFindByChairAndSession } from '@modules/tickets/domain/models/IFindByChairAndSession';
import { Ticket } from '@modules/tickets/infra/typeorm/entities/Tickets';
import { v4 as uuidv4 } from 'uuid';

export class FakeTicketsRepository implements ITicketsRepository {
  private tickets: Ticket[] = [];

  public async findById(id: string): Promise<Ticket | null> {
    const ticket = this.tickets.find(ticket => ticket.id === id);
    return ticket || null;
  }

  public async findAll(): Promise<Ticket[] | null> {
    return this.tickets;
  }

  public async findBySession(session_id: string): Promise<ITicket[] | null> {
    const tickets = this.tickets.filter(
      ticket => ticket.session_id === session_id,
    );
    return tickets;
  }

  public async findByIdAndSession(
    ticketInfos: IFindByIdAndSession,
  ): Promise<Ticket | null> {
    const ticketIndex = this.tickets.findIndex(
      ticket =>
        ticket.session_id === ticketInfos.session_id &&
        ticket.id === ticketInfos.id,
    );
    const ticket = this.tickets[ticketIndex];
    return ticket;
  }

  public async findByChairAndSession(
    ticketInfos: IFindByChairAndSession,
  ): Promise<Ticket | null> {
    const ticketIndex = this.tickets.findIndex(
      ticket =>
        ticket.session_id === ticketInfos.session_id &&
        ticket.chair === ticketInfos.chair,
    );
    const ticket = this.tickets[ticketIndex];
    return ticket;
  }

  public async createTicket({
    chair,
    value,
    session_id,
  }: ICreateTicket): Promise<Ticket> {
    const ticket = new Ticket();
    ticket.chair = chair;
    ticket.value = value;
    ticket.session_id = session_id;
    ticket.id = uuidv4();

    this.tickets.push(ticket);

    return ticket;
  }

  public async save(ticket: Ticket): Promise<Ticket | null> {
    const ticketIndex = this.tickets.findIndex(
      ticket_obj => ticket_obj.id === ticket.id,
    );
    this.tickets[ticketIndex] = ticket;
    return ticket;
  }

  public async updateTicket(ticket: Ticket): Promise<Ticket> {
    const ticketIndex = this.tickets.findIndex(
      ticket_obj => ticket_obj.id === ticket.id,
    );
    this.tickets[ticketIndex] = ticket;
    return this.tickets[ticketIndex] || null;
  }

  public async deleteTicket(ticket: Ticket): Promise<void> {
    const ticketIndex = this.tickets.findIndex(
      ticket_obj => ticket_obj.id === ticket.id,
    );

    this.tickets = this.tickets.splice(ticketIndex, 1);
  }
}
