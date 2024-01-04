import { IsAlphanumeric, IsNotEmpty, Length } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsAlphanumeric()
    username: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(4, 30)
    password: string;
}