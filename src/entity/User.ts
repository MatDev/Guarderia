import { IsEmail, IsEnum, IsNotEmpty, IsString, isString, MinLength } from "class-validator";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../utils/enum/user.role";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString ({ message: 'El nombre debe ser una cadena de texto' })
    name: string;
  
    @Column({ unique: true })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    @IsEmail({}, { message: 'Formato de email inválido' })
    email: string;
  
    @Column()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
  
    @Column({
      type: 'enum',
      enum: UserRole,
      
    })
    @IsEnum(UserRole, { message: 'Rol de usuario inválido' })
    role: UserRole;
  
    @Column({ type:'boolean' ,default: true })
    isActive: boolean;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}

