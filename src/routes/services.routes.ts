/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProvidedService from '../models/ProvidedService';

import CreateProvidedServiceService from '../services/CreateProvidedServiceService';

const providersRouter = Router();

providersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const serviceRepository = getRepository(ProvidedService);

  const services = await serviceRepository.find({
    where: { provider_id: request.user.id },
    relations: ['service'],
  });

  return response.json(services);
});
providersRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { name, description, value, type, dueDate } = request.body;

  const createService = new CreateProvidedServiceService();

  const service = await createService.execute({
    name,
    description,
    value,
    type,
    dueDate,
    providerId: request.user.id,
  });

  return response.json(service);
});
export default providersRouter;
