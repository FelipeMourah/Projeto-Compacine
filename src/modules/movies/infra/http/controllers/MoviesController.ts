import CreateMovieService from '@modules/movies/services/CreateMovieService';
import DeleteMovieService from '@modules/movies/services/DeleteMovieService';
import ListMovieService from '@modules/movies/services/ListMovieService';
import ShowOneMovieService from '@modules/movies/services/ShowOneMovieService';
import UpdateMovieService from '@modules/movies/services/UpdateMoviesService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class MovieController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listMovie = container.resolve(ListMovieService);

    const movies = await listMovie.execute();

    return res.json(instanceToInstance(movies));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showMovie = container.resolve(ShowOneMovieService);
    const movie = await showMovie.execute(id);

    return res.json(instanceToInstance(movie));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { image, name, description, actors, genre, release_date } = req.body;
    const createMovie = container.resolve(CreateMovieService);
    const movie = await createMovie.execute({
      image,
      name,
      description,
      actors,
      genre,
      release_date,
    });

    return res.status(201).json(instanceToInstance(movie));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { image, name, description, actors, genre, release_date } = req.body;
    const updateMovie = container.resolve(UpdateMovieService);
    const movie = await updateMovie.execute({
      id,
      image,
      name,
      description,
      actors,
      genre,
      release_date,
    });

    return res.status(201).json(instanceToInstance(movie));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteMovie = container.resolve(DeleteMovieService);
    await deleteMovie.execute({ id });

    return res.status(204).json();
  }
}
