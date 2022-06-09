import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.PRIVATE_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getByEmail(payload.email);
    if (!user || user.password !== payload.password) {
      throw new UnauthorizedException(); 
    }
    return user;
  }
}