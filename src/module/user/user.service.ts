import { Injectable } from '@nestjs/common';
import { UserRepository } from '../data-access/repository';
import { GetSignInUesrResponseDto, GetUserResponseDto } from './dto/response';

@Injectable()
export class UserService {

    constructor(
        private readonly userRespository:UserRepository
    ) {}

    async getUser(email:string): Promise<GetUserResponseDto> {
        const userEntity = await this.userRespository.findByEmail(email);
        if(!userEntity) GetUserResponseDto.noExistUser();

        return GetUserResponseDto.success(userEntity);
    }

    async getSignInUser(email:string): Promise<GetSignInUesrResponseDto> {

        const userEntity = await this.userRespository.findByEmail(email);
        if(!userEntity) GetSignInUesrResponseDto.noExistUser();

        return GetSignInUesrResponseDto.success(userEntity);
    }
}
