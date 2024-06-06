import { inject, injectable } from 'tsyringe';
import Movie from '../infra/typeorm/entities/Movies';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';

@injectable()
class ListMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute(): Promise<Movie[]> {
    const movies = await this.moviesRepository.findAll();

    return movies;
  }
}

export default ListMovieService;
