import { ICreateSession } from '../models/ICreateSession';
import { IFindSessionByRoomAndDateTime } from '../models/IFindSessionByRoomAndDateTime';
import { ISession } from '../models/ISession';

export interface ISessionsRepository {
  findAll(): Promise<ISession[]>;
  findById(id: string): Promise<ISession | null>;
  findByRoomAndDateTime({
    room,
    day,
    time,
  }: IFindSessionByRoomAndDateTime): Promise<ISession[]>;
  create(data: ICreateSession): Promise<ISession>;
  save(session: ISession): Promise<ISession>;
  remove(session: ISession): Promise<void>;
}
