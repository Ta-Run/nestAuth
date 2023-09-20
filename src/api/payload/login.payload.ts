import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    isString,
  } from '@nestjs/class-validator';

  export class LoginPayload {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct Email' })
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
  }
