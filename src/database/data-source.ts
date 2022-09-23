import { Requests } from './entity/Requests';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Birdhouse } from './entity/Birdhouse';
import { Events } from './entity/Events';
dotenv.config();

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: process.env.DATABASE_LOGGING as unknown as boolean,
  entities: [Birdhouse, Requests, Events],
});
