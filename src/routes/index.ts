import { Router } from 'express';
import authRouter from './auth.routes';
import providersRouter from './providers.routes';
import adminsRouter from './admins.routes';
import servicesRouter from './services.routes';
import serviceTypesRouter from './serviceTypes.routes';
import isAdmin from '../middlewares/isAdmin';

const routes = Router();
routes.use('/auth', authRouter);
routes.use('/providers', providersRouter);
routes.use('/admins', isAdmin, adminsRouter);
routes.use('/services', servicesRouter);
routes.use('/servicetypes', serviceTypesRouter);

export default routes;
