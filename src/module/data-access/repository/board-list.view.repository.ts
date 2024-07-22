import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardListViewEntity } from "../entities";
import { Between, DataSource, Like, Repository } from "typeorm";
import { ResponseDto } from "@/types/classes";
import { nowDatetime, weekAgoDatetime } from "@/utils";

@Injectable()
export default class BoardListViewRepository {

    private logger = new Logger('BoardListView Repository');
    constructor(
        @InjectRepository(BoardListViewEntity)
        private readonly repository: Repository<BoardListViewEntity>,
        private readonly dataSource: DataSource
    ) {}

    async getLatestList(){
        try {
            const boardListViewEntities = this.repository.find({order:{writeDatetime:'DESC'}});
            return boardListViewEntities;
        } catch(e) {
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }

    }

    async getTop3List(){
        try {
            const boardListViewEntities = this.repository.find({
                where:{writeDatetime: Between(weekAgoDatetime, nowDatetime)},
                order:{favoriteCount:'DESC', commentCount:'DESC', viewCount:'DESC', writeDatetime:'DESC'},
                take:3
            })
            return boardListViewEntities;
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async getSearchList(searchWord:string) {
        try {
            const boardListViewEntities = this.repository.find({
                where: [
                    {title:Like(`%${searchWord}%`)},
                    {content:Like(`%${searchWord}%`)}
                ],
                order:{writeDatetime:'DESC'}
            })
            return boardListViewEntities;
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async getUserList(email:string){
        try{
            const boardListViewEntities = this.repository.find({
                where: {writerEmail:email},
                order:{writeDatetime:'DESC'}
            })
            return boardListViewEntities;
        } catch(e) {
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }
}