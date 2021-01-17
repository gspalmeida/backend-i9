/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Admin from '../models/Admin';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateAdminService {
  public async execute({ name, email, password }: Request): Promise<Admin> {
    const adminRepository = getRepository(Admin);

    const checkAdminExists = await adminRepository.findOne({
      where: { email },
    });

    if (checkAdminExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);
    /*
      TODO Adicionar o upload de avatar à tela SignUp no front para então
      adicionar esse campo ao service de criação de admin (já está criado no
      model e no database, falta criar no front e adicionar ao service)
    */
    const admin = adminRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await adminRepository.save(admin);

    return admin;
  }
}
export default CreateAdminService;
