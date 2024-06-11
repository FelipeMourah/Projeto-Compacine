import { ICreateSession } from '@modules/sessions/domain/models/ICreateSession';
import { IFindSessionByRoomAndDateTime } from '@modules/sessions/domain/models/IFindSessionByRoomAndDateTime';
import { ISession } from '@modules/sessions/domain/models/ISession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import { v4 as uuidv4 } from 'uuid';
import { Session } from '../../entities/Sessions';
import { format } from 'date-fns';

class FakeSessionsRepository implements ISessionsRepository {
  private sessions: Session[] = [];

  public async findAll(): Promise<Session[]> {
    return this.sessions;
  }

  public async findById(id: string): Promise<Session | null> {
    const session = this.sessions.find(session => session.id === id);

    return session || null;
  }

  public async findByRoomAndDateTime({
    room,
    day,
    time,
  }: IFindSessionByRoomAndDateTime): Promise<Session[]> {
    const sessions = this.sessions.filter(session => {
      return (
        session.room === room &&
        session.day === format(day, 'yyyy-MM-dd') &&
        session.time === time
      );
    });

    return sessions;
  }

  public async create({
    movie_id,
    room,
    capacity,
    day,
    time,
  }: ICreateSession): Promise<Session> {
    const session = new Session();

    session.movie_id = movie_id;
    session.id = uuidv4();
    session.room = room;
    session.capacity = capacity;
    session.day = day;
    session.time = time;

    this.sessions.push(session);

    return session;
  }

  public async save(session: Session): Promise<Session> {
    const findIndex = this.sessions.findIndex(
      sessionIndex => sessionIndex.id === session.id,
    );

    this.sessions[findIndex] = session;

    return session;
  }

  public async remove(session: ISession): Promise<void> {
    const index = this.sessions.findIndex(
      findSession => findSession.id === session.id,
    );

    if (index !== -1) {
      this.sessions.splice(index, 1);
    }
  }
}

export default FakeSessionsRepository;
