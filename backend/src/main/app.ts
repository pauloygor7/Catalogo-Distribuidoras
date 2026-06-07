import express from 'express';
import cors from 'cors';
import { routes } from '@shared/infra/http/routes';
import { errorHandler } from '@shared/middlewares/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

export { app };