import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetSignInUesrResponseDto, GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from './dto/response';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { GetSignInUser } from '../../decorator';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from './dto/request';
@Controller('/api/v1/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Patch('/nickname')
  @UseGuards(JwtAuthGuard)
  patchNickname(@Body() requestBody:PatchNicknameRequestDto, @GetSignInUser() email:string):Promise<PatchNicknameResponseDto> {

    const response = this.userService.patchNickname(requestBody, email);
    return response;
  }

  @Patch('/profile-image')
  @UseGuards(JwtAuthGuard)
  patchProfileImage(@Body() requestBody:PatchProfileImageRequestDto, @GetSignInUser() email:string):Promise<PatchProfileImageResponseDto> {

    const response = this.userService.patchProfileImage(requestBody, email);
    return response;
  }
  
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
