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

  @ManyToOne(() => ServiceType)
  @JoinColumn({ name: 'service_type' })
  service: ServiceType;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({ type: 'money' })
  velue: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProvidedService;
