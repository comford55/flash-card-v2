import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
