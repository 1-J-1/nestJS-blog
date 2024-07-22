import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { PostCommentRequestDto } from '../../board/dto/request';
import { nowDatetime } from '@/utils';
import { ResponseDto } from '@/types/classes';
import { GetCommentListResultSet } from '../entities/result-set';

@Injectable()
export default class CommentRepository {

    private readonly logger = new Logger('Comment Repository');
    constructor(
        @InjectRepository(CommentEntity)
        private readonly repository: Repository<CommentEntity>,
        private readonly dataSource: DataSource
    ){}

    create({content}:PostCommentRequestDto, userEmail:string, boardNumber:number) {
        try {
            const commentEntity = this.repository.create({
                content, writeDatetime: nowDatetime, userEmail, boardNumber
            });
            return commentEntity;
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async save(commentEntity:CommentEntity){
        try {
            return await this.repository.save(commentEntity);
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async getCommentList(boardNumber:number) {

        try{
            const resultSet = await this.dataSource.createQueryBuilder()
            .select('U.nickname', 'nickname')
            .addSelect('U.profile_image', 'profileImage')
            .addSelect('C.write_datetime', 'writeDatetime')
            .addSelect('C.content', 'content')
            .from('user', 'U')
            .innerJoin('comment','C', 'C.user_email = U.email')
            .where('C.board_number = :boardNumber', {boardNumber})
            .orderBy('C.write_datetime', 'DESC')
            .getRawMany();
        
            return resultSet as GetCommentListResultSet[];
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