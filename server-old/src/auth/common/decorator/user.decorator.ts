import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../type/auth';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
