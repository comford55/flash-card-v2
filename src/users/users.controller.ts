import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/strategies/guards/local.guard';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createUser(@Body() userDTO: CreateUserDTO) {
        return await this.userService.createUser(userDTO);
    }

    // @UseGuards(LocalAuthGuard)
    @Get()
    async getUsers(@Req() req: Request) {
        return await this.userService.getUsers();
    }
}
