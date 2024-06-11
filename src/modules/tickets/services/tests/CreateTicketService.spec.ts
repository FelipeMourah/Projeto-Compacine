import { FakeTicketsRepository } from '@modules/tickets/domain/repositories/fakes/FakeTicketsRepository';
import CreateTicketService from '../CreateTicketService';
import { v4 as uuidv4 } from 'uuid';
let fakeSessionsRepository: FakeTicketsRepository;
let fakeMoviesRepository: FakeTicketsRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let createTicket: CreateTicketService;
describe('CreateTicketService', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeTicketsRepository();
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeSessionsRepository = new FakeTicketsRepository();
    createTicket = new CreateTicketService(fakeTicketsRepository, fakeMoviesRepository, fakeSessionsRepository);
  });
  it('should be able to create a new customer', async () => {
    const session_id = uuidv4();
    const { chair, value } = { chair: 'A9', value: 20 };
    const ticket = await createTicket.execute({ chair, value, session_id });

    expect(ticket).toHaveProperty('id', 'created_at');
  });
});
