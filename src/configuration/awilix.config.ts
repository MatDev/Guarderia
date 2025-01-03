import { asClass, asValue, createContainer, Lifetime } from 'awilix';
import { UserRepository } from '../repository/impements/user.implements.repository';
import { TokenRepository } from '../repository/impements/token.implements.repository';
import { UserService } from '../service/implement/user.service';
import { AuthService } from '../service/implement/auth.service';
import { UserController } from '../controllers/user.controller';
import { AuthController } from '../controllers/auth.controller';
import { JwtService } from '../security/service/jwt.service';
import { ENV } from './enviorement.config';
import { AppDataSource } from './database.config';


const container = createContainer();

container.register({
  userService: asClass(UserService).scoped(), // Refactor listo
  authService: asClass(AuthService).scoped(), // Refacto listo
  
});

// Controllers
container.register({
  userController: asClass(UserController).scoped(), 
  authController: asClass(AuthController).scoped()
});
// Repositories
container.register({
  AppDataSource: asValue(AppDataSource), 
  userRepository: asClass(UserRepository).scoped(), // Refactor listo
  tokenRepository: asClass(TokenRepository).scoped() // Refactor listo
});

// JWT
container.register({
  jwtSecret: asValue(ENV.JWT.SECRET),
  jwtExpireAcces: asValue(ENV.JWT.EXPIRE.JWT),
  jwtExpireRefresh: asValue(ENV.JWT.EXPIRE.REFRESH),
  jwtService: asClass(JwtService).singleton() // Refactor listo
});


export default container;
