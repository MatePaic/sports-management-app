import { IsIn, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsIn(['user', 'admin']) // manual validation for allowed values
  role: string;
}
