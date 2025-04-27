import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string, role?: string) {
        const user = this.repo.create({ email, password, role });
        
        return this.repo.save(user);
    }

    async findAll() {
        return this.repo.find();
    }

    async findById(id: string) {
        if (!id) return null;
        
        const user = await this.repo.findOne({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.repo.findOne({
            where: { email }
        });

        return user;
    }

    async update(id: string, attrs: UpdateUserDto) {
        const user = await this.repo.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        Object.assign(user, attrs);

        return this.repo.save(user);
    }

    async remove(id: string) {
        const user = await this.repo.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.repo.remove(user);
    }
}
