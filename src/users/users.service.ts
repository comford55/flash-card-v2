import { Injectable } from '@nestjs/common';
import { CreateUserData, ResponseUserData } from './types/type';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(userData: CreateUserData): Promise<ResponseUserData> {
        try {
            const user = this.userRepository.create(userData);
            await this.userRepository.save(user);
            const { password, ...result } = user;
            return result;
        } catch (err) {
            console.error(err);
        }
    }
}
