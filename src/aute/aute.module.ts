import { Module } from '@nestjs/common';
import { AuteController } from './aute.controller';
import { AuteService } from './aute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [AuteService]
})
export class AuteModule { }