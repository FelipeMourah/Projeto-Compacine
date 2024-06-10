import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import Movie from '../infra/typeorm/entities/Movies';
import AppError from '@shared/errors/AppError';
import { addDays, format } from 'date-fns';

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

    const newDate = addDays(movie.release_date, 1);
    const formattedDay = format(newDate, 'dd-MM-yyyy');

    const formattedMovie: Movie = {
      ...movie,
      release_date: formattedDay,
    };

    return formattedMovie;
  }
}

export default ShowOneMovieService;
