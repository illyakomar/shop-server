import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.png';
      const filePath = path.resolve(__dirname, '..', 'static')
      if(!fs.existsSync(filePath)){ // якщо папки небуде но сптворимо папку
        fs.mkdirSync(filePath, {recursive: true})
      } 
      fs.writeFileSync(path.join(filePath, fileName), file.buffer) // записуємо зображення в папку
      return fileName;
    } catch(e) {
      throw new HttpException('Помилка при запису файлу', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = path.resolve(__dirname, '..', `static/${fileName}`)
    fs.unlinkSync(filePath);
  }
}
