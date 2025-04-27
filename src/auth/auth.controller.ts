import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private usersService: AuthService) {}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        return await this.usersService.create(body.email, body.password);
    }
}
