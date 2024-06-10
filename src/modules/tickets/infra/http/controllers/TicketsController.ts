import ShowOneMovieService from '@modules/movies/services/ShowOneMovieService';
import ShowSessionService from '@modules/sessions/infra/services/ShowSessionService';
import CreateTicketService from '@modules/tickets/services/CreateTicketService';
import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';
import ListTicketService from '@modules/tickets/services/ListTicketService';
import ShowTicketService from '@modules/tickets/services/ShowTicketService';
import UpdateTicketService from '@modules/tickets/services/UpdateTicketService';
import AppError from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

class TicketsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { movie_id, session_id, id } = request.params;

    const showMovie = container.resolve(ShowOneMovieService)
    const movie = await showMovie.execute(movie_id)
    if(!movie) {
      throw new AppError(404, "Not found", "Movie not found", [`movie_id: ${movie_id}`])
    }

    const showSession = container.resolve(ShowSessionService)
    const session = await showSession.execute({movie_id, id: session_id})
    if(!session) {
      throw new AppError(404, "Not found", "Session not found", [`session_id: ${session_id}`])
    }

    const showTicket = container.resolve(ShowTicketService)
    const ticket = await  showTicket.execute({id})
    if(!ticket) {
      throw new AppError(404, "Not found", "Ticket not found", [`ticket_id: ${id}`])
    }

    return response.json(instanceToInstance(ticket));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { movie_id, session_id } = request.params;

    const showMovie = container.resolve(ShowOneMovieService)
    const movie = await showMovie.execute(movie_id)
    if(!movie) {
      throw new AppError(404, "Not found", "Movie not found", [`movie_id: ${movie_id}`])
    }

    const showSession = await  container.resolve(ShowSessionService)
    const session = showSession.execute({movie_id, id: session_id})
    if(!session) {
      throw new AppError(404, "Not found", "Session not found", [`session_id: ${session_id}`])
    }

    const listTickets = container.resolve(ListTicketService)
    const tickets = await listTickets.execute()

    return response.json(instanceToInstance(tickets));
  }


  public async create(request: Request, response: Response): Promise<Response> {
    const { session_id, movie_id } = request.params;
    const { chair, value } = request.body;

    const showMovie = container.resolve(ShowOneMovieService)
    const movie = showMovie.execute(movie_id)
    if(!movie) {
      throw new AppError(404, "Not found", "Movie not found", [`movie_id: ${movie_id}`])
    }

    const showSession = container.resolve(ShowSessionService)
    const session = showSession.execute({movie_id, id: session_id})
    if(!session) {
      throw new AppError(404, "Not found", "Session not found", [`session_id: ${session_id}`])
    }

    const createTicket = container.resolve(CreateTicketService);

    const ticket = await createTicket.execute({
      session_id,
      value,
      chair,
    });

    return response.status(201).json(instanceToInstance(ticket));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    
    const { chair, value } = request.body;
    const { id, session_id, movie_id } = request.params;
    const showMovie = container.resolve(ShowOneMovieService)
    const movie = showMovie.execute(movie_id)
    if(!movie) {
      throw new AppError(404, "Not found", "Movie not found", [`movie_id: ${movie_id}`])
    }

    const showSession = container.resolve(ShowSessionService)
    const session = showSession.execute({movie_id, id: session_id})
    if(!session) {
      throw new AppError(404, "Not found", "Session not found", [`session_id: ${session_id}`])
    }

    const updateTicket = container.resolve(UpdateTicketService);

    const product = await updateTicket.execute({
      id,
      session_id,
      chair,
      value
    });

    return response.status(201).json(instanceToInstance(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id, session_id, movie_id } = request.params;

    const showMovie = container.resolve(ShowOneMovieService)
    const movie = showMovie.execute(movie_id)
    if(!movie) {
      throw new AppError(404, "Not found", "Movie not found", [`movie_id: ${movie_id}`])
    }

    const showSession = container.resolve(ShowSessionService)
    const session = showSession.execute({movie_id, id: session_id})
    if(!session) {
      throw new AppError(404, "Not found", "Session not found", [`session_id: ${session_id}`])
    }

    const deleteCustomer = container.resolve(DeleteTicketService);

    await deleteCustomer.execute({ id, session_id });

    return response.status(204).json();
  }
}
export default TicketsController;
