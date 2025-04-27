import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(email: string, password: string) {
        const existingUser = await this.repo.findOne({ where: { email } });
        if (existingUser) {
          throw new BadRequestException('Email already in use');
        }
      
        const user = this.repo.create({ email, password });
        
        await this.repo.save(user);   

        return { message: 'User successfully created', user };
    }
}
