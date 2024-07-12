import { InjectRepository } from "@nestjs/typeorm";
import { FavoriteEntity } from "../entities";
import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class FavoriteRepository {

    constructor(
        @InjectRepository(FavoriteEntity)
        private readonly repository: Repository<FavoriteEntity>,
        private readonly dataSource: DataSource
    ){}
}