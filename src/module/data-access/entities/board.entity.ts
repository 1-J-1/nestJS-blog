import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'board'})
export default class BoardEntity {

    @PrimaryGeneratedColumn({name:'board_number'})
    boardNumber:number;

    @Column({name:'title'})
    title: string;

    @Column({name:'content'})
    content: string;

    @Column({name:'write_datetime'})
    writeDatetime: string;

    @Column({name:'favorite_count'})
    favoriteCount: number;

    @Column({name:'comment_count'})
    commnetCount: number;

    @Column({name:'view_count'})
    viewCount: number;

    @Column({name:'write_email'})
    writeEmail: string;
}