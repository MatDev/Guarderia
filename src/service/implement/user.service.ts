import { plainToClass, classToPlain, instanceToPlain } from "class-transformer";
import { UserDto } from "../../dto/user.dto";
import { User } from "../../entity/User";
import { UserRepository } from "../../repository/impements/user.implements.repository";
import { validate } from "class-validator";
import { UserServiceInterface } from "../interface/user.interface.service";



export class UserService implements UserServiceInterface{

    constructor(private userRepository: UserRepository){
    }
    async createUser(userDto: UserDto): Promise<UserDto> {
        console.log("creando usuario:",userDto.email);
        //validamos el dto con class-validator
        const validationsErrors=await validate(userDto);
        if(validationsErrors.length>0){
            console.error('Validation Error:',validationsErrors);
            throw new Error('Validation Error');
        }
        const user=this.dtoToEntity(userDto, new User());
        const userSave=await this.userRepository.create(user);
        console.info('Usuario creado:',userSave.id);
    
        return this.entityToDto( userSave, UserDto);
        
    }

    async findAll(page:number,limit:number):Promise<UserDto[]>{
        console.log("buscando todos los usuarios");
        const users=await this.userRepository.findAll(page,limit);
        console.log("usuarios encontrados:",users.length);
        // convierten los usuarios a dto
        const usersDto=users.map(user=>this.entityToDto(user,UserDto));
        return usersDto;
    }
    async findById(id:string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
    async delete(id:string){

        console.log("eliminando usuario con id:",id);
        const deleteuser = await this.userRepository.delete(id);
        console.log("usuario eliminado:",deleteuser);
        return deleteuser;
    }
   // ES UNA TRANSACCION
    async update(id:string, userDto:UserDto){
         
            console.log("actualizando usuario con id:",id);
            const user=await this.userRepository.findById(id);
            const userUpdate=this.dtoToEntity(userDto,user);
            const usersave=await this.userRepository.update(id,userUpdate);
            console.log("usuario actualizado:",usersave.id);
            return usersave;
       
    }


    // funcion de dto a entity con plainToClass
    public dtoToEntity<T>(dto: T, entity: any): any {
       return plainToClass(entity.constructor, dto);
    }
    // funcion de entity a dto con classToPlain
    public entityToDto<T>(entity: any, dtoClass: new()=> T): T {
        return plainToClass(dtoClass, instanceToPlain(entity)); 
    }
    
}