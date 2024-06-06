import { ISession } from '../../../domain/models/ISession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../entities/Sessions';

class SessionsRepository implements ISessionsRepository {
  private ormRepository: Repository<Session>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Session);
  }

  public async findAll(): Promise<Session[]> {
    return await this.ormRepository.find();
  }
  public async findById(id: string): Promise<Session | null> {
    const session = await this.ormRepository.findOneBy({ id });

    return session;
  }

  public async create({
    room,
    capacity,
    day,
    time,
  }: ISession): Promise<Session> {
    const session = await this.ormRepository.create({
      room,
      capacity,
      day,
      time,
    });

    await this.ormRepository.save(session);

    return session;
  }

  public async save(session: Session): Promise<Session> {
    await this.ormRepository.save(session);

    return session;
  }

  public async remove(session: Session): Promise<void> {
    await this.ormRepository.remove(session);
  }
}

export default SessionsRepository;
