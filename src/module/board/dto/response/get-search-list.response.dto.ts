import { ResponseDto } from "../../../../types/classes";
import { ResponseCode, ResponseMessage } from "../../../../types/enums";
import { BoardListItem } from "../../../../types/interfaces";
import { BoardListViewEntity } from "../../../data-access/entities";

export default class GetSearchListResoponseDto extends ResponseDto{

    private boardSearchList: BoardListItem[];

    constructor(boardListViewEntities:BoardListViewEntity[]){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.boardSearchList = boardListViewEntities;
    }

    static success(boardListViewEntities:BoardListViewEntity[]) {
        return new GetSearchListResoponseDto(boardListViewEntities);
    }
}