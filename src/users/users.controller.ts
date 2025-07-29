import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service'
import { send } from 'process';
import {CreateUserDto}from './dto/usersDto'
@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) { }

    @Get()
    async getAllUsers() {
        return await this.UsersService.findAllUsers();
    }

    @Post()

    async createNewUser(@Body() CreateUserDto:CreateUserDto) {
        return await this.UsersService.createUser(CreateUserDto);
    }


    @Get('/:id')
    async getUserById(@Param() params) {
        return await this.UsersService.findUserById(params.id);

    }

    @Delete('/:id')
    async deleteUserById(@Param()params){
        return await this.UsersService.deleteUser(params.id)
    }
}
