import { ITicketsRepository } from '@modules/tickets/domain/repositories/ITicketsRepository';
import { ICreateTicket } from '@modules/tickets/domain/models/ICreateTicket';
import { ITicket } from '@modules/tickets/domain/models/ITicket';
import { IFindByIdAndSession } from '@modules/tickets/domain/models/IFindByIdAndSession';
import { IFindByChairAndSession } from '@modules/tickets/domain/models/IFindByChairAndSession';
import { IUpdateTicket } from '@modules/tickets/domain/models/IUpdateTicket';
import { Ticket } from '@modules/tickets/infra/typeorm/entities/Tickets';
import { v4 as uuidv4 } from 'uuid';

export class FakeTicketsRepository implements ITicketsRepository {
  private tickets: Ticket[] = [];

  public async findById(id: string): Promise<Ticket | null> {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
    const ticket = this.tickets[ticketIndex];
    return ticket;
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

  public async updateTicket(ticket: IUpdateTicket): Promise<Ticket | null> {
    const ticketIndex = this.tickets.findIndex(
      ticket_obj => ticket_obj.id === ticket.id,
    );

    const ticketFinded = this.tickets[ticketIndex];
    const updatedTicket = new Ticket();
    updatedTicket.id = ticketFinded.id;
    updatedTicket.session_id = ticketFinded.session_id;
    updatedTicket.chair = ticket.chair;
    updatedTicket.value = ticket.value;

    this.tickets[ticketIndex] = updatedTicket;
    return this.tickets[ticketIndex];
  }

  public async deleteTicket(ticket: Ticket): Promise<void> {
    const ticketIndex = this.tickets.findIndex(
      ticket_obj => ticket_obj.id === ticket.id,
    );

    this.tickets.splice(ticketIndex, 1);
  }
}
