import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { ResponseDto } from 'types/classes';

@Injectable() // 직접 만든거 module에 넣어줘야함
export default class UserRepository { //extends Repository<UserEntity> // 옛날방식

    private readonly logger = new Logger('User Repository');
    constructor(
        @InjectRepository(UserEntity) // db 테이블과 연결된 객체
        private readonly repository: Repository<UserEntity>, // find나 delete 등 처리 가능
        private readonly dataSource: DataSource
    )// user repository 만든 것
    {}

    async existByEmail(email:string): Promise<boolean> {
        try {
            const result = await this.repository.exists({where:{email}})
            return result;
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async existByNickname(nickname:string): Promise<boolean> {
        try {
            const result = await this.repository.exists({where:{nickname}})
            return result;
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async existByTelNumber(telNumber:string): Promise<boolean> {
        try {
            const result = await this.repository.exists({where:{telNumber}})
            return result;
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async save(userEntity: UserEntity): Promise<void> {
        try {
            await this.repository.save(userEntity);
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

}