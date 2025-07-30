import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service'
import { send } from 'process';
import { CreateUserDto } from './dto/usersDto'
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';


@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) { }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('commander')
    @Get()
    async getAllUsers() {
        return await this.UsersService.findAllUsers();
    }

    @Post()

    async createNewUser(@Body() CreateUserDto: CreateUserDto) {
        return await this.UsersService.createUser(CreateUserDto);
    }


    @Get('/:id')
    async getUserById(@Param() params) {
        return await this.UsersService.findUserById(params.id);

    }

    @Delete('/:id')
    async deleteUserById(@Param() params) {
        return await this.UsersService.deleteUser(params.id)
    }
}
