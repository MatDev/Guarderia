import { Router } from 'express';
import { AppDataSource } from '../configuration/database.config';
import { UserRepository } from '../repository/impements/user.implements.repository';
import { UserService } from '../service/implement/user.service';
import { UserController } from '../controllers/user.controller';

// Instanciamos las dependencias necesarias
const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Configuramos las rutas
const router = Router();

router.post('/', (req, res) => userController.createUser(req, res));
router.get('/', (req, res) => userController.getAllUsers(req, res));
router.get('/:id', (req, res) => userController.getUserById(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;

