import { Router } from 'express';
import authRouter from './auth.routes';
import providersRouter from './providers.routes';
import adminsRouter from './admins.routes';
import servicesRouter from './services.routes';
import serviceTypesRouter from './serviceTypes.routes';

const routes = Router();
routes.use('/auth', authRouter);
routes.use('/providers', providersRouter);
routes.use('/admins', adminsRouter);
routes.use('/services', servicesRouter);
routes.use('/servicetypes', serviceTypesRouter);

export default routes;
