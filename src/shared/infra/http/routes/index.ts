import moviesRouter from '@modules/movies/infra/http/routes/movies.routes';
import sessionsRouter from '@modules/sessions/infra/http/routes/sessions.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/movie', sessionsRouter);

routes.use('/movies', moviesRouter);

export default routes;
