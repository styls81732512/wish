import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentServicesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
