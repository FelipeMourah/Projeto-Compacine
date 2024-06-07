import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { IDeleteSession } from '@modules/sessions/domain/models/IDeleteSession';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionRepository: ISessionsRepository,
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}
  public async execute({ id, movie_id }: IDeleteSession): Promise<void> {
    const movieExists = await this.movieRepository.findById(movie_id);

    if (!movieExists) {
      throw new AppError(404, 'Not Found', 'Movie not found.');
    }

    const session = await this.sessionRepository.findById(id);

    if (!session) {
      throw new AppError(404, 'Not found', 'Session not found');
    }

    await this.sessionRepository.remove(session);
  }
}

export default DeleteSessionService;
