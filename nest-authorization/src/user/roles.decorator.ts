import { SetMetadata } from '@nestjs/common';
import { Role } from './entities/roles.enums';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
