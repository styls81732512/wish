import { AuthGuard, AuthModuleOptions } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOW_ANONYMOUS_META_KEY } from './allow-anonymous.decorator';
import { DataSource } from 'typeorm';
import { AdminUser } from 'src/modules/users/entities/admin-user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Optional() protected readonly options: AuthModuleOptions,
    private reflector: Reflector,
    private dataSource: DataSource,
  ) {
    super(options);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowAnonymous = this.reflector.getAllAndOverride(
      ALLOW_ANONYMOUS_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (allowAnonymous) return true;

    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.id) {
      throw new UnauthorizedException('用戶資訊不完整');
    }

    const adminUser = await this.dataSource
      .getRepository(AdminUser)
      .findOne({ where: { id: user.id } });

    if (!adminUser) {
      throw new UnauthorizedException('用戶不存在或已被刪除');
    }

    return true;
  }
}
