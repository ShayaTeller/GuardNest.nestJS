import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/usersDto'
import { hashPassword } from './utils/hashingCode';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>

    ) { }

    async createUser(CreateUserDto: CreateUserDto): Promise<User> {
        const hashPass = await hashPassword(CreateUserDto.password)
        const user = await this.usersRepo.create({
            ...CreateUserDto,
            passwordHash: hashPass
        })

        return await this.usersRepo.save(user);
    }


    async findAllUsers() {
        const result = await this.usersRepo.find();
        return result
    }
    async findUserById(id) {
        const result = await this.usersRepo.findOneBy({ id: id });
        return result
    }

    async deleteUser(id) {
        const result = await this.usersRepo.delete({ id: id })
        return result
    }
}
