import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../domain/repositories/IMovieRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class DeleteMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const movie = await this.moviesRepository.findById(id);

    if (!movie) {
      throw new AppError(404, 'Not found', 'Movie not found');
    }

    await this.moviesRepository.remove(movie);
  }
}

export default DeleteMovieService;
