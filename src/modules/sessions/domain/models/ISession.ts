export interface ISession {
  id: string;
  movie_id: string;
  room: string;
  capacity: number;
  day: Date | string;
  time: string;
}
