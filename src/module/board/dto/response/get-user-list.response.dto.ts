import { UnauthorizedException } from "@nestjs/common";
import { ResponseDto } from "../../../../types/classes";
import { ResponseCode, ResponseMessage } from "../../../../types/enums";
import { BoardListItem } from "../../../../types/interfaces";
import { BoardListViewEntity } from "../../../data-access/entities";

export default class GetUserListResponseDto extends ResponseDto{

    private boardUserList:BoardListItem[]

    constructor(boardListViewEntities:BoardListViewEntity[]){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.boardUserList = boardListViewEntities;
    }

    static success(boardListViewEntities:BoardListViewEntity[]){
        return new GetUserListResponseDto(boardListViewEntities);
    }

    static noExistUser(){
        throw new UnauthorizedException(new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER));
    }
}