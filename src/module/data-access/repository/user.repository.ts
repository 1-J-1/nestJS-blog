import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';

@Injectable() // 직접 만든거 module에 넣어줘야함
export default class UserRepository  { //extends Repository<UserEntity> // 옛날방식

    constructor(
        @InjectRepository(UserEntity) // db 테이블과 연결된 객체
        private readonly repository: Repository<UserEntity>, // find나 delete 등 처리 가능
        private readonly dataSource: DataSource
    )// user repository 만든 것
    {}
}