import { DataSource, Repository } from "typeorm";
import { User } from "../../entity/User";
import { UserInterfaceRepository } from "../interface/user.interface.repository";
import { NotFoundError } from "../../exeption/not.found.error";
import { AppDataSource } from "../../configuration/database.config";

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
            const createUser=this.repository.create(user);
            return await this.repository.save(createUser);
        }catch(error){
            console.error(error);
            throw new Error('Error to create user');
        }
    }
    public async findAll(page: number = 1, limit: number =10): Promise<User[]> {
        const skip=(page-1)*limit;
        return this.repository.find({
            skip,
            take:limit,
            order:{
                createdAt:'DESC'
            }
        })
        
    }
    public async findById(id: string): Promise<User | null> {
        return this.repository.findOne({where:{id}});
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