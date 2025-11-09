import {
  AdminController,
  AllowAnonymous,
  ErrorCode,
  ValidationException,
} from 'src/core';
import { AppointmentServicesService } from '../appointment-services.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { FindAppointmentServicesAllDto } from '../dto/find-appointment-services-all.dto';
import { FindAppointmentServicesDto } from '../dto/find-appointment-services.dto';
import { CreateAppointmentServicesDto } from '../dto/create-appointment-services.dto';
import type { Response } from 'express';
import { UpdateAppointmentServicesDto } from '../dto/update-appointment-services.dto';
import { DeleteAppointmentServicesDto } from '../dto/delete-appointment-services.dto';
import dayjs from 'dayjs';

@Controller('admin/appointmentServices')
export class AppointmentServicesAdminController extends AdminController {
  constructor(
    private readonly appointmentServicesService: AppointmentServicesService,
  ) {
    super();
  }

  @Get('list')
  @AllowAnonymous()
  async findAll(@Query() dto: FindAppointmentServicesAllDto) {
    const entities = await this.appointmentServicesService.findAll(dto);

    return this.respondOk(entities);
  }

  @Get()
  @AllowAnonymous()
  async findOne(@Query() dto: FindAppointmentServicesDto) {
    const entity = await this.appointmentServicesService.findOne(dto.id);

    return this.respondOk(entity);
  }

  @Post()
  async create(
    @Body() dto: CreateAppointmentServicesDto,
    @Res() response: Response,
  ) {
    const id = await this.appointmentServicesService.create({
      ...dto,
      showTime: dayjs().unix(),
    });

    return this.respondCreated(id, response);
  }

  @Put()
  async update(
    @Body() dto: UpdateAppointmentServicesDto,
    @Res() response: Response,
  ) {
    const entity = await this.appointmentServicesService.findOne(dto.id);
    if (!entity) {
      throw new ValidationException({
        code: ErrorCode.NOT_EXIST,
        message: 'No such appointment service',
      });
    }

    await this.appointmentServicesService.update(dto);

    return this.respondNoContent(response);
  }

  @Delete()
  async delete(
    @Body() dto: DeleteAppointmentServicesDto,
    @Res() response: Response,
  ) {
    const entity = await this.appointmentServicesService.findOne(dto.id);
    if (!entity) {
      throw new ValidationException({
        code: ErrorCode.NOT_EXIST,
        message: 'No such appointment service',
      });
    }

    await this.appointmentServicesService.updateIsRemove(dto);

    return this.respondNoContent(response);
  }
}
