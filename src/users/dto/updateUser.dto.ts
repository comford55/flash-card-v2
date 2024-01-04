import { IsAlphanumeric, IsOptional, IsString } from "class-validator";

export class UpdateUserDTO {
    @IsAlphanumeric()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;
}