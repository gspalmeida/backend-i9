/* eslint-disable camelcase */
import { Router } from 'express';

import AuthenticateProviderService from '../services/AuthenticateProviderService';
import AuthenticateAdminService from '../services/AuthenticateAdminService';

interface ProviderWithoutPassword {
  email: string;
  password?: string;
}
interface AdminWithoutPassword {
  email: string;
  password?: string;
}
interface ResponseData {
  admin?: AdminWithoutPassword;
  provider?: ProviderWithoutPassword;
  token: string;
}

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  let responseData: ResponseData = {
    admin: {} as AdminWithoutPassword,
    provider: {} as ProviderWithoutPassword,
    token: '',
  };
  const { email, password } = request.body;
  const authenticateProvider = new AuthenticateProviderService();
  const authenticateAdmin = new AuthenticateAdminService();

  const { admin, token: adminToken } = await authenticateAdmin.execute({
    email,
    password,
  });
  if (admin.email) {
    const parsedAdmin: AdminWithoutPassword = admin;
    delete parsedAdmin.password;
    responseData = { admin: parsedAdmin, token: adminToken };
  }
  if (!admin.email) {
    const {
      provider,
      token: providerToken,
    } = await authenticateProvider.execute({
      email,
      password,
    });
    const parsedProvider: ProviderWithoutPassword = provider;
    delete parsedProvider.password;
    responseData = { provider: parsedProvider, token: providerToken };
  }
  return response.json(responseData);
});

export default authRouter;
