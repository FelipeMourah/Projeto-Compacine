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
  sessions: string;
}

@injectable()
class UpdateProductService {
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
    sessions,
  }: IRequest): Promise<void> {
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
    movie.sessions = sessions;

    await this.movieRepository.save(movie);
  }
}

export default UpdateProductService;
