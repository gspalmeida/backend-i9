/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Provider from '../models/Provider';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
class CreateProviderService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: Request): Promise<Provider> {
    const providerRepository = getRepository(Provider);

    const checkProviderExists = await providerRepository.findOne({
      where: { email },
    });

    if (checkProviderExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);
    /*
      TODO Adicionar o upload de avatar à tela SignUp no front para então
      adicionar esse campo ao service de criação de provider (já está criado no
      model e no database, falta criar no front e adicionar ao service)
    */
    const provider = providerRepository.create({
      name,
      email,
      password: hashedPassword,
      aprovalStatus: false,
      avatar,
    });

    await providerRepository.save(provider);

    return provider;
  }
}
export default CreateProviderService;
