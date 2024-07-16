import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetSignInUesrResponseDto, GetUserResponseDto } from './dto/response';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { GetSignInUser } from '../../decorator';
@Controller('/api/v1/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('/:email')
  getUser(@Param('email') email: string) : Promise<GetUserResponseDto> {

    const response = this.userService.getUser(email);
    return response;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getSignInUser(@GetSignInUser() email:string): Promise<GetSignInUesrResponseDto> {

    const response = this.userService.getSignInUser(email);
    return response;
  }


}
