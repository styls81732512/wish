import { IsString, IsOptional } from 'class-validator';
import { BasePaginationDto } from 'src/core/base/dto/base.pagination.dto';

export class FindUserAllDto extends BasePaginationDto {
  @IsString()
  @IsOptional()
  public readonly email: string;
}
