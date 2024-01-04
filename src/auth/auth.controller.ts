import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { RefreshJwtAuthGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    // @UsePipes(new ValidationPipe({ transform: true }))
    async localLogin(@Request() req) {
        return await this.authService.localLogin(req.user);
    }

    // implement refresh token
    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return await this.authService.refreshToken(req.user);
    }
}
