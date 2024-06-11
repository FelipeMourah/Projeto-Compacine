import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { ISession } from '@modules/sessions/domain/models/ISession';
import { IUpdateSession } from '@modules/sessions/domain/models/IUpdateSession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { format, isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  public async execute({
    movie_id,
    id,
    room,
    capacity,
    day,
    time,
  }: IUpdateSession): Promise<ISession> {
    const movieExists = await this.movieRepository.findById(movie_id);

    if (!movieExists) {
      throw new AppError(404, 'Not Found', 'Movie not found.');
    }

    const session = await this.sessionsRepository.findById(id);

    if (!session) {
      throw new AppError(404, 'Not found', 'Session not found');
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

    const sessionExists = await this.sessionsRepository.findByRoomAndDateTime({
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

    session.room = room;
    session.capacity = capacity;
    session.day = day;
    session.time = time;

    await this.sessionsRepository.save(session);

    return {
      ...session,
      day: format(day, 'dd/MM/yyyy'),
    };
  }
}

export default UpdateSessionService;
