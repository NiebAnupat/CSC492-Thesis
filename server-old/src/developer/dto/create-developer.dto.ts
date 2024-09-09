import { IsEmail, IsStrongPassword } from 'class-validator';
import { IsString } from 'nestjs-swagger-dto';

export class CreateDeveloperDto {
  @IsString({
    maxLength: 100,
    description: 'email of the developer',
  })
  @IsEmail()
  email: string;

  @IsString({
    minLength: 8,
    maxLength: 100,
    description: 'password of the developer',
  })
  @IsStrongPassword()
  password: string;
}
