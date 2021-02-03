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

adminsRouter.post(
  '/hashedTempUrl',
  upload.single('avatar'),
  async (request, response) => {
    let avatar = '';
    const { name, email, password } = request.body;
    if (request.file) {
      avatar = request.file.filename;
    }

    const createAdmin = new CreateAdminService();

    const admin: AdminWithoutPassword = await createAdmin.execute({
      name,
      email,
      password,
      avatar,
    });

    delete admin.password;

    return response.json(admin);
  },
);
export default adminsRouter;
