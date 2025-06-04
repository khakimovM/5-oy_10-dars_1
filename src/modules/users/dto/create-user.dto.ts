import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsNumber()
  age: number;
}
