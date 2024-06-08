import { container } from 'tsyringe';
import { Router } from 'express';
import { MovieController } from '../controllers/MoviesController';
import { Joi, Segments, celebrate } from 'celebrate';

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
      description: Joi.string().required(),
      actors: Joi.string().required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
      sessions: Joi.string().required(),
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
      description: Joi.string().required(),
      actors: Joi.string().required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
      sessions: Joi.string().required(),
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

export default moviesRouter;
