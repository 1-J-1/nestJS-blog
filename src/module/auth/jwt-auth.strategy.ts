import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';

config();

@Injectable()
export default class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    // async validate (payload: any) {
    //     const { sub } = payload;
    //     const email = sub;
    //     return email;
    // }

    async validate ({ sub }: any) {
        return sub;
    } // 위랑 똑같음
}