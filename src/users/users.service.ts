import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserData, ResponseUserData } from './types/type';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashingPassword } from 'src/utils/passwordUtils';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(userData: CreateUserData): Promise<ResponseUserData> {
        try {
            const user = this.userRepository.create(userData);
            const hashPassword = await hashingPassword(user.password);
            await this.userRepository.save({ ...user, password: hashPassword });
            const { password, ...result } = user;
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    async getUsers(): Promise<ResponseUserData[]> {
        try {
            const users = await this.userRepository.find();
            const results = users.map(user => { const { password, ...data } = user; return data; })
            return results;
        } catch (err) {
            console.error(err);
        }
    }

    async findOne(username: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { username: username } });
            if (!user) {
                throw new NotFoundException("User not found.");
            }
            return user;
        } catch (err) {
            console.error(err);
        }
    }
}
