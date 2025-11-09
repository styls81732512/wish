import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import {
  AdminController,
  AllowAnonymous,
  ErrorCode,
  ValidationException,
} from 'src/core';
import { LoginDto } from '../dto/auth/login.dto';
import { AuthService } from '../services/auth.service';
import { AdminUsersService } from '../services/admin-users.service';
import type { Response } from 'express';
import { RegisterDto } from '../dto/auth/register.dto';

@Controller('admin/adminUsers/auth')
export class AuthAdminController extends AdminController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminUserService: AdminUsersService,
  ) {
    super();
  }

  @Post('login')
  @AllowAnonymous()
  async login(@Body() dto: LoginDto, @Res() response: Response) {
    const user = await this.adminUserService.findOneByEmail(dto.email);
    if (!user) {
      throw new ValidationException({
        code: ErrorCode.NOT_EXIST,
        message: 'No such user',
      });
    }

    const result = await this.authService.login(user, dto.password);

    if (!result) throw new UnauthorizedException();

    return this.respondOk(result, response);
  }

  @Post('register')
  @AllowAnonymous()
  async register(@Body() dto: RegisterDto, @Res() response: Response) {
    const repeatEmailUser = await this.adminUserService.findOneByEmail(
      dto.email,
    );
    if (repeatEmailUser) {
      throw new ValidationException({
        code: ErrorCode.EXIST,
        message: 'Email already exists',
      });
    }
    const user = await this.adminUserService.createAdminUser(dto);

    return this.respondCreated(user.id, response);
  }
}
