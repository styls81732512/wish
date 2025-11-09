import { IsNotEmpty, IsString } from 'class-validator';

export class FindAppointmentServicesDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
