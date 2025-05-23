import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    role: string; // 'user' or 'admin'
}