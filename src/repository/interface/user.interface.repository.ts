import { User } from "../../entity/User";

export  interface UserInterfaceRepository {
    create(user: Partial<User>): Promise<User>;
    findAll(page:number,limit:number): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    delete(id:string):Promise<void>;
    update(id:string, user: Partial<User>):Promise<User>;
    findByEmail(email:string):Promise<User | null>;
    
}