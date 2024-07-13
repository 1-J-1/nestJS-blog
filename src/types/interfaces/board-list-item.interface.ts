export default interface BoardListItem {
    boardNumber: number;
    title: string;
    content: string;
    boardTitleImage: string | null;
    favorite: string;
    commentCount: number;
    viewCount: number;
    writeDatetime: string;
    writeNickname: string;
    writerProfileImage: string | null;
}