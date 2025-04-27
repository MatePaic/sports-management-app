import { IsEmail, IsIn, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
    
    @IsOptional()
    @IsString()
    @IsIn(['user', 'admin']) // manual validation for allowed values
    role?: string; // 'user' or 'admin'
}