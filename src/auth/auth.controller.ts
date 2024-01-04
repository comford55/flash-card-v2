import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async login(@Body() loginDTO: LoginDTO) {
        return await this.authService.login(loginDTO.username, loginDTO.password);
    }
}
