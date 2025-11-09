import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAdminController } from './controllers/auth-admin.controller';
import { UserController } from './controllers/user.controller';
import { AdminUser } from './entities/admin-user.entity';
import { AuthService } from './services/auth.service';
import { AdminUsersService } from './services/admin-users.service';
import { JwtStrategy } from 'src/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UserController, AuthAdminController],
  providers: [AdminUsersService, AuthService, JwtStrategy],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
