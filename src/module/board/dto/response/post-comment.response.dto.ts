import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { ResponseDto } from "../../../../types/classes";
import { ResponseCode, ResponseMessage } from "../../../../types/enums";

export default class PostCommentResponseDto extends ResponseDto {

    constructor(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    static success() {
        return new PostCommentResponseDto();
    }

    static NoExistBoard() {
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
    }

    static NoExistUser() {
        throw new UnauthorizedException(new ResponseDto(ResponseCode.AUTHORIZATION_FAIL, ResponseMessage.AUTHORIZATION_FAIL))
    }
}