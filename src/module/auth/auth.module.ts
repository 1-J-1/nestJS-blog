import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtAuthStrategy from './jwt-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtModuleConfig, passportJwtConfig } from '../../config';
import { DataAccessModule } from 'module/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../data-access/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule.register(passportJwtConfig),
    DataAccessModule,
    JwtModule.register(jwtModuleConfig),
    TypeOrmModule.forFeature([UserEntity]),
  ], //{ defaultStrategy: 'jwt'}
  controllers: [AuthController],
  providers: [JwtAuthStrategy, AuthService],
  exports: [JwtAuthStrategy]
})
export class AuthModule {}
