
import { json, urlencoded } from 'body-parser';
//import userRoutes from './routes/user.routes'; // Rutas de usuarios
import { AppDataSource } from './configuration/database.config';
import { Request, Response, NextFunction } from 'express'; // Conexión a la base de datos
import { errorHandler } from './security/middleware/error.middleware'; // Manejo de errores
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { ApiConstant } from './utils/constants/api.constant';
import logger from './configuration/winston.config';
import corsOptions from './configuration/cors.options.config';
import helmetOptions from './configuration/helmet.options.config';

dotenv.config();

const app = express(); // Instancia de la aplicación

app.use(cors(corsOptions)); // Habilita CORS
app.use(helmet()); // Añade seguridad básica
app.use(morgan('combined',{
  stream:{
    write:(message)=>logger.info(message.trim())
  }
})); // Logger HTTP
app.use(json()); // Soporte para JSON
app.use(urlencoded({ extended: true }));  // Manejo de formularios codificados


// Rutas
app.use(ApiConstant.API_USER, userRoutes); // Prefijo para rutas de usuarios
app.use(ApiConstant.API_AUTH, authRoutes); // Prefijo para rutas de autenticación
// Ruta base para verificar el estado del servidor
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running!' });
});

// Middleware de manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// Captura rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
});

// Exporta la aplicación configurada
export default app;
