import { container } from 'tsyringe';
import { Router } from 'express';
import { MovieController } from '../controllers/MoviesController';
import { Joi, Segments, celebrate } from 'celebrate';
import sessionsRouter from '@modules/sessions/infra/http/routes/sessions.routes';
import JoiDate from '@joi/date';

const JoiExtended = Joi.extend(JoiDate);

const moviesRouter = Router();
const moviesController = container.resolve(MovieController);

moviesRouter.get('/', moviesController.index);

moviesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  moviesController.show,
);

moviesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      image: Joi.string()
        .uri()
        .pattern(/\.(jpeg|jpg|gif|png)$/i)
        .required(),
      name: Joi.string().required(),
      description: Joi.string().max(100, 'utf-8').required(),
      actors: Joi.array().min(1).required(),
      genre: Joi.string().required(),
      release_date: JoiExtended.date().format('DD/MM/YYYY').required(),
    },
  }),
  moviesController.create,
);

moviesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      image: Joi.string()
        .uri()
        .pattern(/\.(jpeg|jpg|gif|png)$/i)
        .required(),
      name: Joi.string().required(),
      description: Joi.string().max(100, 'utf-8').required(),
      actors: Joi.array().min(1).required(),
      genre: Joi.string().required(),
      release_date: JoiExtended.date().format('DD/MM/YYYY').required(),
    },
  }),
  moviesController.update,
);

moviesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  moviesController.delete,
);

moviesRouter.use('*/sessions', sessionsRouter);

export default moviesRouter;
