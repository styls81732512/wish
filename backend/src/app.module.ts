import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminUsersModule } from './modules/users/admin-users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { masterDataSourceConfig } from './core/databases/configs/master-data-source.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppointmentServicesModule } from './modules/appointment-services/appointment-services.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => masterDataSourceConfig,
      inject: [ConfigService],
    }),
    AdminUsersModule,
    AppointmentServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
