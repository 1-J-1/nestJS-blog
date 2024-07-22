
export default interface GetBoardResultSet {
    boardNumber:number;
    title:string;
    content:string;
    writeDatetime:string;
    writeEmail:string;
    writerNickname:string;
    writerProfileImage:string|null;
}