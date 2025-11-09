import { AdminUser } from '../../entities/admin-user.entity';

export class PaginationUserRo {
  constructor(data: AdminUser) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.updatedAt = data.updatedAt;
  }

  id: string;

  name: string;

  email: string;

  updatedAt: Date;
}
