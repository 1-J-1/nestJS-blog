import { IsNotEmpty, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsBoolean, Equals, IsString } from 'class-validator';
import { Equal } from 'typeorm';
export default class SignUpRequestDto {
    
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password:string;

    @IsNotEmpty()
    nickname:string;

    @IsNotEmpty()
    @Matches(/^[0-9]{11,13}$/)
    telNumber:string;

    @IsNotEmpty()
    address:string;

    // @IsString() // 이런것도 있음
    @IsOptional()
    addressDetail:string|null;

    @IsBoolean()
    @Equals(true) // assert true와 같은 형태
    agreedPersonal:boolean;
}