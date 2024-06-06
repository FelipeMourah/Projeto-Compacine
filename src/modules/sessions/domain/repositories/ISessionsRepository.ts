import { ISessions } from '../models/ISessions';

export interface ISessionsRepository {
  findAll(): Promise<ISessions[]>;
  findById(id: string): Promise<ISessions | null>;
  create(data: ISessions): Promise<ISessions>;
  save(session: ISessions): Promise<ISessions>;
  remove(session: ISessions): Promise<void>;
}
