import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/roles.enums';
import { User } from './entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // what is the required role?
    const requiredRole = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    // does the current user has this role?
    // const { user } = context.switchToHttp().getRequest();
    const user: User = {
      name: 'Tahir',
      roles: [Role.USER],
    };

    return requiredRole.some((role) => user.roles.includes(role));
  }
}
