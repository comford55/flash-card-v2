import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    // @UsePipes(new ValidationPipe({ transform: true }))
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    // implement refresh token
    @Post('refresh')
    async refreshToken(token: string) {
        return await this.authService.refreshToken(token);
    }
}
