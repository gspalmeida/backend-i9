/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateAdminService from '../services/CreateAdminService';

interface AdminWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

const adminsRouter = Router();
const upload = multer(uploadConfig);

adminsRouter.post('/', upload.single('avatar'), async (request, response) => {
  let avatar = '';
  const { name, email, password } = request.body;
  if (request.file) {
    console.log(request.file.filename);
    avatar = request.file.filename;
  }

  const createAdmin = new CreateAdminService();

  const provider: AdminWithoutPassword = await createAdmin.execute({
    name,
    email,
    password,
    avatar,
  });

  delete provider.password;

  return response.json(provider);
});
export default adminsRouter;
