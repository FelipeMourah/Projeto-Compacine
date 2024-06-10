import { Session } from '@modules/sessions/infra/typeorm/entities/Sessions';

export interface IMovies {
  id: string;
  image: string;
  name: string;
  description: string;
  actors: string | string[];
  genre: string;
  release_date: string;
  sessions: Session[];
  created_at: Date;
  updated_at: Date;
}
