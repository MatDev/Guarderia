import{ Repository } from "typeorm";
import { User } from "../../entity/User";
import { UserInterfaceRepository } from "../interface/user.interface.repository";
import { NotFoundError } from "../../exeption/not.found.error";
import { AppDataSource } from "../../configuration/database.config";
import { ValidationError } from "../../exeption/validation.error";


export class UserRepository implements UserInterfaceRepository{
    private repository:Repository<User>;

    constructor (datasouce?: typeof AppDataSource){
         // Si no se proporciona una fuente de datos, utiliza AppDataSource por defecto
       const dataSource=datasouce || AppDataSource;
         // Obtiene el repositorio de la entidad User a partir de la fuente de datos
       this.repository=dataSource.getRepository(User);
    }
    public async create(user: Partial<User>): Promise<User> {
        try{
            const userExist=await this.repository.findOne({where:{email:user.email}});

            if(userExist){
                console.error('User already exists');
                throw new ValidationError('User already exists');
            }
            const createUser=this.repository.create(user);
            const userSave =await this.repository.save(createUser);
            console.log('User created successfully'+ userSave);
            return userSave;
        }catch(error){
            console.error('Error en el repositorio:',error);
            throw error;
        }
    }
    public async findAll(page: number = 1, limit: number =10): Promise<User[]> {
        const skip=(page-1)*limit;
        console.info('Buscando usuarios en la base de datos');

        const users= await this.repository.find({
            skip,
            take:limit,
            order:{
                createdAt:'DESC'
            }
        });
        console.info('Se encontraron' + users.length + 'usuarios');

        return users
        
    }
    public async findById(id: string): Promise<User | null> {
        console.info('Buscando usuario con id:', id);
        const user=await this.repository.findOne({where:{id}});
        return user;
    }
    public async delete(id: string): Promise<void> {
        const user=await this.repository.findOne({where:{id}});
        if(!user){
            console.error('User not found');
            throw new NotFoundError('User', id);
        }
        await this.repository.remove(user);

    }
   public async update(id: string, userData: Partial<User>): Promise<User> {
        const user=await this.repository.findOne({where:{id}});
        if(!user){
            console.error('User not found');
            throw new NotFoundError('User', id);
        }
        Object.assign(user, userData);
        return this.repository.save(user);
    }
    public async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({where:{email}});
    }
    
}