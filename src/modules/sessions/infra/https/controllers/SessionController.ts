import { Request, Response } from 'express';

import CreateSessionsService from '../../services/CreateSessionsService';
import DeleteSessionService from '../../services/DeleteSessionService';
import ListSessionsService from '../../services/ListSessionsService';
import ShowSessionService from '../../services/ShowSessionService';
import UpdateSessionService from '../../services/UpdateSessionService';

import { container } from 'tsyringe';

export default class SessionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listSessions = container.resolve(ListSessionsService);

    const sessions = await listSessions.execute();

    return res.json(sessions);
  }

  //movie_id precisa ser adicionado ao codigo pois é parametro de busca
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    //const {movie_id} = req.params

    const showSession = container.resolve(ShowSessionService);

    const session = await showSession.execute({ id });

    return res.json(session);
  }

  //movie_id precisa ser adicionado ao codigo pois é parametro de busca
  public async create(req: Request, res: Response): Promise<Response> {
    //const { movie_id } = req.params;
    const { room, capacity, day, time } = req.body;

    const createSession = container.resolve(CreateSessionsService);

    const session = await createSession.execute({
      room,
      capacity,
      day,
      time,
    });

    return res.json(session);
  }

  //movie_id precisa ser implementado
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    //const {movie_id} = req.params
    const { room, capacity, day, time } = req.body;

    const updateSession = container.resolve(UpdateSessionService);

    const session = await updateSession.execute({
      id,
      room,
      capacity,
      day,
      time,
    });

    return res.json(session);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    //const {movie_id} = req.params

    const deleteSession = container.resolve(DeleteSessionService);

    await deleteSession.execute({ id /*,movie_id*/ });

    return res.json([]);
  }
}
