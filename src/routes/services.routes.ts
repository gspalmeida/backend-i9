/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import moment from 'moment';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProvidedService from '../models/ProvidedService';

import CreateProvidedServiceService from '../services/CreateProvidedServiceService';
import UpdateProvidedServiceService from '../services/UpdateProvidedServiceService';

const servicesRouter = Router();

servicesRouter.get('/', ensureAuthenticated, async (request, response) => {
  let services = [];
  let parsedStartDate = '';
  let parsedEndDate = '';
  let parsedDueDate = '';
  const serviceRepository = getRepository(ProvidedService);

  const { startDate, endDate } = request.query;

  services = await serviceRepository.find({
    where: { provider_id: request.user.id },
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

servicesRouter.post('/', ensureAuthenticated, async (request, response) => {
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
export default servicesRouter;

servicesRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { name, description, value, type, dueDate } = request.body;
  const { id } = request.params;

  const EditService = new UpdateProvidedServiceService();

  const service = await EditService.execute({
    id,
    name,
    description,
    value,
    type,
    dueDate,
  });

  return response.json(service);
});

servicesRouter.delete(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;
    const serviceRepository = getRepository(ProvidedService);

    await serviceRepository.delete(id);
    return response.sendStatus(200);
  },
);
