import { NextFunction, Request, Response } from 'express';
import { AppError } from './errorHandler';
import { verifyAccessToken } from '../utils/jwt';
import { User } from '../../models';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    roleId: number;
    roleName: string;
    username: string;
    permissions: string[];
  };
}

export const authenticate = async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(new AppError('Authentication required', 401));
    return;
  }

  try {
    const token = header.split(' ')[1];
    const payload = verifyAccessToken(token);
    const user = await User.findByPk(payload.userId, {
      include: [{ association: 'role', include: [{ association: 'permissions' }] }],
    });

    if (!user || !user.role) {
      next(new AppError('Invalid session', 401));
      return;
    }

    const permissions = (user.role.permissions || []).map((permission) => permission.name);
    req.user = {
      id: user.id,
      roleId: user.roleId,
      roleName: user.role.name,
      username: user.username,
      permissions,
    };
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};

export const requirePermission = (permission: string) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    const aliases = (() => {
      if (!permission.includes('.')) {
        return [permission];
      }

      const [scope, action] = permission.split('.');
      const normalizedScope = scope.trim().toUpperCase();

      if (action === 'read') return [`VIEW_${normalizedScope}`];
      if (action === 'write') return [`ADD_${normalizedScope}`, `EDIT_${normalizedScope}`, `MANAGE_${normalizedScope}`];
      if (action === 'delete' || action === 'remove') return [`DELETE_${normalizedScope}`];
      return [permission];
    })();

    if (user.roleName === 'Admin' || aliases.some((candidate) => user.permissions.includes(candidate))) {
      next();
      return;
    }
    next(new AppError('Forbidden', 403));
  };
};