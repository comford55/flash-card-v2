import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class ChangePasswordDTO {
    @IsNotEmpty()
    @IsAlphanumeric()
    oldPassword: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    newPassword: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    confirmPassword: string;
}