import { SetMetadata, UseGuards, createParamDecorator } from '@nestjs/common';
import JwtAuthGuard from './jwt-auth.guard';
import { Role } from '../other/role.enum';
import RolesGuard from './roles.guard';

export const ForRoles = (...roles: Role[]) => SetMetadata('roles', roles);
export const ForAuthorized = () => UseGuards(JwtAuthGuard, RolesGuard);
export const GetUser = createParamDecorator((_data, req) => req.args[0].user);
