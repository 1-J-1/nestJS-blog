import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtAuthStrategy from './jwt-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { passportJwtConfig } from '../../../config';
import { DataAccessModule } from 'module/data-access/data-access.module';

@Module({
  imports: [PassportModule.register(passportJwtConfig),
    DataAccessModule
  ], //{ defaultStrategy: 'jwt'}
  controllers: [AuthController],
  providers: [JwtAuthStrategy, AuthService],
  exports: [JwtAuthStrategy]
})
export class AuthModule {}
