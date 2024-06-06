import { ISession } from '@modules/sessions/domain/models/ISession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListSessionsService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}
  public async execute(): Promise<ISession[]> {
    const sessions = await this.sessionsRepository.findAll();

    return sessions;
  }
}

export default ListSessionsService;
