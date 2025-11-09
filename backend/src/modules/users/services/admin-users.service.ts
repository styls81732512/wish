import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService, Pagination } from 'src/core';
import { Repository } from 'typeorm';
import { AdminUser } from '../entities/admin-user.entity';
import * as bcrypt from 'bcryptjs';
import { PaginationUserRo } from '../dto/response-objects/pagination-user.ro';
import { FindUserAllDto } from '../dto/users/find-user-all.dto';
import { UpdateAdminUserDto } from '../dto/users/update-admin-user.dto';
import { CreateAdminUserDto } from '../dto/users/create-admin-user.dto';

@Injectable()
export class AdminUsersService extends BaseService<AdminUser> {
  constructor(
    @InjectRepository(AdminUser)
    private readonly repo: Repository<AdminUser>,
  ) {
    super(repo);
  }

  async findOneByEmail(email: string): Promise<AdminUser | null> {
    return this.repo.findOne({
      select: {
        id: true,
        email: true,
        password: true,
      },
      where: { email: email },
    });
  }

  async findOneById(id: string): Promise<AdminUser | null> {
    return await this.repo.findOne({
      select: {
        id: true,
        email: true,
        name: true,
      },
      where: {
        id,
      },
    });
  }

  async findAll(dto: FindUserAllDto) {
    const qb = this.repo.createQueryBuilder('adminUser');

    if (dto.email) {
      qb.andWhere('adminUser.email like :email', {
        email: `${dto.email}%`,
      });
    }

    qb.orderBy('adminUser.createdAt', 'DESC');

    const pagination = await this.findAllByPagination(dto, qb);

    const ro = {
      ...pagination,
      data: pagination.data.map((result) => {
        return new PaginationUserRo(result);
      }),
    };

    return new Pagination(ro);
  }

  async createAdminUser(dto: CreateAdminUserDto) {
    return await this.repo.save({
      name: dto.name,
      email: dto.email,
      password: bcrypt.hashSync(dto.password, 10),
    });
  }

  async updateAdminUser(dto: UpdateAdminUserDto) {
    return await this.repo.save({
      id: dto.id,
      password: dto.password ? bcrypt.hashSync(dto.password, 10) : undefined,
    });
  }
}
