import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(30)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(4, 30)
    password: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}