import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Birdhouse {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('uuid')
  ubid: string;

  @Column('int')
  birds: number;

  @Column('int')
  eggs: number;

  @Column('int')
  latitude: number;

  @Column('int')
  longitude: number;

  @Column()
  name: string;

  @Column('float', { default: Date.now() })
  last_update: number;
}
