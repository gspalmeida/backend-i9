/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import Provider from '../models/Provider';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}
class UpdateProviderAprovalStatus {
  public async execute({ id }: Request): Promise<Provider> {
    const providerRepository = getRepository(Provider);

    const provider = await providerRepository.findOne({
      where: { id },
    });

    if (!provider) {
      throw new AppError('Provider Id not Found');
    }

    await providerRepository.update(
      { id },
      {
        allow_access: true,
        avaliated: 'APROVADO',
      },
    );

    return provider;
  }
}
export default UpdateProviderAprovalStatus;
