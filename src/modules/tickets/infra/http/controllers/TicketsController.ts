import CreateTicketService from '@modules/tickets/services/CreateTicketService';
import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';
import UpdateTicketService from '@modules/tickets/services/UpdateTicketService';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

class TicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { session_id } = request.params;
    const { chair, value } = request.body;

    const createTicket = container.resolve(CreateTicketService);

    const ticket = await createTicket.execute({
      session_id,
      value,
      chair,
    });

    return response.json(ticket);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { chair, value } = request.body;
    const { id, session_id } = request.params;

    const updateTicket = container.resolve(UpdateTicketService);

    const product = await updateTicket.execute({
      id,
      session_id,
      chair,
      value
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id, session_id } = request.params;

    const deleteCustomer = container.resolve(DeleteTicketService);

    await deleteCustomer.execute({ id, session_id });

    return response.json([]);
  }
}
export default TicketsController;
