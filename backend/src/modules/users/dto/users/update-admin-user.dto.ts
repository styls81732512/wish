import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminUserDto {
  @IsNotEmpty()
  @IsString()
  public readonly id: string;

  @IsString()
  @IsOptional()
  public readonly password: string;
}
