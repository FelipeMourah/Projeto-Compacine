import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import { ISession } from '@modules/sessions/domain/models/ISession';
import { Ticket } from '@modules/tickets/infra/typeorm/entities/Tickets';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  day: Date;

  @Column()
  time: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
