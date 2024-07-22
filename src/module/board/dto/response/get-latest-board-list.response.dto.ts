import { ResponseDto } from "../../../../types/classes";
import { ResponseCode, ResponseMessage } from "../../../../types/enums";
import { BoardListItem } from "../../../../types/interfaces";
import { BoardListViewEntity } from '../../../data-access/entities';

export default class GetLatestBoardListResponseDto extends ResponseDto {

    private boardListViewEntities: BoardListItem[]

    constructor(boardListViewEntities: BoardListViewEntity[]){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.boardListViewEntities = boardListViewEntities;
    }

    static success(boardListViewEntities: BoardListViewEntity[]) {
        return new GetLatestBoardListResponseDto(boardListViewEntities);
    }
}