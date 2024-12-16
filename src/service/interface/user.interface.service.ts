
import { UserDto } from "../../dto/user.dto";

export interface UserServiceInterface {
    createUser(userDto: UserDto): Promise<UserDto>;
    findAll(page: number, limit: number): Promise<UserDto[]>;
    findById(id: string): Promise<UserDto | null>;
    delete(id: string): Promise<void>;
    update(id: string, userDto: UserDto): Promise<UserDto>;
}