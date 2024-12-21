import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    @IsEmail({}, { message: 'Formato de email inválido' })
    email: string;

    @IsNotEmpty()
    password: string;
}