import { ISession } from "@modules/sessions/domain/models/ISession";

export interface ICreateTicket {
  chair: string;
  value: number;
  session_id: ISession;
}