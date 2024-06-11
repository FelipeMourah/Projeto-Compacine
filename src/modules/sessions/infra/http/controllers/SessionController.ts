import { Request, Response } from 'express';

import CreateSessionsService from '../../services/CreateSessionsService';
import DeleteSessionService from '../../services/DeleteSessionService';
import ListSessionsService from '../../services/ListSessionsService';
import ShowSessionService from '../../services/ShowSessionService';
import UpdateSessionService from '../../services/UpdateSessionService';

import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

export default class SessionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { movie_id } = request.params;

    const listSessions = container.resolve(ListSessionsService);

    const sessions = await listSessions.execute(movie_id);

    return response.json(instanceToInstance(sessions));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { movie_id } = request.params;

    const showSession = container.resolve(ShowSessionService);

    const session = await showSession.execute({ movie_id, id });

    return response.json(instanceToInstance(session));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { movie_id } = request.params;
    const { room, capacity, day, time } = request.body;
    const createSession = container.resolve(CreateSessionsService);

    const session = await createSession.execute({
      movie_id,
      room,
      capacity,
      day,
      time,
    });

    return response.status(201).json(instanceToInstance(session));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { movie_id } = request.params;
    const { room, capacity, day, time } = request.body;

    const updateSession = container.resolve(UpdateSessionService);

    const session = await updateSession.execute({
      movie_id,
      id,
      room,
      capacity,
      day,
      time,
    });

    return response.status(201).json(instanceToInstance(session));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { movie_id } = request.params;

    const deleteSession = container.resolve(DeleteSessionService);

    await deleteSession.execute({ id, movie_id });

    return response.status(204).json();
  }
}
