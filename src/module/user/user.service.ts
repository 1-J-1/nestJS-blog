import { Injectable } from '@nestjs/common';
import { UserRepository } from '../data-access/repository';
import { GetSignInUesrResponseDto, GetUserResponseDto } from './dto/response';
import {PatchNicknameRequestDto, PatchProfileImageRequestDto} from './dto/request';
import {PatchNicknameResponseDto, PatchProfileImageResponseDto} from './dto/response';

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

    async patchNickname(dto:PatchNicknameRequestDto, email:string):Promise<PatchNicknameResponseDto> {

        const userEntity = await this.userRespository.findByEmail(email);
        if(!userEntity) PatchNicknameResponseDto.noExistUser();

        const {nickname} = dto;

        const isDuplicated = await this.userRespository.existByNickname(nickname);
        if(isDuplicated) PatchNicknameResponseDto.duplicateNickname();

        userEntity.nickname = nickname;
        await this.userRespository.save(userEntity);

        return PatchNicknameResponseDto.success();
    }

    async patchProfileImage(dto:PatchProfileImageRequestDto, email:string):Promise<PatchProfileImageResponseDto> {
        
        const userEntity = await this.userRespository.findByEmail(email);
        if(!userEntity) PatchProfileImageResponseDto.noExistUser();

        const {profileImage} = dto;

        userEntity.profileImage = profileImage? profileImage:null;
        await this.userRespository.save(userEntity);

        return PatchProfileImageResponseDto.success();
    }
}
