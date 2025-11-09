import { UseGuards } from '@nestjs/common';
import { BaseController } from './base.controller';
import { JwtAuthGuard } from 'src/core/jwt';

@UseGuards(JwtAuthGuard)
export class AdminController extends BaseController {}
