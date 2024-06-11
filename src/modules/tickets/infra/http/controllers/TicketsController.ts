import CreateTicketService from '@modules/tickets/services/CreateTicketService';
import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';
import ListTicketService from '@modules/tickets/services/ListTicketService';
import ShowTicketService from '@modules/tickets/services/ShowTicketService';
import UpdateTicketService from '@modules/tickets/services/UpdateTicketService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

class TicketsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { movie_id, session_id, id } = request.params;

    const showTicket = container.resolve(ShowTicketService);

    const ticket = await showTicket.execute({ id, movie_id, session_id });

    return response.json(instanceToInstance(ticket));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { movie_id, session_id } = request.params;

    const listTickets = container.resolve(ListTicketService);
    const tickets = await listTickets.execute({ movie_id, session_id });

    return response.json(instanceToInstance(tickets));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { session_id, movie_id } = request.params;
    const { chair, value } = request.body;

    const createTicket = container.resolve(CreateTicketService);

    const ticket = await createTicket.execute({
      session_id,
      movie_id,
      value,
      chair,
    });

    return response.status(201).json(instanceToInstance(ticket));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { chair, value } = request.body;
    const { id, session_id, movie_id } = request.params;
    const updateTicket = container.resolve(UpdateTicketService);

    const ticket = await updateTicket.execute({
      id,
      session_id,
      movie_id,
      chair,
      value,
    });

    return response.status(201).json(instanceToInstance(ticket));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id, session_id, movie_id } = request.params;
    const deleteTicket = container.resolve(DeleteTicketService);

    await deleteTicket.execute({ id, session_id, movie_id });

    return response.status(204).json();
  }
}
export default TicketsController;
