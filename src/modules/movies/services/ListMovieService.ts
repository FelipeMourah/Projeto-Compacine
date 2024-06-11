import { addDays, format } from 'date-fns';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import Movie from '../infra/typeorm/entities/Movies';

@injectable()
class ListMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute(): Promise<Movie[]> {
    const movies = await this.moviesRepository.findAll();

    return movies.map(movie => {
      const newDate = addDays(movie.release_date, 1);
      const formattedDay = format(newDate, 'dd/MM/yyyy');
      const formattedSessionDay =
        movie.sessions && Array.isArray(movie.sessions)
          ? movie.sessions.map(session => {
              const newSessionDay = addDays(session.day, 1);

              return {
                ...session,
                day: format(newSessionDay, 'dd/MM/yyyy'),
              };
            })
          : [];
      return {
        ...movie,
        release_date: formattedDay,
        sessions: formattedSessionDay,
      };
    });
  }
}

export default ListMovieService;
