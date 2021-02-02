/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import moment from 'moment';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProvidedService from '../models/ProvidedService';

import CreateProvidedServiceService from '../services/CreateProvidedServiceService';

const providersRouter = Router();

providersRouter.get('/', ensureAuthenticated, async (request, response) => {
  let services = [];
  const serviceRepository = getRepository(ProvidedService);

  const { startDate, endDate } = request.query;

  let parsedStartDate = String(startDate);
  let parsedEndDate = String(endDate);
  let parsedDueDate = '';

  services = await serviceRepository.find({
    where: { provider_id: request.user.id },
    relations: ['service'],
  });

  if (parsedStartDate && parsedEndDate) {
    parsedStartDate = parsedStartDate.split('/').reverse().join('-');
    parsedEndDate = parsedEndDate.split('/').reverse().join('-');
    parsedStartDate = moment(parsedStartDate).format('YYYYMMDD');
    parsedEndDate = moment(parsedEndDate).format('YYYYMMDD');

    services = services.filter(service => {
      parsedDueDate = moment(service.due_date).format('YYYYMMDD');
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
