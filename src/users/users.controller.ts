import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createUser(@Body() userDTO: CreateUserDTO) {
        return await this.userService.createUser(userDTO);
    }
}
