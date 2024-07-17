import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerModuleConfig } from '@/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import serveStaticModuleConfig from '@/config/serve.static.module.config';

@Module({
  imports:[MulterModule.register(multerModuleConfig),
    ServeStaticModule.forRoot(serveStaticModuleConfig)
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
