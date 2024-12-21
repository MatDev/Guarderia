import { IsEmail, IsEnum, IsNotEmpty, IsString, isString, MinLength } from "class-validator";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../utils/enum/user.role";
import { Token } from "./Token";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    public id: string;
  
    @Column()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    public name: string;
  
    @Column({ unique: true })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    @IsEmail({}, { message: 'Formato de email inválido' })
    public email: string;
  
    @Column()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    public password: string;
  
    @Column({
      type: 'enum',
      enum: UserRole,
      
    })
    @IsEnum(UserRole, { message: 'Rol de usuario inválido' })
    public role: UserRole;
  
    @Column({ type:'boolean' ,default: true })
    public  isActive: boolean;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public  createdAt: Date;
    
    @OneToMany(() => Token, token => token.usuario)
    public tokens: Token[];
    

}

