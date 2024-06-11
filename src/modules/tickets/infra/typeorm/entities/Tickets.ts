import { Session } from '@modules/sessions/infra/typeorm/entities/Sessions';
import { ITicket } from '@modules/tickets/domain/models/ITicket';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket implements ITicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  session_id: string;

  @ManyToOne(() => Session)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column()
  chair: string;

  @Column()
  value: number;
}
