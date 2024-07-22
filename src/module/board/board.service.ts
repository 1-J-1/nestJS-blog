import { Injectable } from '@nestjs/common';
import { BoardListViewRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, UserRepository } from '../data-access/repository';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import {DeleteBoardResponseDto, GetCommnetListResponseDto, GetTop3ListResponseDto, PatchBoardResponseDto, PostBoardResponseDto, PostCommentResponseDto, PutFavoriteResponseDto} from './dto/response';
import { GetBoardResponseDto, GetFavoriteListResponseDto, IncreaseViewCountResponseDto, GetLatestBoardListResponseDto, GetSearchListResponseDto } from './dto/response';

@Injectable()
export class BoardService {
  
    constructor(
        private readonly userRepository: UserRepository,
        private readonly boardRepository: BoardRepository,
        private readonly imageRepository: ImageRepository,
        private readonly commentRepository: CommentRepository,
        private readonly favoriteRepository: FavoriteRepository,
        private readonly boardListViewRepository: BoardListViewRepository,
        private readonly searchLogRepository: SearchLogRepository
    ){}

    async postBoard(dto:PostBoardRequestDto, email: string): Promise<PostBoardResponseDto> {

        const isExistUser = await this.userRepository.existByEmail(email);
        if(!isExistUser) PostBoardResponseDto.noExistUser();

        const boardEntity = this.boardRepository.create(dto,email);
        await this.boardRepository.save(boardEntity);

        const {boardImageList} = dto;
        const { boardNumber } = boardEntity;
        const imageEntities = this.imageRepository.createAll(boardImageList, boardNumber);
        await this.imageRepository.saveAll(imageEntities);

        return PostBoardResponseDto.success();
    }

    async getBoard(boardNumber:number) : Promise<GetBoardResponseDto> {
        const resultSet = await this.boardRepository.getBoard(boardNumber);
        if(!resultSet) GetBoardResponseDto.noExistBoard();

        const imageEntities = await this.imageRepository.findByBoardNumber(boardNumber);

        return GetBoardResponseDto.success(resultSet, imageEntities);
    }

    async patchBoard(dto:PatchBoardRequestDto, boardNumber:number, email:string): Promise<PatchBoardResponseDto> {

        const isExistUser = await this.userRepository.findByEmail(email);
        if(!isExistUser) PatchBoardResponseDto.noExistUser;

        const boardEntitiy = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntitiy) PatchBoardResponseDto.noExistBoard();

        const {writerEmail} = boardEntitiy;
        const isWriter = writerEmail === email;
        if(!isWriter) PatchBoardResponseDto.noPermission();

        boardEntitiy.title = dto.title;
        boardEntitiy.content = dto.content;
        await this.boardRepository.save(boardEntitiy);

        await this.imageRepository.deleteByBoardNumber(boardNumber);

        const {boardImageList} = dto;
        const imageEntities = this.imageRepository.createAll(boardImageList, boardNumber);
        await this.imageRepository.saveAll(imageEntities);

        return PatchBoardResponseDto.success();
    }

    async postComment(dto: PostCommentRequestDto, boardNumber: number, email:string) {
        
        const isExistUser = await this.userRepository.existByEmail(email);
        if(!isExistUser) PostCommentResponseDto.NoExistUser();

        const boardEntitiy = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntitiy) PostCommentResponseDto.NoExistBoard();

        const commentEntity = this.commentRepository.create(dto, email, boardNumber);
        await this.commentRepository.save(commentEntity);

        boardEntitiy.commentCount++;
        await this.boardRepository.save(boardEntitiy);

        return PostCommentResponseDto.success();
    }

    async getCommentList(boardNumber:number): Promise<GetCommnetListResponseDto> {

        const isExistBoard = this.boardRepository.existsByBoardNumber(boardNumber);
        if(!isExistBoard) GetCommnetListResponseDto.noExistBoard();

        const resultSet = await this.commentRepository.getCommentList(boardNumber);
        return GetCommnetListResponseDto.success(resultSet);
    }

    async putFavorite( boardNumber:number, userEmail:string): Promise<PutFavoriteResponseDto> {

        const isExistUser = await this.userRepository.existByEmail(userEmail);
        if(!isExistUser) PutFavoriteResponseDto.noExistUser();

        const boardEntitiy = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntitiy) PutFavoriteResponseDto.noExistBoard();

        const isExistFavorite = await this.favoriteRepository.existsByBoardNumberAndUserEmail(boardNumber, userEmail);
        if(!isExistFavorite){
            const favoriteEntity = this.favoriteRepository.create(boardNumber, userEmail);
            await this.favoriteRepository.save(favoriteEntity);
            boardEntitiy.favoriteCount++;
        } else {
            const favoriteEntity = this.favoriteRepository.deleteByBoardNumberAndUserEmail(boardNumber, userEmail);
            boardEntitiy.favoriteCount--;
        }

        await this.boardRepository.save(boardEntitiy)

        return PutFavoriteResponseDto.success();
    }

    async getFavoriteList(boardNumber:number):Promise<GetFavoriteListResponseDto>{

        const isExistBoard = this.boardRepository.existsByBoardNumber(boardNumber);
        if(!isExistBoard) GetCommnetListResponseDto.noExistBoard();

        const resultSet = await this.favoriteRepository.getFavoriteList(boardNumber);

        return GetFavoriteListResponseDto.success(resultSet);
        
    }

    async deleteBoard(boardNumber:number, email:string):Promise<DeleteBoardResponseDto> {

        const isExistUser = await this.userRepository.existByEmail(email);
        if(!isExistUser) DeleteBoardResponseDto.noExistUser();

        const boardEntitiy = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntitiy) DeleteBoardResponseDto.noExistBoard();

        const {writerEmail} = boardEntitiy; // await 해줘야 받을 수 있음..right?
        const isWriter = writerEmail === email;
        if(!isWriter) DeleteBoardResponseDto.noPermission();

        await this.imageRepository.deleteByBoardNumber(boardNumber);
        await this.commentRepository.deleteByBoardNumber(boardNumber);
        await this.favoriteRepository.deleteByBoardNumber(boardNumber);
        await this.boardRepository.deleteByBoardNumber(boardNumber);

        return DeleteBoardResponseDto.success();
    }

    async increaseViewCount(boardNumber:number):Promise<IncreaseViewCountResponseDto> {

        const boardEntitiy = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntitiy) IncreaseViewCountResponseDto.noExistBoard();

        boardEntitiy.viewCount++;
        await this.boardRepository.save(boardEntitiy);

        return IncreaseViewCountResponseDto.success();
    }

    async getLatestBoardList():Promise<GetLatestBoardListResponseDto> {

        const boardListViewEntities = await this.boardListViewRepository.getLatestList();
        return GetLatestBoardListResponseDto.success(boardListViewEntities);
    }

    async getTop3List():Promise<GetTop3ListResponseDto> {

        const boardListViewEntities = await this.boardListViewRepository.getTop3List();
        return GetTop3ListResponseDto.success(boardListViewEntities);
    }

    async getSearchList(searchWord:string, preSearchWord:string|undefined):Promise<GetSearchListResponseDto> {

        const boardListViewEntities = await this.boardListViewRepository.getSearchList(searchWord);

        preSearchWord = preSearchWord?preSearchWord:null;
        let searchLogEntity = this.searchLogRepository.create(searchWord, preSearchWord, false);
        await this.searchLogRepository.save(searchLogEntity);
        
        const relation = preSearchWord? true:false;
        if(relation) {
            searchLogEntity = this.searchLogRepository.create(preSearchWord, searchWord, true);
            await this.searchLogRepository.save(searchLogEntity);
        }

        return GetSearchListResponseDto.success(boardListViewEntities);
    }

}
