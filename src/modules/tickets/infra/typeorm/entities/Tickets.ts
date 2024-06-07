import { Session } from '@modules/sessions/infra/typeorm/entities/Sessions';
import { ITicket } from '@modules/tickets/domain/models/ITicket';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('tickets')
export class Ticket implements ITicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  session_id: string;

  @ManyToOne(() => Session)
  @JoinColumn({name: 'session_id'})
  session: Session

  @Column()
  chair: string;

  @Column()
  value: number

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}