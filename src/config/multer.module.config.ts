import { ImageFileFilter } from '@/filter';
import {MulterOptions} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {config} from 'dotenv';
import { diskStorage } from 'multer';
import {v4 as uuid4} from 'uuid';
config();

const multerModuleConfig: MulterOptions = {
    storage:diskStorage({
        destination: process.env.FILE_PATH,
        filename: (request, file, callback) => {callback(null, uuid4()+'.'+ file.mimetype.split('/')[1])}
    }),
    fileFilter: ImageFileFilter,
    limits: {
        fileSize: 1024*1024*100
    }
};

export default multerModuleConfig;