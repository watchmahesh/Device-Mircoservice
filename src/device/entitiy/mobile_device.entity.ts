import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MobileDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  device_id: string;

  @Column()
  name: string;

  @Column()
  os_version: string;

  @Column()
  customer_name: string;
}