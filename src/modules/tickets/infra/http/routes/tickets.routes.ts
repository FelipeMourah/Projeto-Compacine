import { Router } from 'express';
import TicketsController from '../controllers/TicketsController';
import { Joi, Segments, celebrate } from 'celebrate';

const ticketsController = new TicketsController();

const ticketRouter = Router();

ticketRouter.get(
  '/:movie_id/sessions/:session_id/tickets',
  celebrate({
    [Segments.PARAMS]: {
      session_id: Joi.string().uuid().required(),
      movie_id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.index,
);

ticketRouter.get(
  '/:movie_id/sessions/:session_id/tickets/:id',
  celebrate({
    [Segments.BODY]: {
      chair: Joi.string().required(),
      value: Joi.number().precision(2).unsafe().required(),
    },
    [Segments.PARAMS]: {
      session_id: Joi.string().uuid().required(),
      movie_id: Joi.string().uuid().required(),
      id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.show,
);

ticketRouter.post(
  '/:movie_id/sessions/:session_id/tickets',
  celebrate({
    [Segments.BODY]: {
      chair: Joi.string().required(),
      value: Joi.number().precision(2).unsafe().required(),
    },
    [Segments.PARAMS]: {
      session_id: Joi.string().uuid().required(),
      movie_id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.create,
);

ticketRouter.put(
  '/:movie_id/sessions/:session_id/tickets/:id',
  celebrate({
    [Segments.BODY]: {
      chair: Joi.string().required(),
      value: Joi.number().precision(2).unsafe().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      session_id: Joi.string().uuid().required(),
      movie_id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.update,
);

ticketRouter.delete(
  '/:movie_id/sessions/:session_id/tickets/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      movie_id: Joi.string().uuid().required(),
      session_id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.delete,
);

export default ticketRouter;
