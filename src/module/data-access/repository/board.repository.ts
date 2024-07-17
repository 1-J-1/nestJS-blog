import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { PostBoardRequestDto } from '@/module/board/dto/request';
import { ResponseDto } from '@/types/classes';
import { nowDatetime } from '../../../utils';

@Injectable()
export default class BoardRepository {

    private readonly logger = new Logger('Board Repository');
    constructor(
        @InjectRepository(BoardEntity)
        private readonly repository: Repository<BoardEntity>,
        private readonly dataSource: DataSource
    ){}

    create({title, content}:PostBoardRequestDto, writeEmail:string) {
        try{
            const boardEntity = this.repository.create({
                title, content, writeDatetime:nowDatetime, favoriteCount:0, commentCount:0, viewCount:0, writeEmail
            });
            return boardEntity;
        } catch (e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async save(boardEntity: BoardEntity){
        try{
            return await this.repository.save(boardEntity);
        } catch (e) {
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }
}