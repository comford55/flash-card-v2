import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/passwordUtils';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && (await comparePassword(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async localLogin(user: User) {
        const payload = {
            username: user.username,
            sub: {
                id: user.id,
                email: user.email
            }
        }
        return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '7d' }) // TODO: try to add notbefore to prevent ddos of refreshToken
        };
    }

    async refreshToken(user: User) {
        const payload = {
            username: user.username,
            sub: {
                id: user.id,
                email: user.email
            }
        }
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }
}
