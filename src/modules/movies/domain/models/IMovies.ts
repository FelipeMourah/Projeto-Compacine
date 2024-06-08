import { ISession } from "@modules/sessions/domain/models/ISession";

export interface IMovies {
  id: string;
  image: string;
  name: string;
  description: string;
  actors: string[];
  genre: string;
  release_date: string;
  sessions: ISession[];
  created_at: Date;
  updated_at: Date;
}
