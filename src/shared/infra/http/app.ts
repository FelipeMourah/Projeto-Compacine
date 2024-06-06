import 'reflect-metadata';
import InternalServerError from '@shared/errors/InternalServerError';
import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import '@shared/container';
import { dataSource } from '../typeorm';
import ErrorHandler from './middlewares/ErrorHandler';
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use(errors());
app.use(ErrorHandler);
app.use(InternalServerError);

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
