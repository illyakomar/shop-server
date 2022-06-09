import { SetMetadata, UseGuards, createParamDecorator } from '@nestjs/common';
import JwtAuthGuard from './jwt-auth.guard';
import { Role } from '../role/role.enum';
import RolesGuard from './roles.guard';

export const ForRoles = (...roles: Role[]) => SetMetadata('roles', roles);
export const ForAuthorized = () => UseGuards(JwtAuthGuard, RolesGuard);