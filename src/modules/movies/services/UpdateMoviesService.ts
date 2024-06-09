import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  image: string;
  name: string;
  description: string;
  actors: string;
  genre: string;
  release_date: string;
}

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
  }: IRequest): Promise<void> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new AppError(404, 'Not found', 'Movie not found');
    }

    movie.image = image;
    movie.name = name;
    movie.description = description;
    movie.actors = JSON.stringify(actors);
    movie.genre = genre;
    movie.release_date = release_date;

    await this.movieRepository.save(movie);
  }
}

export default UpdateMovieService;
