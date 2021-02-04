/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Provider from '../models/Provider';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}
interface Response {
  provider: Provider;
  token: string;
}

class AuthenticateProviderService {
  public async execute({ email, password }: Request): Promise<Response> {
    const providerRepository = getRepository(Provider);

    const provider = await providerRepository.findOne({
      where: { email },
    });
    if (!provider) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, provider.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (provider.allow_access !== true) {
      throw new AppError('The Admin didnt Approved your account yet', 403);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: provider.id,
      expiresIn,
    });

    return {
      provider,
      token,
    };
  }
}

export default AuthenticateProviderService;
