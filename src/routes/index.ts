import { Router } from 'express';
import authRouter from './auth.routes';
import providersRouter from './providers.routes';
import servicesRouter from './services.routes';

const routes = Router();
routes.use('/auth', authRouter);
routes.use('/providers', providersRouter);
routes.use('/services', servicesRouter);

export default routes;
