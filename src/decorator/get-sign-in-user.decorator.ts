import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const GetSignInUser = createParamDecorator((data, context:ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log(request);

    return request.user;
})

export default GetSignInUser;