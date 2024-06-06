import { ICreateSession } from '@modules/sessions/domain/models/ICreateSession';
import { ISession } from '@modules/sessions/domain/models/ISession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateSessionsService {
  constructor(
    @inject('SessionsRepository')
    private sessionRepository: ISessionsRepository,
  ) {}
  public async execute({
    room,
    capacity,
    day,
    time,
  }: ICreateSession): Promise<ISession> {
    const sessionExists = await this.sessionRepository.findByRoomAndDateTime({
      room,
      day,
      time,
    });

    if (sessionExists) {
      throw new AppError(
        400,
        'Bad request',
        'There is already a session in this same room, day and time',
      );
    }

    const session = await this.sessionRepository.create({
      room,
      capacity,
      day,
      time,
    });

    return session;
  }
}

export default CreateSessionsService;
