// response에서 status
// throw 던진 예외 처리할 때 반환 형태

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter{

    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse(); 

        response
            .status(status) // 에러는 주로 내 잘못이긴 함.. 임포트 안 했음 ㅋ
            .json({
                code: exceptionResponse['code'],
                message: exceptionResponse['message']
            });
    }
}

// 사용자의 이해를 위한 에러 메시지