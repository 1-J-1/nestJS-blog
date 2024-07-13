import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/request';
import { SignUpResponseDto } from './dto/response';
import { UserRepository } from 'module/data-access/repository';

import * as bcrypt from 'bcrypt';
import { UserEntity } from 'module/data-access/entities';

@Injectable()
export class AuthService {

    constructor (
        private readonly userRepository: UserRepository
    ) {}

    async signUp(dto: SignUpRequestDto): Promise<SignUpResponseDto | void> {
        const { email, password, nickname, telNumber } = dto;

        const isExistEmail = await this.userRepository.existByEmail(email);
        // 결과가 나올거기 때문에 기다렸다가
        if(isExistEmail) return SignUpResponseDto.duplicateEmail();

        const isExistNickname = await this.userRepository.existByNickname(nickname);
        if(isExistNickname) return SignUpResponseDto.duplicateNickname();

        const isExistTelNumber = await this.userRepository.existByTelNumber(telNumber);
        if(isExistTelNumber) return SignUpResponseDto.duplicateTelNumber();

        const salt = await bcrypt.genSalt();
        const encodedPassword = await bcrypt.hash(password,salt);
        dto.password = encodedPassword;

        const userEntity: UserEntity = {...dto, profileImage:null};
        // 내거는 agreedPersonal을 추가해야 에러가 안 뜸
        await this.userRepository.save(userEntity); 

        return SignUpResponseDto.success();
    }

}
