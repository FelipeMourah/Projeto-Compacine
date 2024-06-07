export interface IUpdateTicket {
  id: string;
  session_id: string;
  chair: string;
  value: number;
  created_at?: Date;
  updated_at?: Date;
}