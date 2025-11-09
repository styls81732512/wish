import { IsNotEmpty, IsUUID } from 'class-validator';
export class FindUserDto {
  @IsNotEmpty()
  @IsUUID()
  public readonly id: string;
}
