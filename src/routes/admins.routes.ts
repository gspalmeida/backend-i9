/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateAdminService from '../services/CreateAdminService';
import CreateServiceTypeService from '../services/CreateServiceType';
import serviceTypesRouter from './serviceTypes.routes';

interface AdminWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

const adminsRouter = Router();
const upload = multer(uploadConfig);

adminsRouter.use('/servicetypes', serviceTypesRouter);

serviceTypesRouter.post('/', async (request, response) => {
  const { serviceName } = request.body;

  const createService = new CreateServiceTypeService();

  const serviceType = await createService.execute({
    serviceName,
  });

  return response.json(serviceType);
});

adminsRouter.post('/', upload.single('avatar'), async (request, response) => {
  console.log('entrou');

  let avatar = '';
  const { name, email, password } = request.body;
  if (request.file) {
    avatar = request.file.filename;
  }

  const createAdmin = new CreateAdminService();

  const admin: AdminWithoutPassword = await createAdmin.execute({
    name,
    email,
    password,
    avatar,
  });

  delete admin.password;

  return response.json(admin);
});
export default adminsRouter;
