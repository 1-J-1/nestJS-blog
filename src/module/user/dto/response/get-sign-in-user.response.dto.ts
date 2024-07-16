import { UnauthorizedException } from "@nestjs/common";
import { ResponseDto } from "../../../../types/classes";
import { ResponseCode, ResponseMessage } from "../../../../types/enums";
import {UserEntity} from '../../../data-access/entities'

export default class GetSignInUesrResponseDto extends ResponseDto {

    private email:string;
    private nickname:string;
    private profileImage:string |null;

    constructor({email, nickname, profileImage}:UserEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    static success(userEntity: UserEntity) {
        return new GetSignInUesrResponseDto(userEntity);
    }

    static noExistUser(){
        throw new UnauthorizedException(new ResponseDto(ResponseCode.NO_EXIST_USER,ResponseMessage.NO_EXIST_USER));
    }
}