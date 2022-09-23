import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('uuid')
  birdhouse: string;

  @Column('int')
  egg_difference: number;

  @Column('int')
  birds_difference: number;

  @Column('int')
  longitude_difference: number;

  @Column('int')
  latitude_difference: number;

  @Column('float', { default: Date.now() })
  date: number;
}
