import moviesRouter from '@modules/movies/infra/http/routes/movies.routes';
import sessionsRouter from '@modules/sessions/infra/http/routes/sessions.routes';
import ticketRouter from '@modules/tickets/infra/http/routes/tickets.routes';
import { Router } from 'express';
 
const routes = Router();
routes.use('/movies', moviesRouter);
 
routes.use('/movies', sessionsRouter);
 
routes.use('/movies', ticketRouter);
 
export default routes;
