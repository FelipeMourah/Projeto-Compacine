import { Repository } from 'typeorm';
import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import { IMovieRepository } from '@modules/movies/domain/repositories/IMovieRepository';
import { dataSource } from '@shared/infra/typeorm';
import { ICreateMovie } from '@modules/movies/domain/models/ICreateMovie';

class MovieRepository implements IMovieRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Movie);
  }

  public async findById(id: string): Promise<Movie | null> {
    const movie = await this.ormRepository.findOne({
      where: { id },
      relations: ['sessions', 'sessions.tickets'],
    });
    return movie;
  }

  public async findAll(): Promise<Movie[]> {
    const movies = await this.ormRepository.find({
      relations: ['sessions', 'sessions.tickets'],
    });
    return movies;
  }

  public async create({
    image,
    name,
    description,
    actors,
    genre,
    release_date,
  }: ICreateMovie): Promise<Movie> {
    const movie = this.ormRepository.create({
      image,
      name,
      description,
      actors,
      genre,
      release_date,
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

  public async findByName(name: string): Promise<Movie | null> {
    const movie = await this.ormRepository.findOne({ where: { name } });
    return movie;
  }

  public async update(movie: Movie): Promise<Movie> {
    return this.ormRepository.save(movie);
  }
}

export default MovieRepository;
