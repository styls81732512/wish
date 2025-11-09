import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAppointmentServicesDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
