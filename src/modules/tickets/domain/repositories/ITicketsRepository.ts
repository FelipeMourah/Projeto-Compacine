import { ITickets } from "../models/ITickets";

export interface ITicketsRepository {
  findById(id: string): Promise<ITickets>;
  findBySession(session_id: string): Promise<ITickets[]>;
  findByChair(chair: string): Promise<ITickets>
  createTicket(session_id: string): Promise<ITickets>;
  updateTicket(id: string): Promise<ITickets>;
  deleteTicket(id: string): Promise<ITickets>; 
}