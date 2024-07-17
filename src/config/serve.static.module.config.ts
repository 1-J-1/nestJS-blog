import {ServeStaticModuleOptions} from '@nestjs/serve-static';
import {config} from 'dotenv';

config();

const serveStaticModule: ServeStaticModuleOptions = {
    rootPath: process.env.FILE_PATH
}

export default serveStaticModule;