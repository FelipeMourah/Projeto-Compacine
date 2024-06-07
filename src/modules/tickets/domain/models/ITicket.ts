import { Session } from "@modules/sessions/infra/entities/Sessions";

export interface ITicket {
  id: string;
  session_id: Session;
  chair: string;
  value: number;
  created_at: Date;
  updated_at: Date;
}