import sessionsRouter from '@modules/sessions/infra/http/routes/Sessions.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/movies/{movie_id}/sessions', sessionsRouter);

export default routes;
