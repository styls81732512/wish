import { Body, Controller, Get, Post, Put, Query, Res } from '@nestjs/common';
import {
  AdminController,
  AllowAnonymous,
  ErrorCode,
  ValidationException,
} from 'src/core';
import { AdminUsersService } from '../services/admin-users.service';
import { FindUserDto } from '../dto/users/find-user.dto';
import { FindUserAllDto } from '../dto/users/find-user-all.dto';
import type { Response } from 'express';
import { UpdateAdminUserDto } from '../dto/users/update-admin-user.dto';
import { CreateAdminUserDto } from '../dto/users/create-admin-user.dto';

@Controller('admin/adminUsers/user')
export class UserController extends AdminController {
  constructor(private readonly adminUserService: AdminUsersService) {
    super();
  }

  @Get('list')
  @AllowAnonymous()
  async findAll(@Query() dto: FindUserAllDto) {
    const entities = await this.adminUserService.findAll(dto);

    return this.respondOk(entities);
  }

  @Get()
  @AllowAnonymous()
  async findOne(@Query() dto: FindUserDto) {
    const user = await this.adminUserService.findOneById(dto.id);
    if (!user) {
      throw new ValidationException({
        code: ErrorCode.NOT_EXIST,
        message: 'No such user',
      });
    }

    return this.respondOk(user);
  }

  @Post('')
  async createAdminUser(
    @Body() dto: CreateAdminUserDto,
    @Res() response: Response,
  ) {
    await this.adminUserService.createAdminUser(dto);

    return this.respondNoContent(response);
  }

  @Put('')
  async updateAdminUser(
    @Body() dto: UpdateAdminUserDto,
    @Res() response: Response,
  ) {
    await this.adminUserService.updateAdminUser(dto);

    return this.respondNoContent(response);
  }
}
