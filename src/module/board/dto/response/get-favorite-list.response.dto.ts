import {ResponseDto} from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import {GetFavoriteListResultSet} from '../../../data-access/entities/result-set';
import {FavoriteListItem} from '../../../../types/interfaces';
import { BadRequestException } from '@nestjs/common';

export default class GetFavoriteListResponseDto extends ResponseDto {

    private favoriteList: FavoriteListItem[];

    constructor(resultSet:GetFavoriteListResultSet[]){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.favoriteList = resultSet;
    }

    static success(resultSet:GetFavoriteListResultSet[]){
        return new GetFavoriteListResponseDto(resultSet);
    }

    static noExistBoard(){
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
    }
}