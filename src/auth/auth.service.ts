import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

    async login(username: string, password: string) {
        try {
            const user = await this.usersService.findOne(username);
            console.log(user, !(await comparePassword(password, user.password)))
            if (!user || !(await comparePassword(password, user.password))) {
                throw new UnauthorizedException("Username or Password is invalid.");
            }
            const payload = {
                username: user.username,
                sub: {
                    id: user.id,
                    email: user.email
                }
            }
            return { accessToken: this.jwtService.signAsync(payload) }
        } catch (err) {
            console.error(err);
            // return err.response;
        }

    }
}
