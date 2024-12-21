import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { AuthenticationMiddleware } from '../security/middleware/authentication.middleware';
import { authorizeRoles } from '../security/middleware/role.middleware';
import { UserRole } from '../utils/enum/user.role';

// Instanciamos las dependencias necesarias

const userController = new UserController();
// Configuramos las rutas
const router = Router();

router.post('/', AuthenticationMiddleware, authorizeRoles([UserRole.PARVULARIA]), (req, res) => userController.createUser(req, res));
router.get('/', (req, res) => userController.getAllUsers(req, res));
router.get('/:id',AuthenticationMiddleware, authorizeRoles([UserRole.PARVULARIA]), (req, res) => userController.getUserById(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;

