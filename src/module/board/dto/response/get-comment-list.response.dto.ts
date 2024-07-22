import { BadRequestException } from '@nestjs/common';
import {ResponseDto} from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import {CommentListItem} from '../../../../types/interfaces';
import GetCommentListResultSet from '../../../data-access/entities/result-set/get-comment-list.result-set';

export default class GetCommnetListResponseDto extends ResponseDto {

    private commentList: CommentListItem[];

    constructor(resultSet:GetCommentListResultSet[]) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        
        const commentList: CommentListItem[] = resultSet;
        this.commentList = commentList;
    }

    static success(resultSet:GetCommentListResultSet[]) {
        return new GetCommnetListResponseDto(resultSet);
    }

    static noExistBoard() {
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
    }
}