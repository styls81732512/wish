import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { BasePaginationDto, BooleanTransformer } from 'src/core';

export class FindAppointmentServicesAllDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  price: string;

  @BooleanTransformer()
  @IsOptional()
  isRemove: boolean;

  @BooleanTransformer()
  @IsOptional()
  isPublic: boolean;
}
