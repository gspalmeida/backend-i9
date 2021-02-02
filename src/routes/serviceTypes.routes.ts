/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ServiceType from '../models/ServiceType';

import CreateServiceTypeService from '../services/CreateServiceType';

const serviceTypesRouter = Router();

serviceTypesRouter.get('/', ensureAuthenticated, async (request, response) => {
  const serviceTypeRepository = getRepository(ServiceType);

  const serviceTypes = await serviceTypeRepository.find();
  return response.json(serviceTypes);
});

serviceTypesRouter.post('/', async (request, response) => {
  const { serviceName } = request.body;

  const createService = new CreateServiceTypeService();

  const serviceType = await createService.execute({
    serviceName,
  });

  return response.json(serviceType);
});
export default serviceTypesRouter;
