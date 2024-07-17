import { ResponseCode, ResponseMessage } from '../enums';
import {InternalServerErrorException} from '@nestjs/common';

export default class ResponseDto {

    constructor(
        private readonly code: ResponseCode,
        private readonly message: ResponseMessage
    ) {}
    // field가 생성되는거랑 동일하게 취급? - 생성자

    static databaseError() {
        throw new InternalServerErrorException(new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR));
    }
}