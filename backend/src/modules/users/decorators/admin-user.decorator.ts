import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type UserInfo = 'id';

type RequestUser = {
  id: string;
};

export const AdminUser = createParamDecorator(
  (key: UserInfo, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as RequestUser;
    return key ? user[key] : user;
  },
);
