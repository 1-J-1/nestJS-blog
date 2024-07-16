import { IAuthModuleOptions } from '@nestjs/passport';

const passportJwtConfig: IAuthModuleOptions<any> = {
    default: 'jwt'
}
export default passportJwtConfig;