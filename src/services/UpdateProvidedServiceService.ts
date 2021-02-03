/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import ProvidedService from '../models/ProvidedService';
import ServiceType from '../models/ServiceType';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  description: string;
  value: string;
  type: string;
  dueDate: string;
}
class UpdateProvidedServiceService {
  public async execute({
    id,
    name,
    description,
    value,
    type,
    dueDate,
  }: Request): Promise<ProvidedService> {
    const serviceRepository = getRepository(ProvidedService);
    const serviceTypeRepository = getRepository(ServiceType);

    const checkServiceTypeExists = await serviceTypeRepository.findOne({
      where: { service_name: type },
    });

    if (!checkServiceTypeExists) {
      throw new AppError('Unexpected Service Type');
    }

    await serviceRepository.update(
      { id },
      {
        name,
        description,
        service_type: checkServiceTypeExists.id,
        due_date: dueDate,
        value,
      },
    );

    const service = await serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new AppError('ProvidedService id not found', 401);
    }
    return service;
  }
}
export default UpdateProvidedServiceService;
