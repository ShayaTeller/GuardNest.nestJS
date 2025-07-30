import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuteService } from './auth.service'
import { auteLoginDto } from './dto/authDto'
import { UnauthorizedException } from '@nestjs/common';
import { SetCookies } from '@nestjsplus/cookies';
import { Response } from 'express'; // הוסף את זה


@Controller('/auth')
export class AuteController {
    constructor(private readonly AuteService: AuteService) { }

    @Post('/login')
    async userAuth(@Body() auteLoginDto: auteLoginDto,
        @Res({ passthrough: true }) res: Response // הוסף את זה
    ) {
        try {
            const hashedPassword = await this.AuteService.bringHashCodeFromDB(auteLoginDto)
            const isPasswordValid = await this.AuteService.comparePasswords(auteLoginDto, hashedPassword)

            if (isPasswordValid) {
                const tokenData = await this.AuteService.generatToken(auteLoginDto);

                res.cookie('access_token', tokenData.newToken, {
                    httpOnly: true,     // לא נגיש ל-JavaScript בדפדפן
                    secure: false,      // false לפיתוח, true לפרודקשן
                    maxAge: 24 * 60 * 60 * 1000, // 24 שעות
                    sameSite: 'lax'     // הגנה מפני CSRF
                });


                return {
                    message: 'login successful'}

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


