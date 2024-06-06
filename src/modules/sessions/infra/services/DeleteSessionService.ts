import { IDeleteSession } from '@modules/sessions/domain/models/IDeleteSession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionRepository: ISessionsRepository,
  ) {}
  public async execute({ id, movie_id }: IDeleteSession): Promise<void> {
    const session = await this.sessionRepository.findById(id);

    if (!session) {
      throw new AppError(404, 'Not found', 'Session not found');
    }

    await this.sessionRepository.remove(session);
  }
}

export default DeleteSessionService;
