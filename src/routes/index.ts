import { Router } from 'express';
import authRouter from './auth.routes';
import providersRouter from './providers.routes';

const routes = Router();
routes.use('/auth', authRouter);
routes.use('/providers', providersRouter);

export default routes;
