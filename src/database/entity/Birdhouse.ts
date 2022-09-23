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
  lattitude: number;

  @Column('int')
  longitude: number;

  @Column('string')
  name: string;
}
