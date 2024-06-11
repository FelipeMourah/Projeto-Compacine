import '@shared/container';
import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { dataSource } from '../typeorm';
import ErrorHandler from './middlewares/ErrorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../../../swagger.json';
import routes from './routes';
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', routes);

app.use(errors());
app.use(ErrorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
