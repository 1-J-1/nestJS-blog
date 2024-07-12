import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import JwtAuthGuard from './jwt-auth.guard';

@Controller('/api/v1/auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get()
    @UseGuards(AuthGuard('jwt')) // 인증을 거쳐서 쓸 수 잇게 함
    get() {
        return 'Hey Auth';
    }
}
