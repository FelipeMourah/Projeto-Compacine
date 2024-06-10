import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { ISession } from '@modules/sessions/domain/models/ISession';
import { IShowSession } from '@modules/sessions/domain/models/IShowSession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { addDays, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}
  public async execute({ movie_id, id }: IShowSession): Promise<ISession> {
    const movieExists = await this.movieRepository.findById(movie_id);

    if (!movieExists) {
      throw new AppError(404, 'Not Found', 'Movie not found.');
    }

    const session = await this.sessionsRepository.findById(id);

    if (!session) {
      throw new AppError(404, 'Not found', 'Session not found');
    }

    const newDate = addDays(session.day, 1);
    const formattedDay = format(newDate, 'dd/MM/yyyy');

    const formattedSession = {
      ...session,
      day: formattedDay,
    };

    return formattedSession;
  }
}

export default ShowSessionService;
