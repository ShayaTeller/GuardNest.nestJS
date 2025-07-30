// src/users/dto/create-user.dto.ts
import { IsString } from 'class-validator';

export class auteLoginDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

}
