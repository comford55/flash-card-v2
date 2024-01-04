import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { ChangePasswordDTO } from './dto/changePassword.dto';

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

    // might use wrong http status
    @UseGuards(JwtAuthGuard)
    @Post('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateUser(@Request() req, @Body() updateUserDTO: UpdateUserDTO) {
        return await this.userService.updateUser(req, updateUserDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Request() req) {
        return await this.userService.deleteUser(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    @UsePipes(new ValidationPipe({ transform: true }))
    async changePassword(@Request() req, @Body() changePasswordDTO: ChangePasswordDTO) {
        return await this.userService.changePassword(req.user, changePasswordDTO.oldPassword, changePasswordDTO.newPassword, changePasswordDTO.confirmPassword)
    }
}
