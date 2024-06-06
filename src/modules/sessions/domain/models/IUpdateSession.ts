

// later should change prop movie_id and remove '?' when movies feat is completed.

export interface IUpdateSession {
  id: string;
  movie_id?: string;
  room: string;
  capacity: number;
  day: Date;
  time: string;
}
