import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

config();

// console.log('Database Name:', process.env.DATABASE_NAME); // debug의 중요성..

const typeORMMysqlConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [join(__dirname, '..', 'src', '**', '*.entity.{ts,js}')],
    synchronize: false // 서버 껐다 켰을 때 초기화 fasle
};

export default typeORMMysqlConfig;



