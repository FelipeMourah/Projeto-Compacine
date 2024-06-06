import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import SessionsRepository from '@modules/sessions/infra/typeorm/repositories/SessionsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ISessionsRepository>(
  'SessionsRepository',
  SessionsRepository,
);
