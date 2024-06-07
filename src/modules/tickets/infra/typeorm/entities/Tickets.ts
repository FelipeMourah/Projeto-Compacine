import { Session } from '@modules/sessions/infra/entities/Sessions';
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
class Ticket implements ITicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Session)
  @JoinColumn({name: 'customer_id'})
  session_id: Session;

  @Column()
  chair: string;

  @Column()
  value: number

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Ticket;