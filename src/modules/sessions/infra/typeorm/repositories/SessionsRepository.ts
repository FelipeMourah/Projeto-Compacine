import { ICreateSession } from '@modules/sessions/domain/models/ICreateSession';
import { IFindSessionByRoomAndDateTime } from '@modules/sessions/domain/models/IFindSessionByRoomAndDateTime';
import { ISession } from '@modules/sessions/domain/models/ISession';
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
    return await this.ormRepository.find({ relations: ['tickets'] });
  }
  public async findById(id: string): Promise<Session | null> {
    const session = await this.ormRepository.findOne({
      where: { id },
      relations: ['tickets'],
    });

    return session;
  }

  public async create({
    movie_id,
    room,
    capacity,
    day,
    time,
  }: ICreateSession): Promise<Session> {
    const session = await this.ormRepository.create({
      movie_id,
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

  public async findByRoomAndDateTime({
    room,
    day,
    time,
  }: IFindSessionByRoomAndDateTime): Promise<ISession[]> {
    const session = await this.ormRepository.query(
      `SELECT * FROM sessions WHERE room = ? AND day = ? AND time = ?`,
      [room, day, time],
    );

    return session;
  }
}

export default SessionsRepository;
