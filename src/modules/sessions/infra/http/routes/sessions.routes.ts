import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.get('/', sessionController.index);

sessionsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sessionController.show,
);

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().required(),
      day: Joi.date().required(),
      time: Joi.string().required(),
    },
  }),
  sessionController.create,
);

sessionsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().required(),
      day: Joi.date().required(),
      time: Joi.string().required(),
    },
  }),
  sessionController.update,
);

sessionsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sessionController.delete,
);

export default sessionsRouter;
