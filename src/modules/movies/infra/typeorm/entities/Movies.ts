import { IMovies } from '@modules/movies/domain/models/IMovies';
import { Session } from '@modules/sessions/infra/typeorm/entities/Sessions';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
class Movie implements IMovies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[]) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value),
    },
  })
  actors: string[];

  @Column()
  genre: string;

  @Column({ type: 'date' })
  release_date: string;

  @OneToMany(() => Session, session => session.movie)
  sessions: Session[];
}

export default Movie;
