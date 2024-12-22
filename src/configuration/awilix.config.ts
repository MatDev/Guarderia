import { asClass, createContainer, Lifetime } from 'awilix';
import { UserRepository } from '../repository/impements/user.implements.repository';
import { TokenRepository } from '../repository/impements/token.implements.repository';
import { UserService } from '../service/implement/user.service';
import { AuthService } from '../service/implement/auth.service';
import { UserController } from '../controllers/user.controller';
import { AuthController } from '../controllers/auth.controller';

const container = createContainer();

container.register({
  userRepository: asClass(UserRepository).scoped(),
  tokenRepository: asClass(TokenRepository).scoped(),
  userService: asClass(UserService).scoped(),
  authService: asClass(AuthService).scoped(),
  userController: asClass(UserController).scoped(),
  authController: asClass(AuthController).scoped(),
});

export default container;
