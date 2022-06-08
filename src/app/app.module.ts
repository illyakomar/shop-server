import { Module } from '@nestjs/common';
import envConfig from '../config/environment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envConfig.dbHost,
      port: Number(envConfig.dbPort),
      username: envConfig.dbUser,
      password: '',
      database: envConfig.dbName,
      entities: ["dist/entity/**/*.js"],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ]
})
export class AppModule {}
