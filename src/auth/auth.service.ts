import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { auteLoginDto } from './dto/authDto'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';



@Injectable()
export class AuteService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
        private jwtService: JwtService) { }


    // }

    async bringHashCodeFromDB(auteData: auteLoginDto) {
        const result = await this.usersRepo.findBy({ userName: auteData.userName })
        return result[0]["passwordHash"];
    }
    async comparePasswords(auteLoginDto: auteLoginDto, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(auteLoginDto.password, hashedPassword);
    }

    async generatToken(auteData: auteLoginDto) {
        const result = await this.usersRepo.findBy({ userName: auteData.userName })
        const payload = {
            username: auteData.userName,
            id: result[0]["id"],
            role: result[0]["role"]
        }
        const newToken = this.jwtService.sign(payload);
        return {newToken,
            user: {
                id: result[0]["id"],
                username: auteData.userName,
                role: result[0]["role"]

            }
        }
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
