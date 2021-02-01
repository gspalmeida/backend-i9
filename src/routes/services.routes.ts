/* eslint-disable camelcase */
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateProvidedServiceService from '../services/CreateProvidedServiceService';

const providersRouter = Router();

providersRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { name, description, value, type, dueDate } = request.body;
  console.log(request.user.id);

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
