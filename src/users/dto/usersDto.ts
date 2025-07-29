// src/users/dto/create-user.dto.ts
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  role: string;

  @IsString()
  password: string;
}
