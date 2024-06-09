import { Ticket } from '@modules/tickets/infra/typeorm/entities/Tickets';

export interface ISession {
  id: string;
  movie_id: string;
  room: string;
  capacity: number;
  day: Date;
  time: string;
  tickets: Ticket[];
  created_at: Date;
  updated_at: Date;
}
