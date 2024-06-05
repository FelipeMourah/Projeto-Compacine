import { Repository } from 'typeorm';
import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { IMovies } from '@modules/movies/domain/models/IMovies';
import { dataSource } from '@shared/infra/typeorm';
import { ICreateMovie } from '@modules/movies/domain/models/ICreateMovie';

class MovieRepository implements IMovieRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Movie);
  }

  public async findById(id: string): Promise<Movie | null> {
    const movie = await this.ormRepository.findOne({ where: { id } });
    return movie;
  }

  public async findAll(): Promise<Movie[]> {
    const movies = await this.ormRepository.find();
    return movies;
  }

  public async create({
    image,
    name,
    description,
    actors,
    genre,
    release_date,
    sessions,
  }: ICreateMovie): Promise<Movie> {
    const movie = this.ormRepository.create({
      image,
      name,
      description,
      actors,
      genre,
      release_date,
      sessions,
    });
    await this.ormRepository.save(movie);
    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    await this.ormRepository.save(movie);

    return movie;
  }

  public async remove(movie: Movie): Promise<void> {
    await this.ormRepository.remove(movie);
  }
}

export default MovieRepository;
