import { inject, injectable } from "tsyringe";
import { DataSource } from "typeorm";
import { ITicketsRepository } from "../domain/repositories/ITicketsRepository";
import { ITicket } from "../domain/models/ITicket";


@injectable()
class ListTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketRepository: ITicketsRepository
  ){}

  public async execute(): Promise<ITicket[] | null> {
    const tickets = await this.ticketRepository.findAll();
    return tickets;
  }
}

export default ListTicketService;