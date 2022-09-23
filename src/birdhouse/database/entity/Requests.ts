import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Requests {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column()
  params: string;

  @Column()
  body: string;

  @Column()
  query: string;

  @Column('float', { default: Date.now() })
  date: number;
}
