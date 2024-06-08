import { Router } from 'express';
import TicketsController from '../controllers/TicketsController';
import { Joi, Segments, celebrate } from 'celebrate';

const ticketsController = new TicketsController();

const ticketRouter = Router();

ticketRouter.post('/', celebrate({
  [Segments.BODY]: {
    chair: Joi.string().required(),
    value: Joi.number().precision(2).unsafe().required()
  },
  [Segments.PARAMS]: {
    session_id: Joi.string().uuid().required(),
    movie_id: Joi.string().uuid().required()
  }
}), ticketsController.create);

ticketRouter.put('/', celebrate({
  [Segments.BODY]: {
    chair: Joi.string().required(),
    value: Joi.number().precision(2).unsafe().required()
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
    session_id: Joi.string().uuid().required(),
    movie_id: Joi.string().uuid().required()
  }
}), ticketsController.update);

ticketRouter.delete('/', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), ticketsController.delete);

export default ticketRouter;
