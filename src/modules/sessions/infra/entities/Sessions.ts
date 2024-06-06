import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import { ISessions } from '@modules/sessions/domain/models/ISessions';

@Entity('sessions')
export class Session implements ISessions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  movie_id: string;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column()
  room: string;

  @Column()
  capacity: number;

  @Column({ type: 'date' })
  day: Date;

  @Column()
  time: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
