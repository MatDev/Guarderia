import { DataSource } from 'typeorm';
import {ENV} from './enviorement.config';
import { User } from '../entity/User';
import { Token } from '../entity/Token';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DATABASE.HOST,
  port: ENV.DATABASE.PORT,
  username: ENV.DATABASE.USERNAME,
  password: ENV.DATABASE.PASSWORD,
  database: ENV.DATABASE.NAME,
  synchronize: true,
  logging: false,
  /* estoy en modod debug por lo que se cambia la configuracion a js  */
  entities: [User,Token],
  migrations: ['src/migrations/**/*.ts']
});