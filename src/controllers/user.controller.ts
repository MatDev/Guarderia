import e, { Request, Response } from 'express';
import { UserService } from '../service/implement/user.service';
import { UserDto } from '../dto/user.dto';



export class UserController {
  // esta propiedad es privada y solo se puede acceder a ella desde la clase
  private userService: UserService;

  /*
  El constructor de la clase UserController recibe un parámetro opcional de tipo UserService.
  para poder ser llamado sin necesidad de pasarle un parámetro, se le asigna un valor por defecto.
  */
  
  constructor(userService?: UserService) {
    /*
    Asignacion de cortocircuito: si no se proporciona un parámetro userService, se crea una nueva instancia de UserService.
    Se usa este enfoque para que la clase UserController pueda funcionar sin necesidad de pasarle un parámetro.
    ademas de que facilita las pruebas unitarias.
    */
    this.userService = userService || new UserService();
  }




   async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userDto = new UserDto();
      userDto.name = req.body.name;
      userDto.email = req.body.email;
      userDto.password = req.body.password;
      userDto.role = req.body.role;

      const createdUser = await this.userService.createUser(userDto);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Error creating user',
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

   async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const users = await this.userService.findAll(page, limit);
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ 
        message: 'Error fetching users', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  async  getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await this.userService.findById(userId);
      
      if (!user) {
         res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ 
        message: 'Error fetching user', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

 async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const userDto = new UserDto();
      userDto.name = req.body.name;
      userDto.email = req.body.email;
      userDto.password = req.body.password;
      userDto.role = req.body.role;

      const updatedUser = await this.userService.update(userId, userDto);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(400).json({ 
        message: 'Error updating user', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      await this.userService.delete(userId);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ 
        message: 'Error deleting user', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }
}



