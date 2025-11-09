import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAppointmentServicesDto } from './create-appointment-services.dto';

export class UpdateAppointmentServicesDto extends CreateAppointmentServicesDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsBoolean()
  isPublic: boolean;
}
