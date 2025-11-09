import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core';
import { Repository } from 'typeorm';
import { AppointmentServices } from './entities/appointment-services.entity';
import { DeleteAppointmentServicesDto } from './dto/delete-appointment-services.dto';
import { UpdateResult } from 'typeorm/browser';
import { FindAppointmentServicesAllDto } from './dto/find-appointment-services-all.dto';

@Injectable()
export class AppointmentServicesService extends BaseService<AppointmentServices> {
  constructor(
    @InjectRepository(AppointmentServices)
    private readonly repo: Repository<AppointmentServices>,
  ) {
    super(repo);
  }

  async findAll(dto: FindAppointmentServicesAllDto) {
    const queryBuilder = this.repo.createQueryBuilder('appointmentServices');

    if (dto.name) {
      queryBuilder.andWhere('appointmentServices.name LIKE :name', {
        name: `%${dto.name}%`,
      });
    }
    if (dto.price) {
      queryBuilder.andWhere('appointmentServices.price = :price', {
        price: dto.price,
      });
    }
    if (dto.isRemove !== undefined) {
      queryBuilder.andWhere('appointmentServices.isRemove = :isRemove', {
        isRemove: dto.isRemove,
      });
    }
    if (dto.isPublic !== undefined) {
      queryBuilder.andWhere('appointmentServices.isPublic = :isPublic', {
        isPublic: dto.isPublic,
      });
    }

    const entities = await super.findAllByPagination(dto, queryBuilder);

    return entities;
  }

  async updateIsRemove(
    dto: DeleteAppointmentServicesDto,
  ): Promise<UpdateResult> {
    return this.repo.update(dto.id, { isRemove: true });
  }
}
