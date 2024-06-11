import { ITicket } from '../models/ITicket';
import { IFindByChairAndSession } from '../models/IFindByChairAndSession';
import { IFindByIdAndSession } from '../models/IFindByIdAndSession';

export interface ITicketsRepository {
  findById(id: string): Promise<ITicket | null>;
  findAll(): Promise<ITicket[] | null>;
  findByIdAndSession(ticketInfos: IFindByIdAndSession): Promise<ITicket | null>;
  findBySession(session_id: string): Promise<ITicket[] | null>;
  findByChairAndSession(
    ticketInfos: IFindByChairAndSession,
  ): Promise<ITicket | null>;
  createTicket(ITicket: ITicket): Promise<ITicket>;
  updateTicket(ticket: ITicket): Promise<ITicket | null>;
  deleteTicket(ticket: ITicket): Promise<void>;
}
