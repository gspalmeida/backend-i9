/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import ServiceType from '../models/ServiceType';

import CreateAdminService from '../services/CreateAdminService';
import CreateServiceTypeService from '../services/CreateServiceType';
import UpdateServiceTypeService from '../services/UpdateServiceTypeService';
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

serviceTypesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  console.log(name);

  const updateServiceType = new UpdateServiceTypeService();

  const service = await updateServiceType.execute({
    id,
    name,
  });

  return response.json(service);
});

serviceTypesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const serviceTypeRepository = getRepository(ServiceType);

  await serviceTypeRepository.delete(id);
  response.sendStatus(200);
});

adminsRouter.post('/', upload.single('avatar'), async (request, response) => {
  console.log('entrous');

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
