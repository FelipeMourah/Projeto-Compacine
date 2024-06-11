import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import { ISession } from '@modules/sessions/domain/models/ISession';
import { Ticket } from '@modules/tickets/infra/typeorm/entities/Tickets';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sessions')
export class Session implements ISession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  movie_id: string;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @OneToMany(() => Ticket, ticket => ticket.session)
  tickets: Ticket[];

  @Column()
  room: string;

  @Column()
  capacity: number;

  @Column({ type: 'date' })
  day: string;

  @Column()
  time: string;
}
