import { IMovies } from '@modules/movies/domain/models/IMovie';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  actors: string[];

  @Column()
  genre: string;

  @Column({ type: 'date' })
  release_date: string;

  @Column()
  sessions: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Movie;
