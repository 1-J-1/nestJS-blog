import { Injectable } from '@nestjs/common';
import { SearchLogRepository } from '../data-access/repository';
import {GetPopularListReponseDto, GetRelationListResponseDto} from './dto/response';
@Injectable()
export class SearchService {

    constructor(
        private readonly searchLogRepository:SearchLogRepository
    ){}

    async getPopularList():Promise<GetPopularListReponseDto> {

        const resultSets = await this.searchLogRepository.getPopularList();
        return GetPopularListReponseDto.success(resultSets);
    }

    async getRelationList(searchWord:string):Promise <GetRelationListResponseDto> {

        const resultSets = await this.searchLogRepository.getRelationList(searchWord);
        return GetRelationListResponseDto.success(resultSets);
    }
}
