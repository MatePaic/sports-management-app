import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password, body.role = body?.role || 'user');
        session.userId = user.id;
        session.role = user.role;

        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        session.role = user.role;

        return user;
    }

    @Post('/signout')
    @UseGuards(AuthGuard)
    signout(@Session() session: any) {
        session.userId = null;
        session.role = null;
    }
}
