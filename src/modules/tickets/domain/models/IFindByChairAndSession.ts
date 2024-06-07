import { ISession } from "@modules/sessions/domain/models/ISession";

export interface IFindByChairAndSession {
  chair: string;
  session_id: string;
}