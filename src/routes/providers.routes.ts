/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateProviderService from '../services/CreateProviderService';

interface ProviderWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

const providersRouter = Router();
const upload = multer(uploadConfig);

providersRouter.post(
  '/',
  upload.single('avatar'),
  async (request, response) => {
    let avatar = '';
    const { name, email, password } = request.body;
    console.error(request.body);

    if (request.file) {
      console.log(request.file.filename);
      avatar = request.file.filename;
    }

    const createProvider = new CreateProviderService();

    const provider: ProviderWithoutPassword = await createProvider.execute({
      name,
      email,
      password,
      avatar,
    });

    delete provider.password;

    return response.json(provider);
  },
);
export default providersRouter;
