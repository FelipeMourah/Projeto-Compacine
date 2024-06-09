import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateMovie } from '../domain/models/ICreateMovie';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import Movie from '../infra/typeorm/entities/Movies';

@injectable()
class CreateMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute({
    image,
    name,
    description,
    actors,
    genre,
    release_date,
  }: ICreateMovie): Promise<Movie> {
    const movieExists = await this.moviesRepository.findByName(name);

    if (movieExists) {
      throw new AppError(400, 'Bad Request', 'Movie already exists');
    }

    const movie = await this.moviesRepository.create({
      image,
      name,
      description,
      actors,
      genre,
      release_date,
    });

    await this.moviesRepository.save(movie);

    return movie;
  }
}

export default CreateMovieService;
