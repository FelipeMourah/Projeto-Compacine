import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import JoiDate from '@joi/date';

const JoiExtended = Joi.extend(JoiDate);

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.get(
  '/:movie_id/sessions',
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid().required(),
    },
  }),
  sessionController.index,
);

sessionsRouter.get(
  '/:movie_id/sessions/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      movie_id: Joi.string().uuid().required(),
    },
  }),
  sessionController.show,
);

sessionsRouter.post(
  '/:movie_id/sessions',
  celebrate({
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().required(),
      day: JoiExtended.date().format('DD/MM/YYYY').required(),
      time: Joi.string()
        .pattern(/^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/)
        .required(),
    },
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid().required(),
    },
  }),
  sessionController.create,
);

sessionsRouter.put(
  '/:movie_id/sessions/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      movie_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().required(),
      day: JoiExtended.date().format('DD/MM/YYYY').required(),
      time: Joi.string()
        .pattern(/^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/)
        .required(),
    },
  }),
  sessionController.update,
);

sessionsRouter.delete(
  '/:movie_id/sessions/:id',
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid().required(),
      id: Joi.string().uuid().required(),
    },
  }),
  sessionController.delete,
);

export default sessionsRouter;
