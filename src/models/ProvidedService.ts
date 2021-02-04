/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Provider from './Provider';
import ServiceType from './ServiceType';

@Entity('provided_services')
class ProvidedService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  service_type: string;

  @Column()
  name: string;

  @ManyToOne(() => ServiceType)
  @JoinColumn({ name: 'service_type' })
  service: ServiceType;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column()
  value: string;

  @Column()
  description: string;

  @Column()
  due_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProvidedService;
