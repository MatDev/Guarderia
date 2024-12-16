import { IsNotEmpty, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
  import { UserRole } from '../utils/enum/user.role';
  
  export class UserDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string;
  
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    @IsEmail({}, { message: 'Formato de email inválido' })
    email: string;
  
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
  
    @IsEnum(UserRole, { message: 'Rol de usuario inválido' })
    @IsOptional()
    role?: UserRole;
  }


  
