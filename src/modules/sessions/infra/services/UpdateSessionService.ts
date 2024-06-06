import { ISession } from '@modules/sessions/domain/models/ISession';
import { IUpdateSession } from '@modules/sessions/domain/models/IUpdateSession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}

  public async execute({
    id,
    room,
    capacity,
    day,
    time,
  }: IUpdateSession): Promise<ISession> {
    const session = await this.sessionsRepository.findById(id);

    if (!session) {
      throw new AppError(404, 'Not found', 'Session not found');
    }

    session.room = room;
    session.capacity = capacity;
    session.day = day;
    session.time = time;

    await this.sessionsRepository.save(session);

    return session;
  }
}

export default UpdateSessionService;
