/* eslint-disable camelcase */
import { Router } from 'express';

import AuthenticateAdminService from '../services/AuthenticateAdminService';

interface AdminWithoutPassword {
  email: string;
  password?: string;
}

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateAdmin = new AuthenticateAdminService();

  const { admin, token } = await authenticateAdmin.execute({
    email,
    password,
  });

  const parsedAdmin: AdminWithoutPassword = admin;

  delete parsedAdmin.password;

  return response.json({ parsedAdmin, token });
});

export default authRouter;
