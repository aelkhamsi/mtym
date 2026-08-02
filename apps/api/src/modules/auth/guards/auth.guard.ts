import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard as PayloadAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userGuard = new (PayloadAuthGuard('jwt'))();
    const adminGuard = new (PayloadAuthGuard('payload-jwt'))();

    try {
      return await userGuard.canActivate(context) as boolean;
    } catch {}

    try {
      return await adminGuard.canActivate(context) as boolean;
    } catch {
      return false;
    }
  }
}