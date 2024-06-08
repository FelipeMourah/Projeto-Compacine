import moviesRouter from '@modules/movies/infra/http/routes/movies.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/movies', moviesRouter);

export default routes;
