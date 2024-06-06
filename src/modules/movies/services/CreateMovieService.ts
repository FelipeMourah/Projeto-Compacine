import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import Movie from '../infra/typeorm/entities/Movies';
import AppError from '@shared/errors/AppError';

interface IRequest {
  image: string;
  name: string;
  description: string;
  actors: string;
  genre: string;
  release_date: string;
  sessions: string;
}

@injectable()
class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute({
    image,
    name,
    description,
    actors,
    genre,
    release_date,
    sessions,
  }: IRequest): Promise<Movie | undefined> {
    const movieExists = await this.moviesRepository.findByName(name);

    if (movieExists) {
      throw new AppError(400, 'Movie already exists', 'Movie already exists');
    }

    const movie = await this.moviesRepository.create({
      image,
      name,
      description,
      actors,
      genre,
      release_date,
      sessions,
    });

    await this.moviesRepository.save(movie);

    return movie;
  }
}

export default CreateMovieService;
