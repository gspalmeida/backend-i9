/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import moment from 'moment';
import uploadConfig from '../config/upload';

import ServiceType from '../models/ServiceType';
import ProvidedService from '../models/ProvidedService';
import Provider from '../models/Provider';

import serviceTypesRouter from './serviceTypes.routes';
import servicesRouter from './services.routes';

import CreateAdminService from '../services/CreateAdminService';
import CreateServiceTypeService from '../services/CreateServiceType';
import UpdateServiceTypeService from '../services/UpdateServiceTypeService';
import UpdateProviderAprovalStatus from '../services/UpdateProviderAprovalStatus';
import AppError from '../errors/AppError';

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

adminsRouter.use('/services', servicesRouter);

servicesRouter.get('/all', async (request, response) => {
  let services = [];
  let parsedStartDate = '';
  let parsedEndDate = '';
  let parsedDueDate = '';
  const serviceRepository = getRepository(ProvidedService);

  const { startDate, endDate } = request.query;

  services = await serviceRepository.find({
    relations: ['service'],
  });

  if (startDate && endDate) {
    parsedStartDate = String(startDate);
    parsedEndDate = String(endDate);
    parsedStartDate = parsedStartDate.split('/').reverse().join('-');
    parsedEndDate = parsedEndDate.split('/').reverse().join('-');
    parsedStartDate = moment(parsedStartDate).format('YYYYMMDD');
    parsedEndDate = moment(parsedEndDate).format('YYYYMMDD');

    services = services.filter(service => {
      parsedDueDate = moment(
        service.due_date.split('/').reverse().join('-'),
      ).format('YYYYMMDD');
      if (
        Number(moment(service.created_at).format('YYYYMMDD')) >=
          Number(parsedStartDate) &&
        Number(moment(parsedDueDate).format('YYYYMMDD')) <=
          Number(parsedEndDate)
      ) {
        return true;
      }
      return false;
    });
  }
  return response.json(services);
});

adminsRouter.post('/', upload.single('avatar'), async (request, response) => {
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

adminsRouter.get('/providers', async (request, response) => {
  let parsedProviders: Provider[];
  const providersRepository = getRepository(Provider);
  try {
    const providers = await providersRepository.find();
    parsedProviders = providers.filter(provider => {
      if (provider.avaliated === 'false' && provider.allow_access === false) {
        return true;
      }
      return false;
    });
    return response.json(parsedProviders);
  } catch (error) {
    throw new AppError('None providers found', 500);
  }
});

adminsRouter.put('/providers/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const updateProvider = new UpdateProviderAprovalStatus();
    const provider = await updateProvider.execute({
      id,
    });
    return response.json(provider);
  } catch (error) {
    console.log(`Failed on update the provider with the error: ${error}`);
    throw new AppError(
      `Failed on update the provider with the error: ${error}`,
      500,
    );
  }
});
adminsRouter.delete('/providers/:id', async (request, response) => {
  const { id } = request.params;
  const providerRepository = getRepository(Provider);

  try {
    await providerRepository.update(
      { id },
      {
        allow_access: false,
        avaliated: 'NEGADO',
      },
    );
  } catch (error) {
    throw new AppError('Failed on Disaprove the requested provider');
  }
  response.sendStatus(200);
});

export default adminsRouter;
