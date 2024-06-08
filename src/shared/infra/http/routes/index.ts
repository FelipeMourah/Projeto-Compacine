import moviesRouter from '@modules/movies/infra/http/routes/movies.routes';
import sessionsRouter from '@modules/sessions/infra/http/routes/sessions.routes';
import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';

const routes = Router();

routes.use(
  '/movie/:movie_id/sessions',
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid().required(),
    },
  }),
  sessionsRouter,
);

routes.use('/movies', moviesRouter);

export default routes;
