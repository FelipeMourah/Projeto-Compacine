import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { ISession } from '@modules/sessions/domain/models/ISession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { addDays, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListSessionsService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}
  public async execute(movie_id: string): Promise<ISession[]> {
    const movieExists = await this.movieRepository.findById(movie_id);

    if (!movieExists) {
      throw new AppError(404, 'Not Found', 'Movie not found.');
    }

    const sessions = await this.sessionsRepository.findAll();

    const formattedSessions = sessions.map(session => {
      const newDate = addDays(session.day, 1);
      const formattedDay = format(newDate, 'dd/MM/yyyy');
      return {
        ...session,
        day: formattedDay,
      };
    });

    return formattedSessions;
  }
}

export default ListSessionsService;
