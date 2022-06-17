import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BasketModule } from 'src/basket/basket.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtStrategy from './jwt.strategy';
import RolesGuard from './roles.guard';

@Module({
  imports: [
    UserModule,
    BasketModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '60s' }, // час життя токена 60 секунд
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
})

export class AuthModule {}