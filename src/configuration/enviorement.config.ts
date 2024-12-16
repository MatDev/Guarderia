const dotenv = require('dotenv');
dotenv.config();

export const ENV ={
    PORT: process.env.PORT || 3000,
  DATABASE: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT || '5432'),
    USERNAME: process.env.DB_USER || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || 'HOLA',
    NAME: process.env.DB_NAME || 'myapp'
  }
}