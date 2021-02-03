/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import ServiceType from '../models/ServiceType';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
}
class UpdateServiceTypeService {
  public async execute({ id, name }: Request): Promise<ServiceType> {
    const serviceTypeRepository = getRepository(ServiceType);

    const checkServiceTypeExists = await serviceTypeRepository.findOne({
      where: { service_name: name },
    });

    if (checkServiceTypeExists) {
      throw new AppError('Service Type Already Booked');
    }

    await serviceTypeRepository.update(
      { id },
      {
        service_name: name,
      },
    );

    const serviceType = await serviceTypeRepository.findOne({ where: { id } });

    if (!serviceType) {
      throw new AppError('ServiceType id not found', 500);
    }
    return serviceType;
  }
}
export default UpdateServiceTypeService;
