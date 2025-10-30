import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.access_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt').secret,
    });
  }

  async validate(payload: any) {
    let result = { id: payload.sub, role: payload.role } as any;
    if (payload?.username) {
      result = { ...result, username: payload.username };
    }
    if (payload?.email) {
      result = {
        ...result,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        verified: payload.verified,
        applicationId: payload.applicationId,
        teamId: payload.teamId
      };
    }
    return result;
  }
}
