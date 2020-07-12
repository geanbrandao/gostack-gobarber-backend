import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import logs from './middlewares/logs';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // 'servir' uma pasta de forma estatica,
app.use(logs);
app.use(routes);

// middlewares para tratativa de erros precisam ter 4 parametros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started');
});
