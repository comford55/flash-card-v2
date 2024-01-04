import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(@Body() userDTO: CreateUserDTO) {
        return await this.userService.createUser(userDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        return await this.userService.findByUsername(username);
    }

}
