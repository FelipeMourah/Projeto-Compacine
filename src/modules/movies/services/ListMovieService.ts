import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import Movie from '../infra/typeorm/entities/Movies';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import { addDays, format } from 'date-fns';

@injectable()
class ListMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute(): Promise<Movie[]> {
    const movies = await this.moviesRepository.findAll();

    const formattedMovies = movies.map(movie => {
      const newDate = addDays(movie.release_date, 1);
      const formattedDay = format(newDate, 'dd-MM-yyyy');
      return {
        ...movie,
        release_date: formattedDay,
      };
    });

    return formattedMovies;
  }
}

export default ListMovieService;
