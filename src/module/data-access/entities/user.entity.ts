import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name:'user'}) // 어떤 테이블과 매핑할지 설정
export default class UserEntity {

    @PrimaryColumn({name: 'email'})
    email:string;

    @Column({name:'password'})
    password:string;

    @Column({name:'nickname'})
    nickname:string;

    @Column({name:'tel_number'})
    telNumber:string;

    @Column({name:'address'})
    address:string

    @Column({name:'address_detail'})
    addresDetail:string | null;

    @Column({name:'profile_image'})
    profileImage:string | null;

    @Column({name:'agreed_personal'})
    agreedPersonal:string
}