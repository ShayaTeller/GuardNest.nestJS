import { Body, Controller, Post } from '@nestjs/common';
import { AuteService } from './aute.service'
import { auteLoginDto } from './dto/authDto'
import { UnauthorizedException } from '@nestjs/common';

@Controller('/aute')
export class AuteController {
    constructor(private readonly AuteService: AuteService) { }

    @Post('/login')
    async userAuth(@Body() auteLoginDto: auteLoginDto) {
        try {
            const hashedPassword = await this.AuteService.bringHashCodeFromDB(auteLoginDto)
            const isPasswordValid = await this.AuteService.comparePasswords(auteLoginDto, hashedPassword)

            if (isPasswordValid) {
                const tokenData = await this.AuteService.generatToken(auteLoginDto);
                return {
                    message: 'login succesfuli',
                    ...tokenData
                };
            }
            else {
                throw new UnauthorizedException('Invalid username or password');
            }
        }
        catch (error) {
            throw new UnauthorizedException('Invalid username or password');

        }
    }


    @Post('/validate')
    async validateToken(@Body() body: { token: string }) {
        try {
            const decoded = await this.AuteService.validateToken(body.token);
            return {
                nessage: 'Token Is Valid',
                user: decoded
            };

        } catch (error) {
            throw new UnauthorizedException('Invalid token');

        }
    }


}
