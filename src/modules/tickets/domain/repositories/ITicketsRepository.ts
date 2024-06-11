import { ITicket } from '../models/ITicket';
import { ICreateTicket } from '../models/ICreateTicket';
import { IFindByChairAndSession } from '../models/IFindByChairAndSession';
import { IFindByIdAndSession } from '../models/IFindByIdAndSession';
import { IUpdateTicket } from '../models/IUpdateTicket';

export interface ITicketsRepository {
  findById(id: string): Promise<ITicket | null>;
  findAll(): Promise<ITicket[] | null>;
  findByIdAndSession(ticketInfos: IFindByIdAndSession): Promise<ITicket | null>;
  findBySession(session_id: string): Promise<ITicket[] | null>;
  findByChairAndSession(
    ticketInfos: IFindByChairAndSession,
  ): Promise<ITicket | null>;
  createTicket({ chair, value, session_id }: ICreateTicket): Promise<ITicket>;
  updateTicket(ticket: IUpdateTicket): Promise<ITicket | null>;
  deleteTicket(ticket: ITicket): Promise<void>;
}
