import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMMysqlConfig } from './config';
import { AuthModule } from './module/auth/auth.module';
import { BoardModule } from './module/board/board.module';
import { UserModule } from './module/user/user.module';
import { FileModule } from './module/file/file.module';
import { SearchModule } from './module/search/search.module';
import { DataAccessModule } from './module/data-access/data-access.module';

@Module({  
  imports: [
    TypeOrmModule.forRoot({
      ...typeORMMysqlConfig,
      autoLoadEntities: true,
    }),
    AuthModule,
    BoardModule,
    UserModule,
    FileModule,
    SearchModule,
    DataAccessModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
