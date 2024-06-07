import { DataSource } from "typeorm";
import { Ticket } from "../infra/typeorm/entities/Tickets";
import { inject, injectable } from "tsyringe";
import { ITicketsRepository } from "../domain/repositories/ITicketsRepository";
import { IUpdateTicket } from "../domain/models/IUpdateTicket";
import { ITicket } from "../domain/models/ITicket";
import AppError from "@shared/errors/AppError";



@injectable()
class UpdateTicketService {
  constructor(
    @inject('TicketsRepository')
    private ormRepository: ITicketsRepository
  ) {}

  public async execute(ticket: IUpdateTicket): Promise<ITicket| null> {
    const ticketExists = await this.ormRepository.findById(ticket.id);

    if(!ticketExists) {
      throw new AppError(404, "", "");
    }

    const ticketUpdated = await this.ormRepository.updateTicket(ticketExists)

    return ticketUpdated;
  }
}

export default UpdateTicketService;