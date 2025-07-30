import { Module } from '@nestjs/common';
import { AuteController } from './auth.controller';
import { AuteService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || '1234',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuteController],
  providers: [AuteService,JwtStrategy]
})
export class AuteModule { }