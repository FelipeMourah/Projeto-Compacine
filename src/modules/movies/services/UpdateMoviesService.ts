import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { format } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { IUpdateMovie } from '../domain/models/IUpdateMovie';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import Movie from '../infra/typeorm/entities/Movies';

@injectable()
class UpdateMovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  public async execute({
    id,
    image,
    name,
    description,
    actors,
    genre,
    release_date,
  }: IUpdateMovie): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new AppError(404, 'Not found', 'Movie not found');
    }

    movie.image = image;
    movie.name = name;
    movie.description = description;
    movie.actors = actors;
    movie.genre = genre;
    movie.release_date = release_date;

    await this.movieRepository.save(movie);

    return {
      ...movie,
      release_date: format(release_date, 'dd/MM/yyyy'),
    };
  }
}

export default UpdateMovieService;
