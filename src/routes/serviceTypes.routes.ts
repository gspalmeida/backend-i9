/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ServiceType from '../models/ServiceType';

const serviceTypesRouter = Router();

serviceTypesRouter.get('/', ensureAuthenticated, async (request, response) => {
  const serviceTypeRepository = getRepository(ServiceType);

  const serviceTypes = await serviceTypeRepository.find();
  return response.json(serviceTypes);
});

export default serviceTypesRouter;
