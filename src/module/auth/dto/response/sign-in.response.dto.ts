import { ResponseDto } from "@/types/classes";
import { ResponseCode, ResponseMessage } from "@/types/enums";
import { UnauthorizedException } from "@nestjs/common";

export default class SignInResponseDto extends ResponseDto {

    private token:string;
    private experationTime:number;

    constructor(token:string){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token;
        this.experationTime = 3600;
    }

    static success(token:string){
        return new SignInResponseDto(token);
    }

    static signInFail() {
        throw new UnauthorizedException(new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL));
    }
}