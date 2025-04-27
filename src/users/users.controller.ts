import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from './user.entity';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Get()
    @UseGuards(AdminGuard)
    findAll(@CurrentUser() user: User) {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(AdminGuard)
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    @UseGuards(AdminGuard)
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.remove(id);
    }
}