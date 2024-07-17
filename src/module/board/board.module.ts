import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { DataAccessModule } from '../data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
