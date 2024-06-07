import { ITicket } from "../models/ITicket";
import { ICreateTicket } from "../models/ICreateTicket";
import { IFindByChairAndSession } from "../models/IFindByChairAndSession";
import { IFindByIdAndSession } from "../models/IFindByIdAndSession";
import { IUpdateSession } from "@modules/sessions/domain/models/IUpdateSession";

export interface ITicketsRepository {
  findById(id: string): Promise<ITicket | null>;
  findByIdAndSession({id, session_id}: IFindByIdAndSession): Promise<ITicket | null>
  findByChairAndSession({chair, session_id}: IFindByChairAndSession): Promise<ITicket | null>
  createTicket({chair, value, session_id}: ICreateTicket): Promise<ITicket>;
  updateTicket(ticket: IUpdateSession): Promise<ITicket | null>;
  deleteTicket(ticket: ITicket): Promise<void>; 
}