import { inject, injectable } from "tsyringe";
import { ITicketsRepository } from "../domain/repositories/ITicketsRepository";
import { ITicket } from "../domain/models/ITicket";
import { IShowTicket } from "../domain/models/IShowTicket";


@injectable()
class ShowTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketRepository: ITicketsRepository
  ){}

  public async execute({id}: IShowTicket): Promise<ITicket | null> {
    const ticket = await this.ticketRepository.findById(id);
    return ticket;
  }

}

export default ShowTicketService;
