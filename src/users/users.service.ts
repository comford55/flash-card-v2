import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserData, ResponseUserData, UpdateUserData } from './types/type';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, hashingPassword } from 'src/utils/passwordUtils';

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
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return user;
    }

    // return user data without password field
    async findByUsername(username: string): Promise<ResponseUserData> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        const { password, ...result } = user;
        return result;
    }

    async updateUser(user: User, updateData: UpdateUserData) {
        try {
            await this.userRepository.update({ username: user.username }, { ...updateData, updatedAt: new Date() });
            return { statusCode: HttpStatus.OK, message: "User updated successfully." };
        } catch (err) {
            console.error(err);
        }
    }

    async deleteUser(user: User) {
        try {
            await this.userRepository.delete({ username: user.username });
            return { statusCode: HttpStatus.OK, message: "User deleted successfully." };
        } catch (err) {
            console.error(err);
        }
    }

    async changePassword(user: User, oldPassword: string, newPassword: string, confirmPassword: string) {
        const userExist = await this.userRepository.findOne({ where: { username: user.username } });
        if (!(await comparePassword(oldPassword, userExist.password))) {
            throw new ForbiddenException("Incorrect password.");
        }
        if (newPassword !== confirmPassword) {
            throw new ForbiddenException("Password missmatch.");
        }
        try {
            await this.userRepository.update({ username: user.username }, { password: await hashingPassword(newPassword) });
            return { statusCode: HttpStatus.OK, message: "Password changed." };
        } catch (err) {
            console.error(err);
        }
    }
}
