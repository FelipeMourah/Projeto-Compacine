import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import Movie from '../infra/typeorm/entities/Movies';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowOneMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findById(id);

    if (!movie) {
      throw new AppError(404, 'Not found', 'Movie not found');
    }

    return movie;
  }
}

export default ShowOneMovieService;
