import { IMovies } from '@modules/movies/domain/models/IMovies';
import { Session } from '@modules/sessions/infra/typeorm/entities/Sessions';
import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Column('text')
  @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })

  actors: string;

  @Column()
  genre: string;

  @Column({ type: 'date' })
  release_date: string;

  @OneToMany(() => Session, session => session.movie)
  sessions: Session[];

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default Movie;
