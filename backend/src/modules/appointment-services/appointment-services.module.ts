import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentServicesService } from './appointment-services.service';
import { AppointmentServices } from './entities/appointment-services.entity';
import { AppointmentServicesAdminController } from './controllers/appointment-service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentServices])],
  controllers: [AppointmentServicesAdminController],
  providers: [AppointmentServicesService],
  exports: [AppointmentServicesService],
})
export class AppointmentServicesModule {}
