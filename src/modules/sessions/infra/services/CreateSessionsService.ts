import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { ICreateSession } from '@modules/sessions/domain/models/ICreateSession';
import { ISession } from '@modules/sessions/domain/models/ISession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { format, isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateSessionsService {
  constructor(
    @inject('SessionsRepository')
    private sessionRepository: ISessionsRepository,

    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}
  public async execute({
    movie_id,
    room,
    capacity,
    day,
    time,
  }: ICreateSession): Promise<ISession> {
    const movieExists = await this.movieRepository.findById(movie_id);

    if (!movieExists) {
      throw new AppError(404, 'Not Found', 'Movie not found.');
    }

    const sessionDate = new Date(day);
    const today = new Date();

    if (isBefore(sessionDate, today)) {
      throw new AppError(
        400,
        'Bad Request',
        'The date informed is already passed',
      );
    }

    const sessionExists = await this.sessionRepository.findByRoomAndDateTime({
      room,
      day: format(day, 'yyyy-MM-dd'),
      time,
    });

    if (sessionExists.length > 0) {
      throw new AppError(
        400,
        'Bad request',
        'There is already a session in this same room, day and time',
      );
    }

    const session = await this.sessionRepository.create({
      movie_id,
      room,
      capacity,
      day,
      time,
    });
    return {
      ...session,
      day: format(day, 'dd/MM/yyyy'),
    };
  }
}

export default CreateSessionsService;
