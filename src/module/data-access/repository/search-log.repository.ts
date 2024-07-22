import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchLogEntity } from "../entities";
import { DataSource, Repository } from "typeorm";
import { ResponseDto } from "@/types/classes";

@Injectable()
export default class SearchLogRepository {

    private readonly logger = new Logger('SearchLog Repository');

    constructor(
        @InjectRepository(SearchLogEntity)
        private readonly repository: Repository<SearchLogEntity>,
        private readonly dataSource: DataSource
    ) {}

    create(searchWord:string, relationWord:string|null, relation:boolean) {

        try{
            const searchLogEntity = this.repository.create({
                searchWord,
                relationWord,
                relation
            })
            return searchLogEntity;

        } catch(e) {
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

    async save(searchLogEntity:SearchLogEntity) {
        try {
            return this.repository.save(searchLogEntity);
        } catch(e) {
            this.logger.error(e.message);
            ResponseDto.databaseError();
        }
    }

 
}