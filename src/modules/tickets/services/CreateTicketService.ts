import { inject, injectable } from "tsyringe";
import { ITicketsRepository } from "../domain/repositories/ITicketsRepository";
import { ICreateTicket } from "../domain/models/ICreateTicket";
import { ITicket } from "../domain/models/ITicket";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateTicketService {

    constructor(
        @inject('TicketsRepository')
        private ticketsRepository: ITicketsRepository){}

    public async execute({
        chair,
        value,
        session_id
    }: ICreateTicket): Promise<ITicket> {
        const ticketExists = await this.ticketsRepository.findByChairAndSession({chair, session_id});

        if (ticketExists) {
            throw new AppError(400, "Bad Request", "This ticket is already created", [`session_id: ${session_id}`,`chair: ${chair}`]);
        }

        const ticket = await this.ticketsRepository.createTicket({   
            chair,
            value,
            session_id
        });

        return ticket;
    }
}

export default CreateTicketService;