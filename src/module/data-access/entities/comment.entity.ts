import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'image'})
export default class CommentEntity{

    @PrimaryGeneratedColumn({name:'comment_number'})
    commnetNumber: number;

    @Column({name:'content'})
    content:string;

    @Column({name:'write_datetime'})
    writeDatetime:string;

    @Column({name:'user_email'})
    userEmail:string;

    @Column({name:'board_number'})
    boardNumber:string;
}