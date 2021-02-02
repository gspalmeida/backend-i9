/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import ServiceType from '../models/ServiceType';
import AppError from '../errors/AppError';

interface Request {
  serviceName: string;
}
class CreateServiceTypeService {
  public async execute({ serviceName }: Request): Promise<ServiceType> {
    const serviceRepository = getRepository(ServiceType);
    const serviceTypeRepository = getRepository(ServiceType);

    console.log(serviceName);

    const checkServiceTypeExists = await serviceTypeRepository.findOne({
      where: { service_name: serviceName },
    });

    if (checkServiceTypeExists) {
      throw new AppError('Service type already booked');
    }

    const serviceType = serviceTypeRepository.create({
      service_name: serviceName,
    });

    await serviceRepository.save(serviceType);

    return serviceType;
  }
}
export default CreateServiceTypeService;
