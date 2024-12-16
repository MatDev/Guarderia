import { DataSource } from 'typeorm';
import {ENV} from './enviorement.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DATABASE.HOST,
  port: ENV.DATABASE.PORT,
  username: ENV.DATABASE.USERNAME,
  password: ENV.DATABASE.PASSWORD,
  database: ENV.DATABASE.NAME,
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migrations/**/*.ts']
});