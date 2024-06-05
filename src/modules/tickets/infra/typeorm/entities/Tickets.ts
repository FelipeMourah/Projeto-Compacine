import { ITickets } from '@modules/tickets/domain/models/ITickets';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('tickets')
class Ticket implements ITickets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Session, (session_id) => session_id.tickets)
  // session_id: Session

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