/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import ProvidedService from '../models/ProvidedService';
import ServiceType from '../models/ServiceType';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  description: string;
  value: string;
  type: string;
  dueDate: string;
  providerId: string;
}
class CreateProviderService {
  public async execute({
    name,
    description,
    value,
    type,
    dueDate,
    providerId,
  }: Request): Promise<ProvidedService> {
    const serviceRepository = getRepository(ProvidedService);
    const serviceTypeRepository = getRepository(ServiceType);

    console.log(type);

    const checkServiceTypeExists = await serviceTypeRepository.findOne({
      where: { service_name: type },
    });

    console.log(checkServiceTypeExists?.id);
    console.log(checkServiceTypeExists?.id);
    console.log(checkServiceTypeExists?.id);
    console.log(checkServiceTypeExists?.id);

    if (!checkServiceTypeExists) {
      throw new AppError('Unexpected Service Type');
    }

    const service = serviceRepository.create({
      name,
      description,
      service_type: checkServiceTypeExists.id,
      due_date: dueDate,
      provider_id: providerId,
      value,
    });
    console.log('depois do serv');

    await serviceRepository.save(service);

    return service;
  }
}
export default CreateProviderService;
