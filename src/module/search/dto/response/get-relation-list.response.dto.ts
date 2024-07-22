import { GetRelationListResultSet } from "@/module/data-access/entities/result-set";
import { ResponseDto } from "../../../../types/classes";
import { ResponseCode, ResponseMessage } from "../../../../types/enums";

export default class GetRelationListResponseDto extends ResponseDto{

    relativeWordList:string[]

    constructor(resultSets:GetRelationListResultSet[]){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.relativeWordList = resultSets.map(resultSet => resultSet.relationWord);
    }

    static success(resultSets:GetRelationListResultSet[]) {
        return new GetRelationListResponseDto(resultSets);
    }

}