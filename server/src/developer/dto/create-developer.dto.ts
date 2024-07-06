import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateDeveloperDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
