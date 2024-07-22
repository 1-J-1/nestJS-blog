import { InjectRepository } from "@nestjs/typeorm";
import { FavoriteEntity } from "../entities";
import { DataSource, Repository } from "typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { ResponseDto } from "@/types/classes";
import { GetFavoriteListResultSet } from "../entities/result-set";

@Injectable()
export default class FavoriteRepository {

    private readonly logger = new Logger('Favorite Repository');

    constructor(
        @InjectRepository(FavoriteEntity)
        private readonly repository: Repository<FavoriteEntity>,
        private readonly dataSource: DataSource
    ){}

    create(boardNumber:number, userEmail:string){
        try {
            const favoriteEntity = this.repository.create({
                userEmail, boardNumber
            })
            return favoriteEntity;
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async save(favoriteEntity:FavoriteEntity){
        try{
            return await this.repository.save(favoriteEntity);
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async deleteByBoardNumberAndUserEmail(boardNumber:number, userEmail:string) {
        try {
            const favoriteEntity = await this.repository.delete({boardNumber, userEmail})
            return favoriteEntity;
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async existsByBoardNumberAndUserEmail(boardNumber:number, userEmail:string) {
        try {
            const result = this.repository.exists({where:{boardNumber, userEmail}})
            return result;
        } catch(e){
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async getFavoriteList(boardNumber:number){
        try {
            const resultSet = await this.dataSource.createQueryBuilder()
            .select('U.email', 'email')
            .addSelect('U.nickname', 'nickname')
            .addSelect('U.profile_image', 'profileImage')
            .from('favorite', 'F')
            .innerJoin('user', 'U', 'F.user_email = U.email')
            .where('F.board_number = :boardNumber',{boardNumber})
            .getRawMany()

            return resultSet as GetFavoriteListResultSet[];
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