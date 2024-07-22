import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { PostBoardRequestDto } from '@/module/board/dto/request';
import { ResponseDto } from '@/types/classes';
import { nowDatetime } from '../../../utils';
import {GetBoardResultSet} from '../../data-access/entities/result-set';

@Injectable()
export default class BoardRepository {

    private readonly logger = new Logger('Board Repository');
    constructor(
        @InjectRepository(BoardEntity)
        private readonly repository: Repository<BoardEntity>,
        private readonly dataSource: DataSource
    ){}

    create({title, content}:PostBoardRequestDto, writerEmail:string) {
        try{
            const boardEntity = this.repository.create({
                title, content, writeDatetime:nowDatetime, favoriteCount:0, commentCount:0, viewCount:0, writerEmail
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

    async existsByBoardNumber(boardNumber:number){
        try {
            const result = this.repository.exists({where:{boardNumber}})
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async findByBoardNumber(boardNumber:number){
        try {
            const boardEntity = await this.repository.findOne({where:{boardNumber}})
            return boardEntity;
        } catch (e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async getBoard(boardNumber:number) {
        try {
            const resultSet = await this.dataSource.createQueryBuilder()
            .select("B.board_number", "boardNumber")
            .addSelect("B.title", "title")
            .addSelect("B.content", "content")
            .addSelect("B.write_datetime", "writeDatetime")
            .addSelect("B.writer_email", "writerEmail")
            .addSelect("U.nickname", "writerNickname")
            .addSelect("U.profile_image", "writerProfileImage")
            .from("board", "B")
            .innerJoin("user", "U", "B.writer_email = U.email")
            .where("B.board_number = :boardNumber", {boardNumber})
            .getRawOne();
            
            return resultSet as GetBoardResultSet;
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async deleteByBoardNumber(boardNumber:number) {
        try{
            return await this.repository.delete({boardNumber})
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }
}