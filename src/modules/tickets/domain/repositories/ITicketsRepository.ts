import { ITicket } from "../models/ITicket";
import { ICreateTicket } from "../models/ICreateTicket";

export interface ITicketsRepository {
  findById(id: string): Promise<ITicket | null>;
  createTicket({chair, value, session_id}: ICreateTicket): Promise<ITicket>;
  updateTicket(ticket: ITicket): Promise<ITicket | null>;
  deleteTicket(ticket: ITicket): Promise<void>; 
}