import { BadRequestException, ValidationPipeOptions } from "@nestjs/common";
import { ResponseDto } from "../src/types/classes";
import { ResponseCode, ResponseMessage } from "../src/types/enums";

const validationPipeConfig: ValidationPipeOptions = {
    dismissDefaultMessages: true,
    exceptionFactory: () => {
        return new BadRequestException(new ResponseDto(ResponseCode.VALIDATION_FAIL, ResponseMessage.VALIDATION_FAIL));
    },
}

export default validationPipeConfig;