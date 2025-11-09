import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../entities/admin-user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(
    user: AdminUser,
    inputPassword: string,
  ): Promise<{ token: string } | null> {
    const isMatched = await bcrypt.compare(inputPassword, user.password);
    if (!isMatched) return null;

    // needs to match the format in jwt.strategy
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return { token: await this.jwtService.signAsync(payload) };
  }
}
