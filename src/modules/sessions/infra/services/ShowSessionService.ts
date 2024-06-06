import { ISession } from '@modules/sessions/domain/models/ISession';
import { IShowSession } from '@modules/sessions/domain/models/IShowSession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}
  public async execute({ id }: IShowSession): Promise<ISession> {
    const session = await this.sessionsRepository.findById(id);

    if (!session) {
      throw new AppError(404, 'Not found', 'Session not found');
    }

    return session;
  }
}

export default ShowSessionService;
