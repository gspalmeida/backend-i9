/* eslint-disable camelcase */
import { Router } from 'express';

import AuthenticateProviderService from '../services/AuthenticateProviderService';

interface ProviderWithoutPassword {
  email: string;
  password?: string;
}

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateProvider = new AuthenticateProviderService();

  const { provider, token } = await authenticateProvider.execute({
    email,
    password,
  });

  const parsedProvider: ProviderWithoutPassword = provider;

  delete parsedProvider.password;

  return response.json({ parsedProvider, token });
});

export default authRouter;
